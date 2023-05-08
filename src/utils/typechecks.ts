


function isArray (val: any): boolean {
	return Array.isArray(val);
}

function isBoolean (val: any): boolean {
	return typeof val === 'boolean';
}

function isChar (val: any): boolean {
	if (isString(val) && val.length === 1) {
		return true;
	}
	return false;
}

function isNumber (val: any): boolean {
	return typeof val === 'number';
}

function isObject (val: any): boolean {
	return typeof val === 'object' && !Array.isArray(val) && val !== null;
}

function isString (val: any): boolean {
	return typeof val === 'string';
}


function isNull (val: any): boolean {
	return val === null;
}

function isUndefined (val: any): boolean {
	return val === undefined;
}


export const typechecks = {
	isArray,
	isBoolean,
	isChar,
	isNumber,
	isObject,
	isString,

	isNull,
	isUndefined,
};
