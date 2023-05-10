
# josn
[`josn-cli`](https://www.npmjs.com/package/josn-cli) is a command-line `JSON` viewer, written in `JavaScript` and `TypeScript`.

I felt the need for a JSON browser when I was working on [`iaseth/top-100-yc-companies`](https://github.com/iaseth/top-100-yc-companies).
I primarily use it to verify the JSON data collected in my web scraping projects.
I have created a similar tool ([`jsonplus`](https://github.com/iaseth/jsonplus)) in `C++`.

I am using [`readmix`](https://github.com/iaseth/readmix) for generating this README.
You can view the source file [here](https://github.com/iaseth/josn/blob/master/README.md.rx).

JOSN uses [`whichtype`](https://github.com/iaseth/whichtype) for checking types of variables.


## Table of contents
* [josn](#josn)
    * [Table of contents](#table-of-contents)
    * [Installation](#installation)
    * [Updating JOSN](#updating-josn)
    * [Usage](#usage)
    * [Demos](#demos)
    * [Package details](#package-details)
    * [Dependencies](#dependencies)
    * [Dev dependencies](#dev-dependencies)
    * [License](#license)


## Installation
You can install [`josn-cli`](https://www.npmjs.com/package/josn-cli) with the following command:
```
npm i -g josn-cli
```
Now you should be able to run the `josn` command in your terminal.


## Updating JOSN
You can update `josn` with the following command:
```
npm i -g josn-cli@latest
```


## Usage
* **Printing whole files**

    Provide the `filepath` as the first argument.
    * This will print the whole file as indented JSON:
        ```
        josn filename.json
        ```
    * When you supply a `path` that is a directory, `josn` will automatically select the `package.json` inside that directory:
        ```
        josn reactapp
        ```
        This is equivalent to writing:
        ```
        josn reactapp/package.json
        ```
    * When you supply a `path` that is a directory but it does not contain a `package.json`, `josn` will try to find a `json` file in that directory:
        ```
        josn mydata/
        ```
        If the directory contains a single `JSON` file, then `josn` will select it.
        Otherwise, it will list all the `JSON` files in that directory.

* **Printing an object**

    You can use the `keyName` to traverse inside an object.
    * This will print the `dependencies` object inside `package.json`:
        ```
        josn package.json dependencies
        ```
    * `josn` is case insensitive, so you might as well write this:
        ```
        josn package.json Dependencies
        ```
    * Or even this:
        ```
        josn package.json DEPENDENCIES
        ```
    * And you can skip parts of the key name if it is unique enough:
        ```
        josn package.json dep
        ```
        This will print the first `key` that starts with the prefix `dep`.
    * You can use a `colonArg` for selecting just the `keys` or `values` in an object:
        ```
        josn package.json dependencies :keys
        ```
        ```
        josn package.json dependencies :values
        ```
        Both, `:keys` and `:values` have a shorthand syntax:
        ```
        josn package.json dependencies :k
        ```
        ```
        josn package.json dependencies :v
        ```

* **Printing an array element**

    You can use numbers to select array elements.
    * This will print the first element of the data array:
        ```
        josn data.json data 0
        ```
    * You can also use negative indexes to select an element from the end:
        ```
        josn data.json data -1
        ```
        This will print last element of `data` array.
    * You can use a `colonArg` for selecting just the `even` or `odd` elements in an Array:
        ```
        josn data.json data :even
        ```
        ```
        josn data.json data :odd
        ```
        Keep in mind that array indexes start at 0, so `:even` will select elements at `0, 2, 4, etc` and vice-versa.
    * You can use a `colonArg` for slicing an Array:
        ```
        josn data.json data :10         // select first 10 elements
        ```
        ```
        josn data.json data -10:        // select last 10 elements
        ```
        ```
        josn data.json data 2:5         // select elements from 2 to 4
        ```
        The slice syntax is heavily inspired by its counterpart in `Python`.


## Demos
`JOSN` comes with a bunch of demo JSON files to get you started.
| Title | Name | Source | Description |
| ----- | ---- | ------ | ----------- |
| HTML Colors | [`colors.json`](https://github.com/iaseth/josn/tree/master/demojsons/colors.json) | [`iaseth/html-color-names`](https://github.com/iaseth/html-color-names) |  |
| HTML Color Palettes | [`colorpalettes.json`](https://github.com/iaseth/josn/tree/master/demojsons/colorpalettes.json) | [`iaseth/html-color-names`](https://github.com/iaseth/html-color-names) |  |
| YC Company Data | [`yc-companies.json`](https://github.com/iaseth/josn/tree/master/demojsons/yc-companies.json) | [`iaseth/top-100-yc-companies`](https://github.com/iaseth/top-100-yc-companies) |  |
| YC Color Palettes | [`yc-palettes.json`](https://github.com/iaseth/josn/tree/master/demojsons/yc-palettes.json) | [`iaseth/top-100-yc-companies`](https://github.com/iaseth/top-100-yc-companies) |  |
| YC Tailwind Colors | [`yc-tailwind.json`](https://github.com/iaseth/josn/tree/master/demojsons/yc-tailwind.json) | [`iaseth/top-100-yc-companies`](https://github.com/iaseth/top-100-yc-companies) |  |
| Big Tech Market Cap Data | [`bigtech-market-cap.json`](https://github.com/iaseth/josn/tree/master/demojsons/bigtech-market-cap.json) | [`iaseth/bigtech-json-data`](https://github.com/iaseth/bigtech-json-data) |  |

Use the following command to view the list of available demo JSON files in your `josn` installation:
```
josn --print-demos
```
You can open a demo file with the `@demoname` syntax:
```
josn @colors.json colors :10 --table
```
You can omit the extension `.json` for demos:
```
josn @colors colors :10 --table
```


## Package details
| `Name`        | `Value`                               |
| ------------- | ------------------------------------- |
| `Name`        | `josn-cli`                            |
| `Description` | `JOSN is a command line JSON viewer.` |
| `Version`     | `0.12.1`                              |
| `Author`      | `iaseth`                              |
| `Homepage`    | `https://github.com/iaseth/josn`      |
| `Repository`  | `iaseth/josn`                         |
| `License`     | `MIT`                                 |



## Dependencies
|     | `Package`    | `Version`   |
| --- | ------------ | ----------- |
| 1   | `jslice`     | `^0.9.0`    |
| 2   | `json5`      | `^2.2.3`    |
| 3   | `jtransform` | `^0.3.0`    |
| 4   | `whichtype`  | `^1.2.0`    |



## Dev dependencies
|     | `Package`     | `Version`   |
| --- | ------------- | ----------- |
| 1   | `@types/jest` | `^29.5.1`   |
| 2   | `jest`        | `^29.5.0`   |



## License
MIT License

Copyright (c) Ankur Seth.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Credit

This file was generated using [`readmix`](https://github.com/iaseth/readmix).


