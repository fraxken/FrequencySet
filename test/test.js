/* eslint-disable no-empty-function */
// Require Node.js Dependencies
const { test } = require("node:test");
const assert = require("node:assert");

// Require Internal Dependencies
const FrequencySet = require("../");

test("Create a new FrequencySet with null or undefined must work", () => {
  const v1 = new FrequencySet(null);
  const v2 = new FrequencySet(undefined);

  assert.deepStrictEqual([...v1.entries()], []);
  assert.deepStrictEqual([...v2.entries()], []);
});

test("Create a new FrequencySet with no values", () => {
  const fs = new FrequencySet();
  assert.strictEqual(fs.has("boo"), false);
  assert.deepStrictEqual([...fs.entries()], []);
});

test("Create a new FrequencySet with some values", () => {
  const fs = new FrequencySet(["foo", "bar"]);
  assert.strictEqual(fs.has("foo"), true);
  assert.deepStrictEqual([...fs.entries()], [["foo", 1], ["bar", 1]]);
});

test("Create a new FrequencySet with a unique Set", () => {
  const fs = new FrequencySet(new Set(["boo", "foo"]));
  assert.deepStrictEqual([...fs.values()], ["boo", "foo"]);
});

test("Create a new FrequencySet with another FrequencySet", () => {
  const fs = new FrequencySet(new FrequencySet(["boo", "boo"]));
  assert.deepStrictEqual([...fs.entries()], [["boo", 2]]);
});

test("Create a new FrequencySet with value and count", () => {
  const fs = new FrequencySet([["boo", 5], ["foo", 2]]);
  assert.deepStrictEqual([...fs.entries()], [["boo", 5], ["foo", 2]]);
});

test("Create a new FrequencySet with a non-iterable value (it must throw a TypeError)", () => {
  assert.throws(() => {
    new FrequencySet({});
  }, TypeError, "object is not iterable (cannot read property Symbol(Symbol.iterator))");
});

test("Add values to a FrequencySet (with no chaining)", () => {
  const fs = new FrequencySet();
  const fsBis = fs.add("boo");

  assert.strictEqual(fsBis, fs);
  assert.deepStrictEqual([...fs.values()], ["boo"]);
});

test("Add values to a FrequencySet (with chaining)", () => {
  const fs = new FrequencySet();
  const fsBis = fs.add("boo").add("boo").add("boo");

  assert.strictEqual(fsBis, fs);
  assert.deepStrictEqual([...fs.entries()], [["boo", 3]]);
});

test("Add values to a FrequencySet with a custom count", () => {
  const fs = new FrequencySet().add("boo", 20);
  assert.deepStrictEqual([...fs.entries()], [["boo", 20]]);
});

test("Add count must be a number", () => {
  assert.throws(() => {
    const fs = new FrequencySet();
    fs.add("boo", {});
  }, TypeError, "count must be a number");
});

test("Delete a value that is present in the FrequencySet", () => {
  const fs = new FrequencySet();

  fs.add("boo");
  assert.strictEqual(fs.has("boo"), true);

  const result = fs.delete("boo");
  assert.strictEqual(result, true);
  assert.strictEqual(fs.has("boo"), false);
});

test("Delete a value that is not present in the FrequencySet", () => {
  const fs = new FrequencySet();

  const result = fs.delete("boo");
  assert.strictEqual(result, false);
});

test("Retrieve unique values from the FrequencySet", () => {
  const fs = new FrequencySet([1, 2, "foo", 88n]);
  assert.deepStrictEqual([...fs.values()], [1, 2, "foo", 88n]);
});

test("Clear a FrequencySet", () => {
  const fs = new FrequencySet([1, 2, "foo", 88n]);
  const result = fs.clear();

  assert.strictEqual(result, undefined);
  assert.deepStrictEqual([...fs.values()], []);
});

test("Convert a FrequencySet to a JSON", () => {
  const fs = new FrequencySet(["foo", "foo", "boo", "bar", () => { }]);
  assert.deepStrictEqual(fs.toJSON(), [
    ["foo", 2],
    ["boo", 1],
    ["bar", 1]
  ]);
});

test("toJSON() must skip all non-valid string value", () => {
  const fs = new FrequencySet([() => { }, null, {}]);
  assert.deepStrictEqual(fs.toJSON(), [
    ["null", 1]
  ]);
});

test("forEach FrequencySet", () => {
  const fs = new FrequencySet(["boo", "boo", "bar"]);

  const payload = {};
  fs.forEach((value, count) => {
    payload[value] = count;
  });

  assert.deepStrictEqual(payload, {
    boo: 2,
    bar: 1
  });
});
