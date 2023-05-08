import whichtype from 'whichtype';


const { isString } = whichtype;

function toLower (x: any) {
	if (isString(x)) {
		return x.toLowerCase();
	}
	return x;
}

function toUpper (x: any) {
	if (isString(x)) {
		return x.toUpperCase();
	}
	return x;
}

export const transforms = {
	toLower,
	toUpper,
};
