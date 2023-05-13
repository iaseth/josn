#!/usr/bin/env node
const josnlib = require("josnlib");
const josncli = require("./dist");
const packageJson = require("./package.json");



function main () {
	const [,, ...args] = process.argv;

	const [flagArgs, nonFlagArgs] = josnlib.classifyArgs(args);
	const cmdOptions = josnlib.getCmdOptions(flagArgs);

	const commandFlags = josnlib.flags.filter(flag => flag.isCommand);
	const trueCommandFlags = commandFlags.filter(flag => cmdOptions[flag.name] === true);
	if (trueCommandFlags.length > 1) {
		// Multiple command flags were specified
		console.log(`Multiple commands cannot be run at the same time!`);
		trueCommandFlags.forEach((c, i) => console.log(`\tcommand #${i+1}: ${c.doubleFlag.padEnd(15)} => ${c.description}`));
		return;
	}

	const { commands } = josncli;
	if (cmdOptions.green) {
		commands.greenCommand(cmdOptions);
	} else if (cmdOptions.help) {
		commands.helpCommand(cmdOptions);
	} else if (cmdOptions.license) {
		commands.licenseCommand(cmdOptions);
	} else if (cmdOptions.printArgs) {
		commands.printArgsCommand(cmdOptions, args);
	} else if (cmdOptions.printDemos) {
		commands.printDemosCommand(cmdOptions);
	} else if (cmdOptions.printFlags) {
		commands.printFlagsCommand(cmdOptions);
	} else if (cmdOptions.version) {
		commands.versionCommand(cmdOptions, packageJson);
	} else {
		commands.defaultCommand(cmdOptions, nonFlagArgs);
	}
}

// console.log("Thanks for running JOSN.");

main();
