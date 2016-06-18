"use strict";

var assert = require("assert");
var Optional = require("../../build/index.js");

describe("Optional test: ", function () {
    describe("create Optional instance:", function () {
        it("Optional.of", function () {
            var maybeVersion = Optional.of(3);
            assert.equal(true, maybeVersion instanceof Optional);
            assert.equal(3, maybeVersion.__value);

            try {
                var version = Optional.of(null);
            } catch (error) {
                assert.equal("Optional.of's argument can not be null", error.message);
            }

            try {
                var _version = Optional.of(undefined);
            } catch (error) {
                assert.equal("Optional.of's argument can not be null", error.message);
            }
        });

        it("Optional.ofNullable", function () {
            var nullable = Optional.ofNullable(null);
            assert.strictEqual(null, nullable.__value);

            nullable = Optional.ofNullable(undefined);
            assert.strictEqual(null, nullable.__value);

            nullable = Optional.ofNullable(3);
            assert(3, nullable.__value);
        });

        it("Optional.empty", function () {
            var empty = Optional.empty();
            assert.equal(null, empty.__value);
        });
    });

    describe("Optional instance method:", function () {
        it("Optional.prototype.isPresent", function () {
            var maybe = Optional.of(3);
            assert.equal(true, maybe.isPresent());

            maybe = Optional.empty();
            assert.equal(false, maybe.isPresent());
        });

        it("Optional.prototype.ifPresent", function () {
            var maybe = Optional.empty();
            var isCall = false;
            maybe.ifPresent(function (value) {
                return isCall = true;
            });
            assert.equal(false, isCall);

            maybe = Optional.of(3);
            maybe.ifPresent(function (value) {
                return isCall = true;
            });
            assert.equal(true, isCall);
        });

        it("Optional.prototype.get", function () {
            var maybe = Optional.ofNullable(3);
            assert.equal(3, maybe.get());

            maybe = Optional.of(3);
            assert.equal(3, maybe.get());

            maybe = Optional.empty();
            try {
                maybe.get();
            } catch (error) {
                assert.equal("optional in empty, can not use get()", error.message);
            }
        });

        it("Optional.prototype.orElse", function () {
            var maybe = Optional.of(3);
            assert.equal(3, maybe.orElse(4));

            maybe = Optional.empty();
            assert.equal(4, maybe.orElse(4));

            maybe = Optional.ofNullable(null);
            assert.equal(5, maybe.orElse(5));

            maybe = Optional.ofNullable(6);
            assert.equal(6, maybe.orElse(7));
        });

        it("Optional.prototype.orElseGet", function () {
            var maybe = Optional.of(3);
            assert.equal(3, maybe.orElseGet(function (_) {
                return 4;
            }));

            maybe = Optional.empty();
            assert.equal(4, maybe.orElseGet(function (_) {
                return 4;
            }));

            maybe = Optional.ofNullable(null);
            assert.equal(5, maybe.orElseGet(function (_) {
                return 5;
            }));

            maybe = Optional.ofNullable(6);
            assert.equal(6, maybe.orElseGet(function (_) {
                return 7;
            }));
        });

        it("Optional.prototype.orElseThrow", function () {
            var maybe = Optional.of(3);
            assert.equal(3, maybe.orElseThrow(function (_) {
                return new Error("");
            }));

            maybe = Optional.empty();
            try {
                maybe.orElseThrow(function (_) {
                    return new Error("non value");
                });
            } catch (error) {
                assert.equal("non value", error.message);
            }

            maybe = Optional.ofNullable(null);
            try {
                maybe.orElseThrow(function (_) {
                    return new Error("non value");
                });
            } catch (error) {
                assert.equal("non value", error.message);
            }

            maybe = Optional.ofNullable(4);
            assert.equal(4, maybe.orElseThrow(function (_) {
                return new Error("non value");
            }));
        });

        it("Optional.prototype.map", function () {
            var maybe = Optional.of(3);
            assert.equal(6, maybe.map(function (value) {
                return value * 2;
            }).__value);

            maybe = Optional.empty();
            assert.equal(null, maybe.map(function (_) {
                return _;
            }).__value);
            assert.equal(null, maybe.map(function (_) {
                return _;
            }).__value);
        });

        it("Optional.prototype.flatMap", function () {
            var maybe = Optional.of(3);
            assert.equal(6, maybe.flatMap(function (value) {
                return value * 2;
            }));

            maybe = Optional.empty();
            assert.equal(null, maybe.flatMap(function (_) {
                return _;
            }).__value);
            assert.equal(null, maybe.flatMap(function (_) {
                return _;
            }).__value);
        });

        it("Optional.prototype.filter", function () {
            var maybe = Optional.of(3);
            assert.equal(3, maybe.filter(function (_) {
                return _ === 3;
            }).__value);
            assert.equal(null, maybe.filter(function (_) {
                return _ === 4;
            }).__value);

            maybe = Optional.empty();
            assert.equal(maybe, maybe.filter(function (_) {
                return _ === 5;
            }));
        });
    });
});

describe("Example: ", function () {
    it("complex use case", function () {
        var version = Optional.ofNullable("3.0.0").orElse("defalut");
        assert.equal("3.0.0", version);

        version = Optional.ofNullable({ version: "3.0.0" }).flatMap(function (value) {
            return Optional.ofNullable(value.version);
        }).map(function (_) {
            return _;
        }).orElse("UNKNOWN");

        assert.equal("3.0.0", version);

        var isUSB3 = Optional.ofNullable("2.0").filter(function (_) {
            return _ === "3.0";
        }).isPresent();

        assert.equal(false, isUSB3);
    });
});