import fs from 'fs';
import { parseJsonString } from 'josnlib';



export function parseJsonFile (jsonPath: string) : null {
	if (!fs.existsSync(jsonPath)) {
		// path does NOT exist
		return null;
	}

	const stat = fs.statSync(jsonPath);
	if (!stat.isFile()) {
		// path exists but it NOT a file
		return null;
	}

	// reads file contents into a string
	// bad practice if the file is large
	const fileText = fs.readFileSync(jsonPath, 'utf8');
	return parseJsonString(fileText);
}
