import { isDoubleFlag, isSingleFlag } from "./utils";



export class CmdOptions {
	console: boolean = false;        // use console.log() for printing selected object
	debug: boolean = false;          // debug mode on/off
	exact: boolean = false;          // exact mode on/off
	force: boolean = false;          // force update even if output file exists and is newer than input file
	help: boolean = false;
	ignoreCase: boolean = false;
	list: boolean = false;           // just list all the input files
	minify: boolean = false;
	noIgnoreCase: boolean = false;
	printArgs: boolean = false;
	printDemos: boolean = false;
	printFlags: boolean = false;
	quiet: boolean = false;          // Quiet mode on/off
	spaces2: boolean = false;
	spaces4: boolean = false;
	table: boolean = false;
	tabs: boolean = false;
	version: boolean = false;        // print JOSN version
	watch: boolean = false;          // watch files for changes
	experimental: boolean = false;   // experimental mode on/off
	zen: boolean = false;            // zen mode on/off
}

export interface FlagType {
	isCommand: boolean,
	name: string,
	singleFlag: string,
	doubleFlag: string,
	description: string
}

export const flags: FlagType[] = [
	{isCommand: false, name: "console", singleFlag: "-c", doubleFlag: "--console", description: "Use console.log() for printing selected object."},
	{isCommand: false, name: "debug", singleFlag: "-D", doubleFlag: "--debug", description: "Turns debug mode ON."},
	{isCommand: false, name: "exact", singleFlag: "-E", doubleFlag: "--exact", description: "Turns exact mode ON."},
	{isCommand: false, name: "force", singleFlag: "-F", doubleFlag: "--force", description: "Force update files."},
	{isCommand: true, name: "help", singleFlag: "-H", doubleFlag: "--help", description: "Show help."},
	{isCommand: false, name: "ignoreCase", singleFlag: "-i", doubleFlag: "--ignore-case", description: "Ignore case (default)."},
	{isCommand: true, name: "list", singleFlag: "-L", doubleFlag: "--list", description: "List all input files."},
	{isCommand: false, name: "minify", singleFlag: "-m", doubleFlag: "--minify", description: "Minify the output."},
	{isCommand: false, name: "noIgnoreCase", singleFlag: "-n", doubleFlag: "--no-ignore-case", description: "Do not ignore case."},
	{isCommand: true, name: "printArgs", singleFlag: "", doubleFlag: "--print-args", description: "Just print the arguments."},
	{isCommand: true, name: "printDemos", singleFlag: "", doubleFlag: "--print-demos", description: "Just print the demos."},
	{isCommand: true, name: "printFlags", singleFlag: "", doubleFlag: "--print-flags", description: "Just print the flags."},
	{isCommand: false, name: "quiet", singleFlag: "-Q", doubleFlag: "--quiet", description: "Turns quiet mode ON."},

	{isCommand: false, name: "spaces2", singleFlag: "-s", doubleFlag: "--spaces2", description: "Indent with 2 spaces."},
	{isCommand: false, name: "spaces4", singleFlag: "-S", doubleFlag: "--spaces4", description: "Indent with 4 spaces."},
	{isCommand: false, name: "table", singleFlag: "-t", doubleFlag: "--table", description: "Print output as a table."},
	{isCommand: false, name: "tabs", singleFlag: "-T", doubleFlag: "--tabs", description: "Indent with Tabs."},

	{isCommand: true, name: "version", singleFlag: "-V", doubleFlag: "--version", description: "Print version."},
	{isCommand: true, name: "watch", singleFlag: "-W", doubleFlag: "--watch", description: "Watch input files for changes."},
	{isCommand: false, name: "experimental", singleFlag: "-X", doubleFlag: "--experimental", description: "Turns experimental mode ON."},
	{isCommand: false, name: "zen", singleFlag: "-Z", doubleFlag: "--zen", description: "Turns zen mode ON."},
];



export function getCmdOptions (flagArgs: string[]) : CmdOptions {
	const cmdOptions: CmdOptions = new CmdOptions();

	const singleFlags = flagArgs.filter(isSingleFlag);
	const doubleFlags = flagArgs.filter(isDoubleFlag);
	flags.forEach(flag => {
		if (singleFlags.includes(flag.singleFlag) || doubleFlags.includes(flag.doubleFlag)) {
			(cmdOptions as any)[flag.name] = true;
		}
	});

	return cmdOptions;
}


