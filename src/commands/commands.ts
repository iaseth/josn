import { CmdOptions, flags } from "../cmdoptions";
import { defaultCommand } from "./default";



export function printArgsCommand (cmdOptions: CmdOptions, args: string[]) {
	console.log(`The command received ${args.length} arguments:`);
	args.forEach((arg, idx) => console.log(`\tArg #${idx+1}: "${arg}"`));
}

export function printFlagsCommand (cmdOptions: CmdOptions) {
	console.log(cmdOptions);
}

export function helpCommand (cmdOptions: CmdOptions) {
	const commandFlags = flags.filter(flag => flag.isCommand);
	console.log(`List of available commands:`);
	commandFlags.forEach((c, i) => console.log(`\tcommand #${i+1}: ${c.doubleFlag.padEnd(15)} => ${c.description}`));
}

export const commands = {
	printArgsCommand,
	printFlagsCommand,
	helpCommand,
	defaultCommand,
};
