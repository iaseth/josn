import fs from 'fs';
import path from 'path';

import { CmdOptions, josn } from "josnlib";
import { parseJsonFile } from './parse';
import { demos } from '../../demos';
import { josnOutput } from './josnOutput';



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
			// console.log(`Input path is a directory: '${inputPath}'`);
			const packageJsonPath = path.join(inputPath, "package.json");
			if (fs.existsSync(packageJsonPath)) {
				// console.log(`Found: ${packageJsonPath}`);
				jsonPath = packageJsonPath;
			} else {
				const files = fs.readdirSync(inputPath);
				const jsonFiles = files.filter(f => f.endsWith(".json"));
				if (jsonFiles.length === 0) {
					console.log(`Found No JSON files in directory: ${inputPath}`);
					return;
				} else if (jsonFiles.length === 1) {
					// console.log(`Found exactly 1 JSON file in directory: ${inputPath}`);
					const loneJsonPath = path.join(inputPath, jsonFiles[0]);
					// console.log(`Found: ${loneJsonPath}`);
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
		console.log(`Couldn't parse file: '${jsonPath}'`);
		return;
	}

	const currentJo = josn(jo, keyArgs, cmdOptions);
	if (!currentJo) {
		return;
	}

	josnOutput(currentJo, cmdOptions);
}
