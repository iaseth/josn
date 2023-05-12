import { CmdOptions } from "josnlib";



export function josnOutput (currentJo: any, cmdOptions: CmdOptions) {
	// default indentation is 1 TAB
	let indentation: string|number = "\t";
	if (cmdOptions.minify) indentation = 0;
	else if (cmdOptions.spaces2) indentation = 2;
	else if (cmdOptions.spaces4) indentation = 4;
	else if (cmdOptions.tabs) indentation = "\t";

	if (cmdOptions.table) {
		console.table(currentJo);
	} else if (cmdOptions.console) {
		// this happens by default anyway
		console.log(currentJo);
	} else if (cmdOptions.dir) {
		console.dir(currentJo);
	} else if (cmdOptions.plaintext) {
		const currentJoString = JSON.stringify(currentJo, null, indentation);
		console.log(currentJoString);
	} else {
		// directly log the object by default
		console.log(currentJo);
	}
}
