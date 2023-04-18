


function isNumeric (x) {
	if (typeof x != "string") {
		return false;
	}

	return !isNaN(x) && !isNaN(parseFloat(x));
}

function isObjectKey (x) {
	if (x[0] !== "-") {
		return true;
	}
	return false;
}

function isSingleFlag (x) {
	if (x[0] === "-" && x[1] !== "-" && !isNumeric(x.slice(1))) {
		return true;
	}
	return false;
}

function isDoubleFlag (x) {
	if (x[0] === "-" && x[1] === "-") {
		return true;
	}
	return false;
}

module.exports = {
	isDoubleFlag,
	isNumeric,
	isObjectKey,
	isSingleFlag,
};


