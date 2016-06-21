"use strict";

class Optional {
    constructor(value) {
        this.__value = value;
    }

    static get EMPTY() {
        if (this.__emptyInit)
        {
            this.__emptyInit = false;
            return new Optional(null);
        }
        else
        {
            this.__emptyInit = true;
            return this.EMPTY;
        }
    }

    static of(value) {
        if (value == null) throw new TypeError("Optional.of's argument can not be null");
        return new Optional(value);
    }

    static ofNullable(value) {
        if (value == null) return Optional.empty(value);
        else return Optional.of(value);
    }

    static empty() {
        return Optional.EMPTY;
    }

    isPresent() {
        return this.__value != null;
    }

    ifPresent(fn) {
        if (this.isPresent()) fn();
    }

    get() {
        if (!this.isPresent()) throw new TypeError("optional in empty, can not use get()");
        return this.__value;
    }

    orElse(other) {
        return this.isPresent() ? this.__value : other;
    }

    orElseGet(fn) {
        return this.isPresent() ? this.__value : fn();
    }

    orElseThrow(fn) {
        if (!this.isPresent()) throw fn();
        return this.__value;
    }

    map(fn) {
        if (!this.isPresent()) return Optional.empty();
        else return Optional.ofNullable(fn(this.__value));
    }

    flatMap(fn) {
        if (!this.isPresent()) return Optional.empty();
        else return fn(this.__value);
    }

    filter(fn) {
        if (!this.isPresent()) return this;
        else return fn(this.__value) ? this : Optional.empty();
    }
}

export default Optional;
