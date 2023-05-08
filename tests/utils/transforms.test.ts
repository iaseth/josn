const { transforms } = require("../../dist");



test("toUpper", () => {
	const { toUpper } = transforms;

	expect(toUpper("foo")).toBe("FOO");
});
