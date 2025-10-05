export function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}

export function isValidStringPrimitive(value) {
  const vT = typeof value;

  return !(vT === "function" || (vT === "object" && value !== null));
}

export function isKeyValueArray(array) {
  return Array.isArray(array) && array.length === 2 && typeof array[1] === "number";
}
