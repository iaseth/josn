import { CmdOptions, josn } from "josnlib";
import { parseJsonFile } from './parse';
import { josnOutput } from './josnOutput';
import { getInputFilePath } from './getInputFilePath';



export function defaultCommand (cmdOptions: CmdOptions, nonFlagArgs: string[]) {
	const [inputPath=null, ...keyArgs] = nonFlagArgs;
	if (inputPath === null) {
		console.log("Input path NOT provided!");
		console.log("Usage:");
		console.log("\tjosn data.json key1 index1 key2 index2");
		return;
	}

	const jsonPath = getInputFilePath(inputPath);
	if (jsonPath === null) {
		return;
	}

	const jo: any = parseJsonFile(jsonPath);
	if (jo === null) {
		console.log(`Couldn't parse file: '${jsonPath}'`);
		return;
	}

	const currentJo = josn(jo, keyArgs, cmdOptions);
	if (!currentJo) {
		return;
	}

	josnOutput(currentJo, cmdOptions);
}
