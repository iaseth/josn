


export class Transformer {
	arg: string;
	parts: string[];
	func: string = "select";
	element: any; // can be an object or array

	constructor (arg: string, currentJo: any) {
		this.element = currentJo;
		this.arg = arg.trim();
		this.parts = this.arg.split(":").map(s => s.trim());

		switch (this.parts[0]) {
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
	}

	isOk () : boolean {
		return this.parts.length > 0;
	}

	isSlice () : boolean {
		if (this.parts.length !== 2) {
			return false;
		}
		return true;
	}

	isTransformer () : boolean {
		return !this.isSlice();
	}
}
