export default class FrequencySet<T = any> {
  #data = new Map<T, { count: number; }>();

  constructor(
    iterable: Iterable<T> | Iterable<[T, number]> | null | undefined = []
  ) {
    if (iterable === null || iterable === undefined) {
      return;
    }
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new TypeError("object is not iterable (cannot read property Symbol(Symbol.iterator))");
    }

    for (const value of iterable) {
      if (Array.isArray(value)) {
        this.add(...value);
      }
      else {
        this.add(value);
      }
    }
  }

  add(
    value: T,
    count: number = 1
  ): this {
    if (typeof count !== "number") {
      throw new TypeError("count must be a number");
    }

    if (this.#data.has(value)) {
      this.#data.get(value)!.count += count;
    }
    else {
      this.#data.set(value, { count });
    }

    return this;
  }

  clear(): void {
    this.#data.clear();
  }

  delete(value: T): boolean {
    return this.#data.delete(value);
  }

  * entries(): IterableIterator<[T, number]> {
    for (const [value, { count }] of this.#data.entries()) {
      yield [value, count];
    }
  }

  * [Symbol.iterator](): IterableIterator<[T, number]> {
    yield* this.entries();
  }

  forEach(
    callback: (value: T, count: number, set: FrequencySet<T>) => void,
    thisArg?: any
  ) {
    for (const [value, count] of this.entries()) {
      callback.call(thisArg, value, count, this);
    }
  }

  has(value: T): boolean {
    return this.#data.has(value);
  }

  values(): IterableIterator<T> {
    return this.#data.keys();
  }

  toJSON(): [string, number][] {
    const payload: [string, number][] = [];
    for (const [value, count] of this.entries()) {
      if (isValidStringPrimitive(value)) {
        payload.push([String(value), count]);
      }
    }

    return payload;
  }
}

function isValidStringPrimitive(
  value: unknown
): value is string {
  const vT = typeof value;

  return !(vT === "function" || (vT === "object" && value !== null));
}
