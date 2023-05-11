import { CmdOptions, flags } from "../cmdoptions";



export function helpCommand (cmdOptions: CmdOptions) {
	const commandFlags = flags.filter(flag => flag.isCommand);
	console.log(`List of available commands:`);
	commandFlags.forEach((c, i) => console.log(`\tcommand #${i+1}: ${c.singleFlag || "  "}  ${c.doubleFlag.padEnd(20)} => ${c.description}`));

	console.log();
	const modifierFlags = flags.filter(flag => !flag.isCommand);
	console.log(`List of available modifiers:`);
	modifierFlags.forEach((c, i) => console.log(`\tmodifier #${i+1}: ${c.singleFlag || "  "}  ${c.doubleFlag.padEnd(20)} => ${c.description}`));
}
