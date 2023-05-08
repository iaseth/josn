


export class Transformer {
	arg: string;
	parts: string[];
	lhs: string;
	rhs: string;
	rest: string[];
	func: string = "select";
	operands: string = "all";
	element: any; // can be an object or array

	constructor (arg: string, currentJo: any) {
		this.element = currentJo;
		this.arg = arg.trim();
		this.parts = this.arg.split(":").map(s => s.trim());
		[this.lhs, this.rhs, ...this.rest] = this.parts;

		switch (this.lhs) {
			// stuff that comes before the first colon
			case "drop": case "d": this.func = "drop"; break;
			case "flat": case "f": this.func = "flat"; break;
			case "map": case "m": this.func = "map"; break;
			case "nth": case "n": this.func = "nth"; break;
			case "order": case "o": this.func = "order"; break;
			case "reverse": case "r": this.func = "reverse"; break;
			case "select": case "s": this.func = "select"; break;

			// work on array of strings
			case "capital": this.func = "capital"; break;
			case "lower": this.func = "lower"; break;
			case "prefix": this.func = "prefix"; break;
			case "suffix": this.func = "suffix"; break;
			case "upper": this.func = "upper"; break;

			default: this.func = "select"; break;
		}

		switch (this.rhs) {
			// stuff that comes after the first colon
			// only work on arrays
			case "even": this.operands = "even"; break;
			case "odd": this.operands = "odd"; break;

			// only work on objects
			case "keys": case "k": this.operands = "keys"; break; // returns string indexes for array
			case "values": case "v": this.operands = "values"; break;

			// work on arrays/objects
			case "arrays": case "a": this.operands = "arrays"; break;
			case "booleans": case "b": this.operands = "booleans"; break;
			case "chars": case "c": this.operands = "chars"; break;
			case "numbers": case "n": this.operands = "numbers"; break;
			case "objects": case "o": this.operands = "objects"; break;
			case "strings": case "s": this.operands = "strings"; break;
			case "texts": case "t": this.operands = "texts"; break;
			default: this.operands = this.rhs; break;
		}
	}

	isOk () : boolean {
		return this.parts.length > 0;
	}

	transformObject () : any {
		switch (this.func) {

		case "select":
			if (this.operands === "keys") {
				return Object.keys(this.element);
			} else if (this.operands === "values") {
				return Object.values(this.element);
			}
			break;

		default:
			// nothing to do by default
		}

		return this.element;
	}

	transformArray () : any {
		switch (this.func) {

		case "select":
			if (this.operands === "even") {
				return this.element.filter((x: any, i: number) => i%2 === 0);
			} else if (this.operands === "odd") {
				return this.element.filter((x: any, i: number) => i%2 === 1);
			} else if (this.operands === "keys") {
				return Object.keys(this.element);
			}
			break;

		case "reverse":
			return this.element.reverse();

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
