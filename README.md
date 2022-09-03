<p align="center"><h1 align="center">
  FrequencySet
</h1>

<p align="center">
  An ES6 Set compliant structure that keeps the frequency of occurrences.
</p>

<p align="center">
    <a href="https://github.com/fraxken/FrequencySet">
        <img src="https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/fraxken/FrequencySet/master/package.json&query=$.version&label=Version">
    </a>
    <a href="https://github.com/fraxken/FrequencySet">
        <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="maintenance">
    </a>
    <a href="https://github.com/fraxken/FrequencySet">
        <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
    </a>
    <a href="https://github.com/fraxken/FrequencySet">
        <img src="https://img.shields.io/github/workflow/status/fraxken/FrequencySet/Node.js%20CI" alt="githubaction">
    </a>
</p>

## Requirements
- [Node.js](https://nodejs.org/en/) v14 or higher

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

const clone = new FrequencySet(MySet);
console.log(clone);
```

## API
FrequencySet implements exactly the same interfaces as an ES6 [Set](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set). Except for the **@@ Iteration Symbol** and the **entries()**. Instead of returning the unique value as key and value, FrequencySet return the unique value as key and the count as value.

```js
const mySet = new FrequencySet(["foo", "foo", "bar"]);

for (const [uniqueValue, count] of mySet) {
    console.log([uniqueValue, count]); // [foo, 2] and [bar, 1]
}
```

Also the add method has been extended with a additional `count` argument witch take a number.
```js
const mySet = new FrequencySet().add("foo", 10);

console.log(mySet.toJSON()); // ["foo", 10]
```

### toJSON()
FrequencySet implement a custom toJSON() method which will allow an automatic transformation into JSON.

```js
const mySet = new FrequencySet(["foo", "foo", "bar"]);

console.log(mySet.toJSON()); // [foo, 2] and [bar, 1];
```

The toJSON method does not take into account **functions** and **objects**.

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/thomas-gentilhomme/"><img src="https://avatars.githubusercontent.com/u/4438263?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gentilhomme</b></sub></a><br /><a href="https://github.com/fraxken/FrequencySet/commits?author=fraxken" title="Code">💻</a> <a href="https://github.com/fraxken/FrequencySet/issues?q=author%3Afraxken" title="Bug reports">🐛</a> <a href="https://github.com/fraxken/FrequencySet/pulls?q=is%3Apr+reviewed-by%3Afraxken" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/fraxken/FrequencySet/commits?author=fraxken" title="Documentation">📖</a> <a href="#security-fraxken" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License
MIT
