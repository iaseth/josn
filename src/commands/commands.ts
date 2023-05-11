import { CmdOptions, flags } from "../cmdoptions";
import { demos } from "../demos";
import { defaultCommand } from "./defaultCommand";
import { helpCommand } from "./helpCommand";



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

	helpCommand,
	defaultCommand,
};
