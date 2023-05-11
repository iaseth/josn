import fs from 'fs';
import path from 'path';
import { isSlice, slice } from 'jslice';
import { hasAColon } from 'whichtype';

import { CmdOptions } from "../../cmdoptions";
import { parseJsonFile } from '../../parse';
import { Transformer } from './transformer';
import { findArrayIndex, findObjectKey } from './findsimilar';
import { demos } from '../../demos';



export function defaultCommand (cmdOptions: CmdOptions, nonFlagArgs: string[]) {
	const [inputPath=null, ...keyArgs] = nonFlagArgs;

	let demoPath = null;
	if (inputPath === null) {
		console.log("Input path NOT provided!");
		console.log("Usage:");
		console.log("\tjosn data.json key1 index1 key2 index2");
		return;
	} else if (inputPath.startsWith("@")) {
		const filename = inputPath.endsWith(".json") ? inputPath.slice(1) : `${inputPath.slice(1)}.json`;
		const demo = demos.find(d => d.filename === filename);

		if (demo) {
			const colorsDemoPath = require.resolve("../../../demojsons/colors.json");
			const demosPath = path.dirname(colorsDemoPath);
			demoPath = path.join(demosPath, filename);
			// console.log(`Demo Found: ${demoPath}`);
		} else {
			console.log(`Demo NOT Found: ${filename}`);
			return;
		}
	}

	if (!demoPath && !fs.existsSync(inputPath)) {
		console.log(`Input path does NOT exist: '${inputPath}'`);
		return;
	}

	let jsonPath: string = inputPath;
	if (demoPath) {
		// opens one of the demos
		jsonPath = demoPath;
	} else {
		const stat = fs.statSync(inputPath);
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
					jsonFiles.forEach((jsonFile, idx) => {
						console.log(`\tFile #${idx+1} => ${jsonFile}`);
					});
					return;
				}
			}
		}
	}

	const jo: any = parseJsonFile(jsonPath);
	if (jo === null) {
		console.log(`File parsed to NULL data: ${jsonPath}`);
		return;
	}

	let currentJo = jo;
	for (const keyArg of keyArgs) {
		const isArray = currentJo.constructor === Array;
		const isObject = currentJo.constructor === Object;
		const isPrimitive = !isArray && !isObject;

		if (isPrimitive) {
			console.log(`Ignored key because value is primitive: '${keyArg}'`);
			continue;
		}

		let newJo = null;

		if (hasAColon(keyArg)) {
			// keyArg has a colon somewhere, like ":keys" or "5:10" or "map:name"
			if (isSlice(keyArg)) {
				// do pythonesque array slicing
				if (isArray) {
					newJo = slice(currentJo, keyArg);
				} else {
					console.log(`Cannot slice an object: '${keyArg}'`);
					return;
				}
			} else {
				const transformer = new Transformer(keyArg, currentJo);
				newJo = transformer.result();
			}
		} else {
			if (isArray) {
				const actualIndex = findArrayIndex(keyArg, currentJo);
				// using at() because idx can also be negative
				newJo = currentJo.at(actualIndex);
			} else if (isObject) {
				const actualKey = findObjectKey(keyArg, currentJo, cmdOptions);
				newJo = currentJo[actualKey];
			}
		}

		if (newJo === undefined) {
			console.log(`Key NOT Found: '${keyArg}'`);
			return;
		}
		currentJo = newJo;
	}

	// default indentation is 1 TAB
	let indentation: string|number = "\t";
	if (cmdOptions.minify) indentation = 0;
	else if (cmdOptions.spaces2) indentation = 2;
	else if (cmdOptions.spaces4) indentation = 4;
	else if (cmdOptions.tabs) indentation = "\t";

	if (cmdOptions.table) {
		console.table(currentJo);
	} else if (cmdOptions.console) {
		// this happens by default anyway
		console.log(currentJo);
	} else if (cmdOptions.dir) {
		console.dir(currentJo);
	} else if (cmdOptions.plaintext) {
		const currentJoString = JSON.stringify(currentJo, null, indentation);
		console.log(currentJoString);
	} else {
		// directly log the object by default
		console.log(currentJo);
	}
}
