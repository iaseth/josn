#!/usr/bin/env node

const [,, ...args] = process.argv;

console.log("Thanks for running JOSN.");
for (const arg of args) {
	console.log(`\targ: '${arg}'`);
}
