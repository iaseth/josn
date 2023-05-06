import { isDoubleFlag, isSingleFlag } from "./utils";



export interface CmdOptionsType {
	debug: boolean,          // debug mode on/off
	force: boolean,          // force update even if output file exists and is newer than input file
	list: boolean,           // just list all the input files
	quiet: boolean,          // Quiet mode on/off
	version: boolean,        // print JOSN version
	watch: boolean,          // watch files for changes
	experimental: boolean,   // experimental mode on/off
	zen: boolean,            // zen mode on/off
}

export interface FlagType {
	isCommand: boolean,
	name: string,
	singleFlag: string,
	doubleFlag: string,
	description: string
}

export const flags: FlagType[] = [
	{isCommand: false, name: "debug", singleFlag: "-D", doubleFlag: "--debug", description: "Turns debug mode ON."},
	{isCommand: false, name: "force", singleFlag: "-F", doubleFlag: "--force", description: "Force update files."},
	{isCommand: true, name: "list", singleFlag: "-L", doubleFlag: "--list", description: "List all input files."},
	{isCommand: false, name: "quiet", singleFlag: "-Q", doubleFlag: "--quiet", description: "Turns quiet mode ON."},
	{isCommand: true, name: "version", singleFlag: "-V", doubleFlag: "--version", description: "Print version."},
	{isCommand: true, name: "watch", singleFlag: "-W", doubleFlag: "--watch", description: "Watch input files for changes."},
	{isCommand: false, name: "experimental", singleFlag: "-X", doubleFlag: "--experimental", description: "Turns experimental mode ON."},
	{isCommand: false, name: "zen", singleFlag: "-Z", doubleFlag: "--zen", description: "Turns zen mode ON."},
];



export function getCmdOptions (flagArgs: string[]) : CmdOptionsType {
	const cmdOptions: CmdOptionsType = {
		debug: false,
		force: false,
		list: false,
		quiet: false,
		version: false,
		watch: false,
		experimental: false,
		zen: false,
	};

	const singleFlags = flagArgs.filter(isSingleFlag);
	const doubleFlags = flagArgs.filter(isDoubleFlag);
	flags.forEach(flag => {
		if (singleFlags.includes(flag.singleFlag) || doubleFlags.includes(flag.doubleFlag)) {
			(cmdOptions as any)[flag.name] = true;
		}
	});

	return cmdOptions;
}


