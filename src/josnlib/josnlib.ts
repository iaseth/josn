import { isSlice, slice } from 'jslice';
import { hasAColon } from 'whichtype';
import { Transformer } from './transformer';
import { findArrayIndex, findObjectKey } from './findsimilar';
import { CmdOptions } from './cmdoptions';



export function josn (jo: any, keyArgs: string[], cmdOptions: CmdOptions) {
	let currentJo = jo;
	for (const keyArg of keyArgs) {
		const isArray = currentJo.constructor === Array;
		const isObject = currentJo.constructor === Object;
		const isPrimitive = !isArray && !isObject;

		if (isPrimitive) {
			console.log(`Ignored key because value is primitive: '${keyArg}'`);
			continue;
		}
		currentJo
		let newJo = null;

		if (hasAColon(keyArg)) {
			// keyArg has a colon somewhere, like ":keys" or "5:10" or "map:name"
			if (isSlice(keyArg)) {
				// do pythonesque array slicing
				if (isArray) {
					newJo = slice(currentJo, keyArg);
				} else {
					console.log(`Cannot slice an object: '${keyArg}'`);
					return null;
				}
			} else {
				const transformer = new Transformer(keyArg, currentJo);
				newJo = transformer.result();
			}
		} else {
			if (isArray) {
				const actualIndex = findArrayIndex(keyArg, currentJo);
				// using at() because idx can also be negative
				newJo = currentJo.at(actualIndex);
			} else if (isObject) {
				const actualKey = findObjectKey(keyArg, currentJo, cmdOptions);
				newJo = currentJo[actualKey];
			}
		}

		if (newJo === undefined) {
			console.log(`Key NOT Found: '${keyArg}'`);
			return null;
		}
		currentJo = newJo;
	}

	return currentJo;
}
