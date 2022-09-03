// Require Internal Dependencies
const FrequencySet = require("../");

test("Create a new FrequencySet with null or undefined must work", () => {
  const v1 = new FrequencySet(null);
  const v2 = new FrequencySet(undefined);

  expect([...v1.entries()]).toMatchObject([]);
  expect([...v2.entries()]).toMatchObject([]);
});

test("Create a new FrequencySet with no values", () => {
  const fs = new FrequencySet();
  expect(fs.has("boo")).toBe(false);
  expect([...fs.entries()]).toMatchObject([]);
});

test("Create a new FrequencySet with some values", () => {
  const fs = new FrequencySet(["foo", "bar"]);
  expect(fs.has("foo")).toBe(true);
  expect([...fs.entries()]).toMatchObject([["foo", 1], ["bar", 1]]);
});

test("Create a new FrequencySet with a unique Set", () => {
  const fs = new FrequencySet(new Set(["boo", "foo"]));
  expect([...fs.values()]).toMatchObject(["boo", "foo"]);
});

test("Create a new FrequencySet with another FrequencySet", () => {
  const fs = new FrequencySet(new FrequencySet(["boo", "boo"]));

  expect([...fs.entries()]).toMatchObject([["boo", 2]]);
});

test("Create a new FrequencySet with value and count", () => {
  const fs = new FrequencySet([["boo", 5], ["foo", 2]]);

  expect([...fs.entries()]).toMatchObject([["boo", 5], ["foo", 2]]);
});

test("Create a new FrequencySet with a non-iterable value (it must throw a TypeError)", () => {
  expect.assertions(2);
  try {
    new FrequencySet({});
  }
  catch (error) {
    expect(error.name).toBe("TypeError");
    expect(error.message).toStrictEqual("object is not iterable (cannot read property Symbol(Symbol.iterator))");
  }
});

test("Add values to a FrequencySet (with no chaining)", () => {
  const fs = new FrequencySet();

  const fsBis = fs.add("boo");
  expect(fsBis).toStrictEqual(fs);
  expect([...fs.values()]).toMatchObject(["boo"]);
});

test("Add values to a FrequencySet (with chaining)", () => {
  const fs = new FrequencySet();

  const fsBis = fs.add("boo").add("boo").add("boo");
  expect(fsBis).toStrictEqual(fs);
  expect([...fs.entries()]).toMatchObject([["boo", 3]]);
});

test("Add values to a FrequencySet with a custom count", () => {
  const fs = new FrequencySet().add("boo", 20);
  expect([...fs.entries()]).toMatchObject([["boo", 20]]);
});

test("Add count must be a number", () => {
  expect.assertions(2);
  try {
    const fs = new FrequencySet();
    fs.add("boo", {});
  }
  catch (error) {
    expect(error.name).toBe("TypeError");
    expect(error.message).toStrictEqual("count must be a number");
  }
});


test("Delete a value that is present in the FrequencySet", () => {
  const fs = new FrequencySet();

  fs.add("boo");
  expect(fs.has("boo")).toStrictEqual(true);

  const result = fs.delete("boo");
  expect(result).toStrictEqual(true);
  expect(fs.has("boo")).toStrictEqual(false);
});

test("Delete a value that is not present in the FrequencySet", () => {
  const fs = new FrequencySet();

  const result = fs.delete("boo");
  expect(result).toStrictEqual(false);
});

test("Retrieve unique values from the FrequencySet", () => {
  const fs = new FrequencySet([1, 2, "foo", 88n]);
  expect([...fs.values()]).toMatchObject([1, 2, "foo", 88n]);
});

test("Clear a FrequencySet", () => {
  const fs = new FrequencySet([1, 2, "foo", 88n]);
  const result = fs.clear();

  expect(result).toStrictEqual(undefined);
  expect([...fs.values()]).toMatchObject([]);
});

test("Convert a FrequencySet to a JSON", () => {
  // eslint-disable-next-line no-empty-function
  const fs = new FrequencySet(["foo", "foo", "boo", "bar", () => { }]);
  expect(fs.toJSON()).toMatchObject([
    ["foo", 2],
    ["boo", 1],
    ["bar", 1]
  ]);
});

test("toJSON() must skip all non-valid string value", () => {
  // eslint-disable-next-line no-empty-function
  const fs = new FrequencySet([() => { }, null, {}]);
  expect(fs.toJSON()).toMatchObject([
    ["null", 1]
  ]);
});

test("forEach FrequencySet", () => {
  const fs = new FrequencySet(["boo", "boo", "bar"]);

  const payload = {};
  fs.forEach((value, count) => {
    payload[value] = count;
  });
  expect(payload).toMatchObject({
    boo: 2,
    bar: 1
  });
});

