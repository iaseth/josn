#!/usr/bin/env node

const fs = require("fs");

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

function main () {
	const [,, filepath, ...args] = process.argv;

	if (filepath === undefined) {
		console.log("Filepath NOT provided!");
		console.log("Usage:");
		console.log("\tjosn data.json key1 index key2");
		return;
	}

	if (!fs.existsSync(filepath)) {
		console.log(`File NOT found: '${filepath}'`);
		return;
	}

	const keys = args.filter(a =>  isObjectKey(a) || isNumeric(a));
	const singleFlags = args.filter(isSingleFlag).map(a => a.slice(1));
	const doubleFlags = args.filter(isDoubleFlag).map(a => a.slice(2));

	const jo = JSON.parse(fs.readFileSync(filepath, 'utf8'));
	let currentJo = jo;
	for (const key of keys) {
		const isArray = currentJo.constructor === Array;

		const idx = isArray ? parseInt(key) : 0;
		// using at() because idx can also be negative
		const newJo = isArray ? currentJo.at(idx) : currentJo[key];

		if (newJo === undefined) {
			console.log(`Key NOT Found: '${key}'`);
			return;
		}
		currentJo = newJo;
	}

	const currentJoString = JSON.stringify(currentJo, null, "\t");
	console.log(currentJoString);
}

// console.log("Thanks for running JOSN.");

main();
