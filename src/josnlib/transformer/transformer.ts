const whichtype = require('whichtype');
const jtransform = require('jtransform');



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
			case "select": case "s": case "": this.command = "select"; break;
			case "drop": case "d": this.command = "drop"; break;
			case "is": this.command = "select"; break;
			case "not": this.command = "drop"; break;

			case "has": this.command = "has"; break;

			case "flat": case "f": this.command = "flat"; break;
			case "group": case "g": this.command = "group"; break;

			case "map": case "m": this.command = "map"; break;
			case "nth": case "n": this.command = "nth"; break;

			case "order": case "o": this.command = "order"; break;
			case "reverse": case "r": this.command = "reverse"; break;
			case "unique": case "u": this.command = "unique"; break;

			case "shell": case "$": this.command = "shell"; break;

			// work on array of strings
			case "capital": this.command = "capital"; break;
			case "lower": this.command = "lower"; break;
			case "upper": this.command = "upper"; break;

			case "prefix": this.command = "prefix"; break;
			case "suffix": this.command = "suffix"; break;
			case "replace": this.command = "replace"; break;

			default: this.command = this.lhs; break;
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
			case "nulls": this.modifier = "nulls"; break;
			case "numbers": case "n": this.modifier = "numbers"; break;
			case "objects": case "o": this.modifier = "objects"; break;
			case "strings": case "s": this.modifier = "strings"; break;
			case "texts": case "t": this.modifier = "texts"; break;
			case "urls": case "u": this.modifier = "urls"; break;
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

		case "flat":
			if (whichtype.isObjectOfObjects(this.element)) {
				const keyName = this.modifier || "key";
				const result = Object.keys(this.element).map(k => {
					return {
						...this.element[k],
						[keyName]: k,
					};
				});
				return result;
			} else if (whichtype.isObjectOfArrays(this.element)) {
				const result = Object.keys(this.element).map(key => [key, ...this.element[key]]);
				return result;
			} else {
				console.log("Cannot flatten an object!");
				return null;
			}

		default:
			// nothing to do by default
		}

		return this.element;
	}


	selectInArray (actionName: string) : any {
		const action = (check: Function) => {
			if (actionName === "select") {
				return this.element.filter(check);
			} else if (actionName === "drop") {
				return this.element.filter((x: any, y: number) => !check(x, y));
			}
		};

		switch (this.modifier) {
			case "even": return action((x: any, i: number) => i%2 === 0);
			case "odd": return action((x: any, i: number) => i%2 === 1);
			case "keys": return Object.keys(this.element);
			case "values":
				if (whichtype.isArrayOfObjects(this.element)) {
					return this.element.map((obj: any) => Object.values(obj));
				}
				break;

			case "arrays": return action(whichtype.isArray);
			case "booleans": return action(whichtype.isBoolean);
			case "chars": return action(whichtype.isChar);
			case "nulls": return action(whichtype.isNull);
			case "numbers": return action(whichtype.isNumber);
			case "objects": return action(whichtype.isObject);
			case "strings": return action(whichtype.isString);
			case "texts": return action(whichtype.isString);
			case "urls": return action(whichtype.isURL);
		}
	}

	executeShellCommand () {
		if (this.modifier) {
			console.log(`Excecuting shell command: "${this.modifier}"`);
			console.log(`\tDone.`);
		} else {
			console.log(`Shell command NOT specified!`);
		}
		return this.element;
	}


	transformArray () : any {
		switch (this.command) {

		case "select":
			return this.selectInArray("select");
		case "drop":
			return this.selectInArray("drop");

		case "has":
			if (this.modifier) {
				return this.element.filter((x: any) => x[this.modifier] !== undefined);
			}

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

		case "shell":
			return this.executeShellCommand();

		case "capital": break;
		case "lower":
			return this.element.map(jtransform.toLower);
		case "upper":
			return this.element.map(jtransform.toUpper);
		case "prefix":
			const prefix = this.modifier;
			return this.element.map((x: string) => prefix + x);
		case "suffix":
			const suffix = this.modifier;
			return this.element.map((x: string) => x + suffix);
		case "replace":
			const old = this.modifier;
			const neo = this.extra;
			return this.element.map((x: string) => x.replace(old, neo));

		default:
			// nothing to do by default
		}
		return this.element;
	}

	result () : any {
		if (whichtype.isArray(this.element)) {
			return this.transformArray();
		} else if (whichtype.isObject(this.element)) {
			return this.transformObject();
		}
		return this.element;
	}
}
