"use strict";

class Optional {
    constructor(value) {
        this.__value = value;
    }

    static get Empty() {
        if (this.__emptyInit)
        {
            return new Optional(null);
        }
        else
        {
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
}

export default Optional;
