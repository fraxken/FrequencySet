// Import Node.js Dependencies
import { test } from "node:test";
import { deepStrictEqual, strictEqual, throws } from "node:assert";

// Import Internal Dependencies
import FrequencySet from "../src/index.js";

test("Create a new FrequencySet with null or undefined must work", () => {
  const v1 = new FrequencySet(null);
  const v2 = new FrequencySet(undefined);

  deepStrictEqual([...v1.entries()], []);
  deepStrictEqual([...v2.entries()], []);
});

test("Create a new FrequencySet with no values", () => {
  const fs = new FrequencySet();
  strictEqual(fs.has("boo"), false);
  deepStrictEqual([...fs.entries()], []);
});

test("Create a new FrequencySet with some values", () => {
  const fs = new FrequencySet(["foo", "bar"]);
  strictEqual(fs.has("foo"), true);
  deepStrictEqual([...fs.entries()], [["foo", 1], ["bar", 1]]);
});

test("Create a new FrequencySet with a unique Set", () => {
  const fs = new FrequencySet(new Set(["boo", "foo"]));
  deepStrictEqual([...fs.values()], ["boo", "foo"]);
});

test("Create a new FrequencySet with another FrequencySet", () => {
  const fs = new FrequencySet(new FrequencySet(["boo", "boo"]));
  deepStrictEqual([...fs.entries()], [["boo", 2]]);
});

test("Create a new FrequencySet with value and count", () => {
  const fs = new FrequencySet([["boo", 5], ["foo", 2]]);
  deepStrictEqual([...fs.entries()], [["boo", 5], ["foo", 2]]);
});

test("Create a new FrequencySet with a non-iterable value (it must throw a TypeError)", () => {
  throws(() => {
    new FrequencySet({});
  }, TypeError, "object is not iterable (cannot read property Symbol(Symbol.iterator))");
});

test("Add values to a FrequencySet (with no chaining)", () => {
  const fs = new FrequencySet();
  const fsBis = fs.add("boo");

  strictEqual(fsBis, fs);
  deepStrictEqual([...fs.values()], ["boo"]);
});

test("Add values to a FrequencySet (with chaining)", () => {
  const fs = new FrequencySet();
  const fsBis = fs.add("boo").add("boo").add("boo");

  strictEqual(fsBis, fs);
  deepStrictEqual([...fs.entries()], [["boo", 3]]);
});

test("Add values to a FrequencySet with a custom count", () => {
  const fs = new FrequencySet().add("boo", 20);
  deepStrictEqual([...fs.entries()], [["boo", 20]]);
});

test("Add count must be a number", () => {
  throws(() => {
    const fs = new FrequencySet();
    fs.add("boo", {});
  }, TypeError, "count must be a number");
});

test("Delete a value that is present in the FrequencySet", () => {
  const fs = new FrequencySet();

  fs.add("boo");
  strictEqual(fs.has("boo"), true);

  const result = fs.delete("boo");
  strictEqual(result, true);
  strictEqual(fs.has("boo"), false);
});

test("Delete a value that is not present in the FrequencySet", () => {
  const fs = new FrequencySet();

  const result = fs.delete("boo");
  strictEqual(result, false);
});

test("Retrieve unique values from the FrequencySet", () => {
  const fs = new FrequencySet([1, 2, "foo", 88n]);
  deepStrictEqual([...fs.values()], [1, 2, "foo", 88n]);
});

test("Clear a FrequencySet", () => {
  const fs = new FrequencySet([1, 2, "foo", 88n]);
  const result = fs.clear();

  strictEqual(result, undefined);
  deepStrictEqual([...fs.values()], []);
});

test("Convert a FrequencySet to a JSON", () => {
  const fs = new FrequencySet(["foo", "foo", "boo", "bar", () => {
    // DO NOTHING
  }]);
  deepStrictEqual(fs.toJSON(), [
    ["foo", 2],
    ["boo", 1],
    ["bar", 1]
  ]);
});

test("toJSON() must skip all non-valid string value", () => {
  const fs = new FrequencySet([() => {
    // DO NOTHING
  }, null, {}]);
  deepStrictEqual(fs.toJSON(), [
    ["null", 1]
  ]);
});

test("forEach FrequencySet", () => {
  const fs = new FrequencySet(["boo", "boo", "bar"]);

  const payload = {};
  fs.forEach((value, count) => {
    payload[value] = count;
  });

  deepStrictEqual(payload, {
    boo: 2,
    bar: 1
  });
});
