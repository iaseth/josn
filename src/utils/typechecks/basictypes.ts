


export function isArray (val: any): boolean {
	return Array.isArray(val);
}

export function isBoolean (val: any): boolean {
	return typeof val === 'boolean';
}

export function isChar (val: any): boolean {
	if (isString(val) && val.length === 1) {
		return true;
	}
	return false;
}

export function isNumber (val: any): boolean {
	return typeof val === 'number';
}

export function isObject (val: any): boolean {
	return typeof val === 'object' && !Array.isArray(val) && val !== null;
}

export function isString (val: any): boolean {
	return typeof val === 'string';
}


export function isNull (val: any): boolean {
	return val === null;
}

export function isUndefined (val: any): boolean {
	return val === undefined;
}
