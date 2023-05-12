import { isDoubleFlag, isSingleFlag } from 'whichtype';



export class CmdOptions {
	console: boolean = false;        // use console.log() for printing selected object
	dir: boolean = false;            // use console.dir() for printing selected object
	debug: boolean = false;          // debug mode on/off
	exact: boolean = false;          // exact mode on/off
	force: boolean = false;          // force update even if output file exists and is newer than input file
	green: boolean = false;          // green is for the environment
	help: boolean = false;
	ignoreCase: boolean = false;
	list: boolean = false;           // just list all the input files
	license: boolean = false;        // just print the license
	minify: boolean = false;
	noIgnoreCase: boolean = false;
	plaintext: boolean = false;      // Output plaintext
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
	{isCommand: false, name: "dir", singleFlag: "-d", doubleFlag: "--dir", description: "Use console.dir() for printing selected object."},
	{isCommand: false, name: "debug", singleFlag: "-D", doubleFlag: "--debug", description: "Turns debug mode ON."},
	{isCommand: false, name: "exact", singleFlag: "-E", doubleFlag: "--exact", description: "Turns exact mode ON."},
	{isCommand: false, name: "force", singleFlag: "-F", doubleFlag: "--force", description: "Force update files."},
	{isCommand: true, name: "green", singleFlag: "-g", doubleFlag: "--green", description: "Green is for the environment."},
	{isCommand: true, name: "help", singleFlag: "-h", doubleFlag: "--help", description: "Show help."},
	{isCommand: false, name: "ignoreCase", singleFlag: "-i", doubleFlag: "--ignore-case", description: "Ignore case (default)."},
	{isCommand: true, name: "license", singleFlag: "", doubleFlag: "--license", description: "Print the LICENSE."},
	{isCommand: true, name: "list", singleFlag: "-l", doubleFlag: "--list", description: "List all input files."},
	{isCommand: false, name: "minify", singleFlag: "-m", doubleFlag: "--minify", description: "Minify the output."},
	{isCommand: false, name: "noIgnoreCase", singleFlag: "-n", doubleFlag: "--no-ignore-case", description: "Do not ignore case."},

	{isCommand: false, name: "plaintext", singleFlag: "-p", doubleFlag: "--plaintext", description: "Output plaintext."},
	{isCommand: true, name: "printArgs", singleFlag: "", doubleFlag: "--print-args", description: "Just print the arguments."},
	{isCommand: true, name: "printDemos", singleFlag: "", doubleFlag: "--print-demos", description: "Just print the demos."},
	{isCommand: true, name: "printFlags", singleFlag: "", doubleFlag: "--print-flags", description: "Just print the flags."},
	{isCommand: false, name: "quiet", singleFlag: "-q", doubleFlag: "--quiet", description: "Turns quiet mode ON."},

	{isCommand: false, name: "spaces2", singleFlag: "-s", doubleFlag: "--spaces2", description: "Indent with 2 spaces."},
	{isCommand: false, name: "spaces4", singleFlag: "-S", doubleFlag: "--spaces4", description: "Indent with 4 spaces."},
	{isCommand: false, name: "table", singleFlag: "-t", doubleFlag: "--table", description: "Print output as a table."},
	{isCommand: false, name: "tabs", singleFlag: "-T", doubleFlag: "--tabs", description: "Indent with Tabs."},

	{isCommand: true, name: "version", singleFlag: "-v", doubleFlag: "--version", description: "Print version."},
	{isCommand: true, name: "watch", singleFlag: "-w", doubleFlag: "--watch", description: "Watch input files for changes."},
	{isCommand: false, name: "experimental", singleFlag: "-x", doubleFlag: "--experimental", description: "Turns experimental mode ON."},
	{isCommand: false, name: "zen", singleFlag: "-Z", doubleFlag: "--zen", description: "Turns zen mode ON."},
];



export function getCmdOptions (flagArgs: string[]) : CmdOptions {
	const cmdOptions: CmdOptions = new CmdOptions();

	const singleFlags = flagArgs.filter(isSingleFlag);
	const singleFlagsString = singleFlags.join("");
	const doubleFlags = flagArgs.filter(isDoubleFlag);

	flags.forEach(flag => {
		const singleFlagChar = flag.singleFlag[1];
		if (singleFlagsString.includes(singleFlagChar) || doubleFlags.includes(flag.doubleFlag)) {
			(cmdOptions as any)[flag.name] = true;
		}
	});

	return cmdOptions;
}


