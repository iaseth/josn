#!/usr/bin/env node

const fs = require("fs");


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

	const keys = args.filter(a => a[0] !== "-");
	const singleFlags = args.filter(a => a[0] === "-" && a[1] !== "-").map(a => a.slice(1));
	const doubleFlags = args.filter(a => a[0] === "-" && a[1] === "-").map(a => a.slice(2));

	const jo = JSON.parse(fs.readFileSync(filepath, 'utf8'));
	let currentJo = jo;
	for (const key of keys) {
		const newJo = currentJo[key];
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
