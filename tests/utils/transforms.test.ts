const { transforms } = require("../../dist");



test("toLower", () => {
	const { toLower } = transforms;

	expect(toLower("fOO")).toBe("foo");
});

test("toUpper", () => {
	const { toUpper } = transforms;

	expect(toUpper("foo")).toBe("FOO");
});
