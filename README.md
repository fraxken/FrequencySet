# FrequencySet
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/fraxken/FrequencySet/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/fraxken/FrequencySet/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/fraxken/FrequencySet)
![size](https://img.shields.io/github/languages/code-size/fraxken/FrequencySet)

A set that keeps the frequency of occurrences.

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i frequency-set
# or
$ yarn add frequency-set
```

## Usage example

```js
const FrequencySet = require("frequency-set");

const MySet = new FrequencySet(["foo", "bar"]);
MySet.add("foo");
MySet.add("foo");
MySet.add("bar");

console.log([...MySet.entries()]); // [["foo", 3], ["bar", 2]]
console.log(MySet.toJSON()); // { foo: 3, bar: 2 }
```

## API
Same API as a classical Set. But iterables return the unique value as `key` and the count as `value` instead of the default `[key, key]` of the native Set object.

## License
MIT
