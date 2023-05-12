import { CmdOptions } from "./cmdoptions";



export function findArrayIndex (keyArg: string, arr: any[]) {
	const argNum = parseInt(keyArg);
	return argNum;
}

export function findObjectKey (keyArg: string, object: any, cmdOptions: CmdOptions) {
	const objectKeys = [...Object.keys(object)];
	if (objectKeys.find(k => k === keyArg)) {
		return keyArg;
	}

	const lowKey = keyArg.toLowerCase();
	const objectKeysLower = objectKeys.map(k => k.toLowerCase());
	const lowKeyIndex = objectKeysLower.findIndex(k => k === lowKey);
	if (lowKeyIndex !== -1) {
		// returns key with correct case
		return objectKeys[lowKeyIndex];
	}

	if (cmdOptions.exact) return keyArg;

	const prefixKeyIndex = objectKeysLower.findIndex(k => k.startsWith(lowKey));
	if (prefixKeyIndex !== -1) {
		return objectKeys[prefixKeyIndex];
	}

	return keyArg;
}
