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
