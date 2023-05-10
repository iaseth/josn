const josnlib = require("../../dist");



test("isSingleFlag", () => {
	const { isSingleFlag } = josnlib;

	expect(isSingleFlag("-a")).toBe(true);
	expect(isSingleFlag("-X")).toBe(true);

	expect(isSingleFlag("-")).toBe(false);
	expect(isSingleFlag("--")).toBe(false);
	expect(isSingleFlag("-1")).toBe(false);
	expect(isSingleFlag("--foo")).toBe(false);
});

test("isDoubleFlag", () => {
	const { isDoubleFlag } = josnlib;

	expect(isDoubleFlag("--x")).toBe(true);
	expect(isDoubleFlag("--Foo")).toBe(true);
	expect(isDoubleFlag("--1")).toBe(true);

	expect(isDoubleFlag("-")).toBe(false);
	expect(isDoubleFlag("--")).toBe(false);
	expect(isDoubleFlag("---")).toBe(false);
	expect(isDoubleFlag("---foo")).toBe(false);
});

test("isTripleFlag", () => {
	const { isTripleFlag } = josnlib;

	expect(isTripleFlag("---x")).toBe(true);
	expect(isTripleFlag("---Foo")).toBe(true);
	expect(isTripleFlag("---1")).toBe(true);

	expect(isTripleFlag("-")).toBe(false);
	expect(isTripleFlag("-x")).toBe(false);
	expect(isTripleFlag("-foo")).toBe(false);

	expect(isTripleFlag("--")).toBe(false);
	expect(isTripleFlag("--a")).toBe(false);
	expect(isTripleFlag("--bar")).toBe(false);

	expect(isTripleFlag("---")).toBe(false);
	expect(isTripleFlag("----")).toBe(false);
	expect(isTripleFlag("----foo")).toBe(false);
});



test("isArrayIndex", () => {
	const { isArrayIndex } = josnlib;

	expect(isArrayIndex("0")).toBe(true);
	expect(isArrayIndex("240")).toBe(true);
	expect(isArrayIndex("-10")).toBe(true);

	expect(isArrayIndex("-")).toBe(false);
	expect(isArrayIndex("x")).toBe(false);
	expect(isArrayIndex("foo")).toBe(false);
});

test("isObjectKey", () => {
	const { isObjectKey } = josnlib;

	expect(isObjectKey("x")).toBe(true);
	expect(isObjectKey("foo")).toBe(true);
	expect(isObjectKey("200")).toBe(true);

	expect(isObjectKey("-")).toBe(false);
	expect(isObjectKey("--")).toBe(false);
	expect(isObjectKey("---")).toBe(false);
});

test("hasAColon", () => {
	const { hasAColon } = josnlib;

	expect(hasAColon(":")).toBe(true);
	expect(hasAColon(":10")).toBe(true);
	expect(hasAColon("5:")).toBe(true);
	expect(hasAColon("-25:")).toBe(true);
	expect(hasAColon(":-5")).toBe(true);
	expect(hasAColon("15:50")).toBe(true);

	expect(hasAColon("map:foo")).toBe(true);
	expect(hasAColon("drop:name")).toBe(true);

	expect(hasAColon("foo")).toBe(false);
	expect(hasAColon("")).toBe(false);
	expect(hasAColon("--")).toBe(false);
	expect(hasAColon("-x")).toBe(false);
});
