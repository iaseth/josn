const { typechecks } = require("../../dist");



test("isArray", () => {
	const { isArray } = typechecks;

	expect(isArray([])).toBe(true);
	expect(isArray([1,2,3])).toBe(true);

	expect(isArray("foo")).toBe(false);
	expect(isArray("")).toBe(false);
	expect(isArray(20)).toBe(false);
	expect(isArray(null)).toBe(false);
	expect(isArray(false)).toBe(false);
});

test("isBoolean", () => {
	const { isBoolean } = typechecks;

	expect(isBoolean(true)).toBe(true);
	expect(isBoolean(false)).toBe(true);

	expect(isBoolean("foo")).toBe(false);
	expect(isBoolean("")).toBe(false);
	expect(isBoolean(200)).toBe(false);
	expect(isBoolean(0)).toBe(false);
	expect(isBoolean({})).toBe(false);
	expect(isBoolean([])).toBe(false);
});

test("isNumber", () => {
	const { isNumber } = typechecks;

	expect(isNumber(0)).toBe(true);
	expect(isNumber(1.2)).toBe(true);
	expect(isNumber(-40)).toBe(true);
	expect(isNumber(200.50)).toBe(true);

	expect(isNumber("foo")).toBe(false);
	expect(isNumber(false)).toBe(false);
	expect(isNumber(null)).toBe(false);
	expect(isNumber({})).toBe(false);
});

test("isObject", () => {
	const { isObject } = typechecks;

	expect(isObject({})).toBe(true);
	expect(isObject({"foo": 20})).toBe(true);

	expect(isObject("foo")).toBe(false);
	expect(isObject("foo")).toBe(false);
	expect(isObject("foo")).toBe(false);
	expect(isObject("foo")).toBe(false);
});

test("isString", () => {
	const { isString } = typechecks;

	expect(isString("")).toBe(true);
	expect(isString("foo")).toBe(true);

	expect(isString(null)).toBe(false);
	expect(isString(false)).toBe(false);
	expect(isString(20.5)).toBe(false);
	expect(isString({})).toBe(false);
	expect(isString([])).toBe(false);
});
