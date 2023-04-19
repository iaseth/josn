"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSimilarKey = exports.isDoubleFlag = exports.isSingleFlag = exports.isObjectKey = exports.isNumeric = void 0;
function isNumeric(x) {
    if (typeof x != "string") {
        return false;
    }
    return !isNaN(x) && !isNaN(parseFloat(x));
}
exports.isNumeric = isNumeric;
function isObjectKey(x) {
    if (x[0] !== "-") {
        return true;
    }
    return false;
}
exports.isObjectKey = isObjectKey;
function isSingleFlag(x) {
    if (x[0] === "-" && x[1] !== "-" && !isNumeric(x.slice(1))) {
        return true;
    }
    return false;
}
exports.isSingleFlag = isSingleFlag;
function isDoubleFlag(x) {
    if (x[0] === "-" && x[1] === "-") {
        return true;
    }
    return false;
}
exports.isDoubleFlag = isDoubleFlag;
function findSimilarKey(object, key) {
    const objectKeys = [...Object.keys(object)];
    if (objectKeys.find(k => k === key)) {
        return key;
    }
    const lowKey = key.toLowerCase();
    const objectKeysLower = objectKeys.map(k => k.toLowerCase());
    const lowKeyIndex = objectKeysLower.findIndex(k => k === lowKey);
    if (lowKeyIndex !== -1) {
        // returns key with correct case
        return objectKeys[lowKeyIndex];
    }
    const prefixKeyIndex = objectKeysLower.findIndex(k => k.startsWith(lowKey));
    if (prefixKeyIndex !== -1) {
        return objectKeys[prefixKeyIndex];
    }
    return key;
}
exports.findSimilarKey = findSimilarKey;
