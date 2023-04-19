#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const utils = require("./dist/utils");



function main () {
	const [,, inputPath, ...args] = process.argv;

	const keys = args.filter(a =>  utils.isObjectKey(a) || utils.isNumeric(a));
	const singleFlags = args.filter(utils.isSingleFlag).map(a => a.slice(1));
	const doubleFlags = args.filter(utils.isDoubleFlag).map(a => a.slice(2));

	if (inputPath === undefined) {
		console.log("Input path NOT provided!");
		console.log("Usage:");
		console.log("\tjosn data.json key1 index1 key2 index2");
		return;
	}

	if (!fs.existsSync(inputPath)) {
		console.log(`Input path does NOT exist: '${inputPath}'`);
		return;
	}

	let jsonPath = inputPath;
	const stat = fs.lstatSync(inputPath);
	if (stat.isDirectory()) {
		console.log(`Input path is a directory: '${inputPath}'`);
		const packageJsonPath = path.join(inputPath, "package.json");
		if (fs.existsSync(packageJsonPath)) {
			console.log(`Found: ${packageJsonPath}`);
			jsonPath = packageJsonPath;
		} else {
			const files = fs.readdirSync(inputPath);
			const jsonFiles = files.filter(f => f.endsWith(".json"));
			if (jsonFiles.length === 0) {
				console.log(`Found No JSON files in directory: ${inputPath}`);
				return;
			} else if (jsonFiles.length === 1) {
				console.log(`Found exactly 1 JSON file in directory: ${inputPath}`);
				const loneJsonPath = path.join(inputPath, jsonFiles[0]);
				console.log(`Found: ${loneJsonPath}`);
				jsonPath = loneJsonPath;
			} else {
				console.log(`Found ${jsonFiles.length} JSON files in directory: ${inputPath}`);
				return;
			}
		}
	}

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
