#!/usr/bin/env node

const fs = require("fs");
const utils = require("./src/utils");



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

	const keys = args.filter(a =>  utils.isObjectKey(a) || utils.isNumeric(a));
	const singleFlags = args.filter(utils.isSingleFlag).map(a => a.slice(1));
	const doubleFlags = args.filter(utils.isDoubleFlag).map(a => a.slice(2));

	const jo = JSON.parse(fs.readFileSync(filepath, 'utf8'));
	let currentJo = jo;
	for (const key of keys) {
		const isArray = currentJo.constructor === Array;
		const isObject = currentJo.constructor === Object;
		const isPrimitive = !isArray && !isObject;

		if (isPrimitive) {
			console.log(`Ignored key: '${key}'`);
			continue;
		}

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
