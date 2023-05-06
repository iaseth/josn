import fs from 'fs';
import JSON5 from 'json5';



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
	try {
		const jo = JSON.parse(fileText);
		return jo;
	} catch (e) {
		// JSON failed to parse the file
		// means the file might be JSON5
		try {
			const jo = JSON5.parse(fileText);
			return jo;
		} catch (error) {
			// JSON and JSON5 both failed to parse the file
			return null;
		}
	}
}
