import fs from 'fs';
import path from 'path';

import { demos } from '../../demos';



export function getInputFilePath (inputPath: string): string|null {
	if (inputPath.startsWith("@")) {
		const filename = inputPath.endsWith(".json") ? inputPath.slice(1) : `${inputPath.slice(1)}.json`;
		const demo = demos.find(d => d.filename === filename);

		if (demo) {
			const colorsDemoPath = require.resolve("../../../demojsons/colors.json");
			const demosPath = path.dirname(colorsDemoPath);
			const demoPath = path.join(demosPath, filename);
			// console.log(`Demo Found: ${demoPath}`);
			return demoPath;
		} else {
			console.log(`Demo NOT Found: ${filename}`);
			return null;
		}
	}

	if (!fs.existsSync(inputPath)) {
		console.log(`Input path does NOT exist: '${inputPath}'`);
		return null;
	}

	const stat = fs.statSync(inputPath);
	if (stat.isFile()) {
		return inputPath;
	} else if (stat.isDirectory()) {
		// console.log(`Input path is a directory: '${inputPath}'`);
		const packageJsonPath = path.join(inputPath, "package.json");
		if (fs.existsSync(packageJsonPath)) {
			// console.log(`Found: ${packageJsonPath}`);
			return packageJsonPath;
		} else {
			const files = fs.readdirSync(inputPath);
			const jsonFiles = files.filter(f => f.endsWith(".json"));
			if (jsonFiles.length === 0) {
				console.log(`Found No JSON files in directory: ${inputPath}`);
				return null;
			} else if (jsonFiles.length === 1) {
				// console.log(`Found exactly 1 JSON file in directory: ${inputPath}`);
				const loneJsonPath = path.join(inputPath, jsonFiles[0]);
				// console.log(`Found: ${loneJsonPath}`);
				return loneJsonPath;
			} else {
				console.log(`Found ${jsonFiles.length} JSON files in directory: ${inputPath}`);
				jsonFiles.forEach((jsonFile, idx) => {
					console.log(`\tFile #${idx+1} => ${jsonFile}`);
				});
				return null;
			}
		}
	}

	return null;
}
