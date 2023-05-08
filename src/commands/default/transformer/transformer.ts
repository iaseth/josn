


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
			case "select": case "s": this.func = "select"; break;
			case "drop": case "d": this.func = "drop"; break;
			case "flat": case "f": this.func = "flat"; break;
			case "map": case "m": this.func = "map"; break;
			case "order": case "o": this.func = "order"; break;
			case "reverse": case "r": this.func = "reverse"; break;

			// work on array of strings
			case "capital": this.func = "capital"; break;
			case "lower": this.func = "lower"; break;
			case "prefix": this.func = "prefix"; break;
			case "suffix": this.func = "suffix"; break;
			case "upper": this.func = "upper"; break;

			default: this.func = "select"; break;
		}

		switch (this.rhs) {
			case "keys": case "k": this.operands = "keys"; break;
			case "values": case "v": this.operands = "values"; break;
			default: this.operands = "all"; break;
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
