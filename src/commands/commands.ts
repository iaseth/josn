import { CmdOptions, flags } from "../cmdoptions";
export { defaultCommand } from "./default";



export function printFlagsCommand (cmdOptions: CmdOptions) {
	console.log(cmdOptions);
}

export function helpCommand (cmdOptions: CmdOptions) {
	const commandFlags = flags.filter(flag => flag.isCommand);
	console.log(`List of available commands:`);
	commandFlags.forEach((c, i) => console.log(`\tcommand #${i+1}: ${c.doubleFlag.padEnd(15)} => ${c.description}`));
}
