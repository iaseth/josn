import { typechecks } from "../typechecks";



function toLower (x: any) {
	if (typechecks.isString(x)) {
		return x.toLowerCase();
	}
	return x;
}

function toUpper (x: any) {
	if (typechecks.isString(x)) {
		return x.toUpperCase();
	}
	return x;
}

export const transforms = {
	toLower,
	toUpper,
};
