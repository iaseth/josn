


function getValidIndex (idx: number, arr: any[]) : number {
	if (Math.abs(idx) > 0 && Math.abs(idx) < 1) {
		idx = Math.floor(idx * arr.length);
	}

	if (idx < 0) {
		// negative index will count from the end
		return Math.floor(idx + arr.length);
	}

	if (idx >= 0 && idx <= arr.length) {
		return Math.floor(idx);
	}
	return 0;
}

export class SliceArg {
	arg: string;
	parts: string[];
	lhs: string = "";
	rhs: string = "";
	element: any; // can be an object or array

	constructor (arg: string, currentJo: any) {
		this.element = currentJo;
		this.arg = arg.trim();
		this.parts = this.arg.split(":").map(s => s.trim());
		if (this.parts.length === 2) {
			this.lhs = this.parts[0];
			this.rhs = this.parts[1];
		}
	}

	slice () : any {
		if (Array.isArray(this.element)) {
			const startF = this.lhs ? parseFloat(this.lhs) : 0;
			const endF = this.rhs ? parseFloat(this.rhs) : this.element.length;

			const start = getValidIndex(startF, this.element);
			const end = getValidIndex(endF, this.element);
			return this.element.slice(start, end);
		}

		return this.element;
	}
}
