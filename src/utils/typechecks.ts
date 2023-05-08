


function isBoolean (val: any) {
	return typeof val === 'boolean';
}

function isNumber (val: any) {
	return typeof val === 'number';
}

function isString (val: any) {
	return typeof val === 'string';
}

export const typechecks = {
	isBoolean,
	isNumber,
	isString,
};
