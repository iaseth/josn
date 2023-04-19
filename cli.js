#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const utils = require("./dist/utils");



function main () {
	const [,, filepath, ...args] = process.argv;

	if (filepath === undefined) {
		console.log("Filepath NOT provided!");
		console.log("Usage:");
		console.log("\tjosn data.json key1 index key2");
		return;
	}

	if (!fs.existsSync(filepath)) {
		console.log(`Path does NOT exist: '${filepath}'`);
		return;
	}

	let jsonPath = filepath;
	const stat = fs.lstatSync(filepath);
	if (stat.isDirectory()) {
		console.log(`Input path is a directory: '${filepath}'`);
		const packageJsonPath = path.join(filepath, "package.json");
		if (fs.existsSync(packageJsonPath)) {
			console.log(`Found: ${packageJsonPath}`);
			jsonPath = packageJsonPath;
		} else {
			return;
		}
	}

	const keys = args.filter(a =>  utils.isObjectKey(a) || utils.isNumeric(a));
	const singleFlags = args.filter(utils.isSingleFlag).map(a => a.slice(1));
	const doubleFlags = args.filter(utils.isDoubleFlag).map(a => a.slice(2));

	const jo = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
	let currentJo = jo;
	for (const key of keys) {
		const isArray = currentJo.constructor === Array;
		const isObject = currentJo.constructor === Object;
		const isPrimitive = !isArray && !isObject;

		if (isPrimitive) {
			console.log(`Ignored key: '${key}'`);
			continue;
		}

		let newJo = null;

		if (isArray) {
			const idx = isArray ? parseInt(key) : 0;
			// using at() because idx can also be negative
			newJo = currentJo.at(idx);
		} else if (isObject) {
			const actualKey = utils.findSimilarKey(currentJo, key);
			newJo = currentJo[actualKey];
		}

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
