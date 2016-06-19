"use strict";

class Optional {
    constructor(value) {
        this.__value = value;
    }

    static get Empty() {
        if (this.__emptyInit)
        {
            this.__emptyInit = false;
            return new Optional(null);
        }
        else
        {
            this.__emptyInit = true;
            return this.Empty;
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

    ifPresent() {
        if (this.isPresent()) fn();
    }

    get() {
        if (!this.isPresent()) throw new TypeError("optional in empty, can not use get()");
        return this.__value;
    }

    orElse() {
        return this.isPresent() ? this.__value : other;
    }

    orElseGet() {
        return this.isPresent() ? this.__value : fn();
    }

    orElseThrow() {
        if (!this.isPresent()) throw fn();
        return this.__value;
    }

    map() {
        if (!this.isPresent()) return Optional.empty();
        else return Optional.ofNullable(fn(this.__value));
    }

    flatMap() {
        if (!this.isPresent()) return Optional.empty();
        else return fn(this.__value);
    }

    filter() {
        if (!this.isPresent()) return this;
        else return fn(this.__value) ? this : Optional.empty();
    }
}

export default Optional;
