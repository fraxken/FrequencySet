"use strict";

class FrequencySet {
    #data = new Map();

    constructor(iterable = []) {
        for (const value of iterable) {
            this.add(value);
        }
    }

    add(value) {
        if (this.#data.has(value)) {
            this.#data.get(value).count++;
        }
        else {
            this.#data.set(value, { count: 1 });
        }

        return this;
    }

    clear() {
        this.#data = new Map();
    }

    delete(value) {
        if (!this.#data.has(value)) {
            return false;
        }
        this.#data.delete(value);

        return true;
    }

    * entries() {
        for (const [value, { count }] of this.#data.entries()) {
            yield [value, count];
        }
    }

    * [Symbol.iterator]() {
        yield* this.entries();
    }

    forEach(callback, thisArg) {
        for (const [value, count] of this.entries()) {
            callback.call(thisArg, value, count, this);
        }
    }

    has(value) {
        return this.#data.has(value);
    }

    values() {
        return this.#data.keys();
    }

    toJSON() {
        const payload = {};
        for (const [value, count] of this.entries()) {
            if (typeof value === "function" || typeof value === "object") {
                continue;
            }
            payload[String(value)] = count;
        }

        return payload;
    }
}

module.exports = FrequencySet;
