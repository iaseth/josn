
default: ts test

prepare: ts license readme

ts: clean
	tsc

test:
	npm test

publish: prepare
	npm publish

readme:
	readmix --compile --markdown README.md.rx

license:
	readmix --compile --markdown LICENSE.md.rx

clean:
	@rm -rf dist
