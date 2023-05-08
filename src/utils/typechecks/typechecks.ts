import {
	isArray,
	isBoolean,
	isChar,
	isNumber,
	isObject,
	isString,

	isNull,
	isUndefined,
} from "./basictypes";



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
