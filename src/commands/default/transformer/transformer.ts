import { transforms, typechecks } from "../../../utils";



export class Transformer {
	element: any; // can be an object or array
	fullarg: string;
	parts: string[];
	lhs: string;
	rhs: string;

	command: string = "select";
	modifier: string;
	extra: string;
	rest: string[];

	constructor (arg: string, currentJo: any) {
		this.element = currentJo;
		this.fullarg = arg.trim();
		this.parts = this.fullarg.split(":");
		[this.lhs, this.rhs="", this.extra="", ...this.rest] = this.parts;

		switch (this.lhs) {
			// stuff that comes before the first colon
			case "drop": case "d": this.command = "drop"; break;
			case "select": case "s": this.command = "select"; break;

			case "flat": case "f": this.command = "flat"; break;
			case "group": case "g": this.command = "group"; break;

			case "map": case "m": this.command = "map"; break;
			case "nth": case "n": this.command = "nth"; break;

			case "order": case "o": this.command = "order"; break;
			case "reverse": case "r": this.command = "reverse"; break;
			case "unique": case "u": this.command = "unique"; break;

			// work on array of strings
			case "capital": this.command = "capital"; break;
			case "lower": this.command = "lower"; break;
			case "prefix": this.command = "prefix"; break;
			case "suffix": this.command = "suffix"; break;
			case "upper": this.command = "upper"; break;

			default: this.command = "select"; break;
		}

		switch (this.rhs) {
			// stuff that comes after the first colon
			// only work on arrays
			case "even": this.modifier = "even"; break;
			case "odd": this.modifier = "odd"; break;

			// only work on objects
			case "keys": case "k": this.modifier = "keys"; break; // returns string indexes for array
			case "values": case "v": this.modifier = "values"; break;

			// work on arrays/objects
			case "arrays": case "a": this.modifier = "arrays"; break;
			case "booleans": case "b": this.modifier = "booleans"; break;
			case "chars": case "c": this.modifier = "chars"; break;
			case "numbers": case "n": this.modifier = "numbers"; break;
			case "objects": case "o": this.modifier = "objects"; break;
			case "strings": case "s": this.modifier = "strings"; break;
			case "texts": case "t": this.modifier = "texts"; break;
			default: this.modifier = this.rhs; break;
		}
	}

	isOk () : boolean {
		return this.parts.length > 0;
	}

	transformObject () : any {
		switch (this.command) {

		case "select":
			if (this.modifier === "keys") {
				return Object.keys(this.element);
			} else if (this.modifier === "values") {
				return Object.values(this.element);
			}
			break;

		default:
			// nothing to do by default
		}

		return this.element;
	}

	transformArray () : any {
		switch (this.command) {

		case "select":
			if (this.modifier === "even") {
				return this.element.filter((x: any, i: number) => i%2 === 0);
			} else if (this.modifier === "odd") {
				return this.element.filter((x: any, i: number) => i%2 === 1);
			} else if (this.modifier === "keys") {
				return Object.keys(this.element);
			}
			break;

		case "flat":
			return this.element.flat();

		case "group":
			const chunkSize = parseInt(this.modifier);
			if (chunkSize > 0 && chunkSize < this.element.length) {
				const chunks = [];
				for (let i = 0; i < this.element.length; i += chunkSize) {
					const chunk = this.element.slice(i, i + chunkSize);
					chunks.push(chunk);
				}
				return chunks;
			}
			break;

		case "map":
			const key = this.modifier;
			const arr = this.element.map((x: any) => x[key]);
			return arr;

		case "order":
			if (this.modifier.length > 0) {
				const key = this.modifier;
				const sort = (a: any, b: any) => {
					if (a[key] < b[key]) return -1;
					if (a[key] > b[key]) return 1;
					return 0;
				};
				this.element.sort(sort)
			}
			return this.element.sort();

		case "reverse":
			return this.element.reverse();

		case "unique":
			return [...new Set(this.element)];

		case "capital": break;
		case "lower":
			return this.element.map((x: string) => x.toLowerCase());
		case "upper":
			return this.element.map((x: string) => x.toUpperCase());
		case "prefix": break;
		case "suffix": break;

		default:
			// nothing to do by default
		}
		return this.element;
	}

	result () : any {
		if (Array.isArray(this.element)) {
			return this.transformArray();
		} else if (typeof this.element === 'object' && this.element !== null) {
			return this.transformObject();
		}
		return this.element;
	}
}
