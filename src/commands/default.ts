import fs from 'fs';
import path from 'path';

import { CmdOptions } from "../cmdoptions";
import { parseJsonFile } from '../parse';
import { findSimilarKey, hasAColon } from '../utils';



export function defaultCommand (cmdOptions: CmdOptions, nonFlagArgs: string[]) {
	const [inputPath=null, ...keyArgs] = nonFlagArgs;

	if (inputPath === null) {
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

	const jo: any = parseJsonFile(jsonPath);
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
			const [lhs, rhs] = keyArg.split(':').map(x => x.trim());

			if (lhs.length === 0) {
				switch (rhs) {
					case "keys":
						newJo = Object.keys(currentJo); // when keyArg is ":keys"
						break;
					default:
						// nothing
				}
			} else {
				console.log(`Found a colon arg: "${keyArg}"`);
			}
		} else {
			if (isArray) {
				const idx = isArray ? parseInt(keyArg) : 0;
				// using at() because idx can also be negative
				newJo = currentJo.at(idx);
			} else if (isObject) {
				const actualKey = findSimilarKey(currentJo, keyArg, cmdOptions);
				newJo = currentJo[actualKey];
			}
		}

		if (newJo === undefined) {
			console.log(`Key NOT Found: '${keyArg}'`);
			return;
		}
		currentJo = newJo;
	}

	let indentation: string|number = "\t";
	if (cmdOptions.minify) indentation = 0;
	else if (cmdOptions.spaces2) indentation = 2;
	else if (cmdOptions.spaces4) indentation = 4;
	else if (cmdOptions.tabs) indentation = "\t";

	if (cmdOptions.table) {
		console.table(currentJo);
	} else if (cmdOptions.console) {
		console.log(currentJo);
	} else {
		const currentJoString = JSON.stringify(currentJo, null, indentation);
		console.log(currentJoString);
	}
}
