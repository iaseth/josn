import { CmdOptions } from "../josnlib";



export function versionCommand (cmdOptions: CmdOptions, packageJson: any) {
	const rows = [];
	rows.push(["Package", packageJson.name]);
	rows.push(["Version", packageJson.version]);
	rows.push(["Description", packageJson.description]);
	rows.push(["Author", packageJson.author]);
	rows.push(["License", packageJson.license]);
	console.table(rows);
}
