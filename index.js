"use strict";

function Optional (value) {
    this.__value = value;
}

// singleton
Optional.EMPTY = new Optional(null);

// factory method
Optional.of = function (value) {
    if (value == null) throw new TypeError("Optional.of's argument can not be null");

    return new Optional(value);
};

Optional.ofNullable = function (value) {
    if (value == null) return Optional.empty(value);
    else return Optional.of(value);
};

Optional.empty = function () {
    return Optional.EMPTY;
};

// instance method
Optional.prototype.isPresent = function () {
    return this.__value != null;
};

Optional.prototype.ifPresent = function (fn) {
    if (this.isPresent()) fn();
};

Optional.prototype.get = function () {
    if (!this.isPresent()) throw new TypeError("optional in empty, can not use get()");
    return this.__value;
};

Optional.prototype.orElse = function (other) {
    return this.isPresent() ? this.__value : other;
};

Optional.prototype.orElseGet = function (fn) {
    return this.isPresent() ? this.__value : fn();
};

Optional.prototype.orElseThrow = function (fn) {
    if (!this.isPresent()) throw fn();
    return this.__value;
};

Optional.prototype.map = function (fn) {
    if (!this.isPresent()) return Optional.empty();
    else return Optional.ofNullable(fn(this.__value));
};

Optional.prototype.flatMap = function (fn) {
    if (!this.isPresent()) return Optional.empty();
    else return fn(this.__value);
};

Optional.prototype.filter = function (fn) {
    if (!this.isPresent()) return this;
    else return fn(this.__value) ? this : Optional.empty();
};

Object.freeze(Optional);

module.exports = Optional;
