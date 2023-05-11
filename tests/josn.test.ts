const josnlib = require("../dist");
const { findArrayIndex, findObjectKey } = require("../dist/commands/default/findsimilar");

const ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

test("findArrayIndex", () => {
	expect(findArrayIndex(findArrayIndex(10, ten))).toBe(10);
	expect(findArrayIndex(findArrayIndex("10", ten))).toBe(10);
	expect(findArrayIndex(findArrayIndex("10.5", ten))).toBe(10);
	expect(findArrayIndex(findArrayIndex("+10", ten))).toBe(10);
});
