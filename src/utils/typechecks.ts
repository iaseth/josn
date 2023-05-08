


function isArray (val: any) {
	return Array.isArray(val);
}

function isBoolean (val: any) {
	return typeof val === 'boolean';
}

function isNumber (val: any) {
	return typeof val === 'number';
}

function isObject (val: any) {
	return typeof val === 'object' && !Array.isArray(val) && val !== null;
}

function isString (val: any) {
	return typeof val === 'string';
}

export const typechecks = {
	isArray,
	isBoolean,
	isNumber,
	isObject,
	isString,
};
