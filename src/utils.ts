


export function isArrayIndex (x: any) {
	if (typeof x != "string") {
		return false;
	}

	return !isNaN(x as any) && !isNaN(parseFloat(x));
}

export function isObjectKey (x: string) {
	// basically anything that isn't a flag can be an ovject key
	if (x[0] !== "-") {
		return true;
	}
	return false;
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

export function findSimilarKey (object: any, key: string) {
	const objectKeys = [...Object.keys(object)];
	if (objectKeys.find(k => k === key)) {
		return key;
	}

	const lowKey = key.toLowerCase();
	const objectKeysLower = objectKeys.map(k => k.toLowerCase());
	const lowKeyIndex = objectKeysLower.findIndex(k => k === lowKey);
	if (lowKeyIndex !== -1) {
		// returns key with correct case
		return objectKeys[lowKeyIndex];
	}

	const prefixKeyIndex = objectKeysLower.findIndex(k => k.startsWith(lowKey));
	if (prefixKeyIndex !== -1) {
		return objectKeys[prefixKeyIndex];
	}

	return key;
}


