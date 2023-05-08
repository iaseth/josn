


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


function isHttp (val: any): boolean {
	if (isString(val) && val.startsWith("http://")) {
		return true;
	}
	return false;
}

function isHttps (val: any): boolean {
	if (isString(val) && val.startsWith("https://")) {
		return true;
	}
	return false;
}

function isURL (val: any): boolean {
	return isHttps(val) || isHttp(val);
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

	isHttp,
	isHttps,
	isURL,
};
