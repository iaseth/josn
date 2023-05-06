const josnlib = require("../dist");

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
