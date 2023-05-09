import demosJson from './demos.json';



export interface DemoJson {
	title: string,
	filename: string,
	description: string,
	repo: string,
}

export const demos: DemoJson[] = demosJson.demos;
