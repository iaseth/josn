const { typechecks } = require("../../dist");



test("isString", () => {
	const { isString } = typechecks;

	expect(isString("foo")).toBe(true);
});

export {};
