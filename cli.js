#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const josnlib = require("./dist");



function main () {
	const [,, ...args] = process.argv;

	const nonFlagArgs = args.filter(josnlib.isNotFlag);
	const flagArgs = args.filter(josnlib.isFlag);
	const cmdOptions = josnlib.getCmdOptions(flagArgs);

	const commandFlags = josnlib.flags.filter(flag => flag.isCommand);
	const trueCommandFlags = commandFlags.filter(flag => cmdOptions[flag.name] === true);
	if (trueCommandFlags.length > 1) {
		// Multiple command flags were specified
		console.log(`Multiple commands cannot be run at the same time!`);
		trueCommandFlags.forEach((c, i) => console.log(`\tcommand #${i+1}: ${c.doubleFlag.padEnd(15)} => ${c.description}`));
		return;
	}

	if (cmdOptions.printArgs) {
		josnlib.printArgsCommand(cmdOptions, args);
	} else if (cmdOptions.printFlags) {
		josnlib.printFlagsCommand(cmdOptions);
	} else if (cmdOptions.help) {
		josnlib.helpCommand(cmdOptions);
	} else {
		josnlib.defaultCommand(cmdOptions, nonFlagArgs);
	}
}

// console.log("Thanks for running JOSN.");

main();
