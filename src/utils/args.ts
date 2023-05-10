


export function isNumeric (x: string) {
	if (typeof x !== "string") {
		return false;
	}

	return !isNaN(x as any) && !isNaN(parseFloat(x));
}

export function isArrayIndex (x: string) {
	return isNumeric(x);
}

export function isObjectKey (x: string) {
	// basically anything that isn't a flag can be an ovject key
	if (x[0] !== "-") {
		return true;
	}
	return false;
}



export function isFlag (arg: string) : boolean {
	if (arg.startsWith("-") && !hasAColon(arg)) {
		return true;
	}
	return false;
}

export function isNotFlag (arg: string) : boolean {
	return !isFlag(arg);
}



export function hasAColon (arg: string) : boolean {
	return arg.includes(":");
}



export function isSingleFlag (x: string) {
	if (x.length > 1 && x[0] === "-" && x[1] !== "-" && !isArrayIndex(x.slice(1))) {
		return true;
	}
	return false;
}

export function isDoubleFlag (x: string) {
	if (x.length > 2 && x[0] === "-" && x[1] === "-" && x[2] !== "-") {
		return true;
	}
	return false;
}

export function isTripleFlag (x: string) {
	if (x.length > 3 && x[0] === "-" && x[1] === "-" && x[2] === "-" && x[3] !== "-") {
		return true;
	}
	return false;
}
