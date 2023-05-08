import { typechecks } from "./typechecks";



function toUpper (x: any) {
	if (typechecks.isString(x)) {
		return x.toUpperCase();
	}
	return x;
}

export const transforms = {
	toUpper,
};
