import { CmdOptions, flags } from "../josnlib";
import { demos } from "../demos";
import { defaultCommand } from "./defaultCommand";
import { greenCommand } from "./greenCommand";
import { helpCommand } from "./helpCommand";
import { licenseCommand } from "./licenseCommand";
import { versionCommand } from "./versionCommand";



export function printArgsCommand (cmdOptions: CmdOptions, args: string[]) {
	console.log(`The command received ${args.length} arguments:`);
	args.forEach((arg, idx) => console.log(`\tArg #${idx+1}: "${arg}"`));
}

export function printDemosCommand (cmdOptions: CmdOptions) {
	console.table(demos);
}

export function printFlagsCommand (cmdOptions: CmdOptions) {
	console.log(cmdOptions);
}

export const commands = {
	printArgsCommand,
	printDemosCommand,
	printFlagsCommand,

	greenCommand,
	helpCommand,
	licenseCommand,
	versionCommand,

	defaultCommand,
};
