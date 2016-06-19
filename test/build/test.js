"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _indexEs = require("../../build/index.es6.js");

var _indexEs2 = _interopRequireDefault(_indexEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Optional test: ", function () {
    describe("create Optional instance:", function () {
        it("Optional.of", function () {
            var maybeVersion = _indexEs2.default.of(3);
            _assert2.default.equal(true, maybeVersion instanceof _indexEs2.default);
            _assert2.default.equal(3, maybeVersion.__value);

            try {
                var version = _indexEs2.default.of(null);
            } catch (error) {
                _assert2.default.equal("Optional.of's argument can not be null", error.message);
            }

            try {
                var _version = _indexEs2.default.of(undefined);
            } catch (error) {
                _assert2.default.equal("Optional.of's argument can not be null", error.message);
            }
        });

        it("Optional.ofNullable", function () {
            var nullable = _indexEs2.default.ofNullable(null);
            _assert2.default.strictEqual(null, nullable.__value);

            nullable = _indexEs2.default.ofNullable(undefined);
            _assert2.default.strictEqual(null, nullable.__value);

            nullable = _indexEs2.default.ofNullable(3);
            (0, _assert2.default)(3, nullable.__value);
        });

        it("Optional.empty", function () {
            var empty = _indexEs2.default.empty();
            _assert2.default.equal(null, empty.__value);
        });
    });

    describe("Optional instance method:", function () {
        it("Optional.prototype.isPresent", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(true, maybe.isPresent());

            maybe = _indexEs2.default.empty();
            _assert2.default.equal(false, maybe.isPresent());
        });

        it("Optional.prototype.ifPresent", function () {
            var maybe = _indexEs2.default.empty();
            var isCall = false;
            maybe.ifPresent(function (value) {
                return isCall = true;
            });
            _assert2.default.equal(false, isCall);

            maybe = _indexEs2.default.of(3);
            maybe.ifPresent(function (value) {
                return isCall = true;
            });
            _assert2.default.equal(true, isCall);
        });

        it("Optional.prototype.get", function () {
            var maybe = _indexEs2.default.ofNullable(3);
            _assert2.default.equal(3, maybe.get());

            maybe = _indexEs2.default.of(3);
            _assert2.default.equal(3, maybe.get());

            maybe = _indexEs2.default.empty();
            try {
                maybe.get();
            } catch (error) {
                _assert2.default.equal("optional in empty, can not use get()", error.message);
            }
        });

        it("Optional.prototype.orElse", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(3, maybe.orElse(4));

            maybe = _indexEs2.default.empty();
            _assert2.default.equal(4, maybe.orElse(4));

            maybe = _indexEs2.default.ofNullable(null);
            _assert2.default.equal(5, maybe.orElse(5));

            maybe = _indexEs2.default.ofNullable(6);
            _assert2.default.equal(6, maybe.orElse(7));
        });

        it("Optional.prototype.orElseGet", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(3, maybe.orElseGet(function (_) {
                return 4;
            }));

            maybe = _indexEs2.default.empty();
            _assert2.default.equal(4, maybe.orElseGet(function (_) {
                return 4;
            }));

            maybe = _indexEs2.default.ofNullable(null);
            _assert2.default.equal(5, maybe.orElseGet(function (_) {
                return 5;
            }));

            maybe = _indexEs2.default.ofNullable(6);
            _assert2.default.equal(6, maybe.orElseGet(function (_) {
                return 7;
            }));
        });

        it("Optional.prototype.orElseThrow", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(3, maybe.orElseThrow(function (_) {
                return new Error("");
            }));

            maybe = _indexEs2.default.empty();
            try {
                maybe.orElseThrow(function (_) {
                    return new Error("non value");
                });
            } catch (error) {
                _assert2.default.equal("non value", error.message);
            }

            maybe = _indexEs2.default.ofNullable(null);
            try {
                maybe.orElseThrow(function (_) {
                    return new Error("non value");
                });
            } catch (error) {
                _assert2.default.equal("non value", error.message);
            }

            maybe = _indexEs2.default.ofNullable(4);
            _assert2.default.equal(4, maybe.orElseThrow(function (_) {
                return new Error("non value");
            }));
        });

        it("Optional.prototype.map", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(6, maybe.map(function (value) {
                return value * 2;
            }).__value);

            maybe = _indexEs2.default.empty();
            _assert2.default.equal(null, maybe.map(function (_) {
                return _;
            }).__value);
            _assert2.default.equal(null, maybe.map(function (_) {
                return _;
            }).__value);
        });

        it("Optional.prototype.flatMap", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(6, maybe.flatMap(function (value) {
                return value * 2;
            }));

            maybe = _indexEs2.default.empty();
            _assert2.default.equal(null, maybe.flatMap(function (_) {
                return _;
            }).__value);
            _assert2.default.equal(null, maybe.flatMap(function (_) {
                return _;
            }).__value);
        });

        it("Optional.prototype.filter", function () {
            var maybe = _indexEs2.default.of(3);
            _assert2.default.equal(3, maybe.filter(function (_) {
                return _ === 3;
            }).__value);
            _assert2.default.equal(null, maybe.filter(function (_) {
                return _ === 4;
            }).__value);

            maybe = _indexEs2.default.empty();
            _assert2.default.equal(maybe, maybe.filter(function (_) {
                return _ === 5;
            }));
        });
    });
});

describe("Example: ", function () {
    it("complex use case", function () {
        var version = _indexEs2.default.ofNullable("3.0.0").orElse("defalut");
        _assert2.default.equal("3.0.0", version);

        version = _indexEs2.default.ofNullable({ version: "3.0.0" }).flatMap(function (value) {
            return _indexEs2.default.ofNullable(value.version);
        }).map(function (_) {
            return _;
        }).orElse("UNKNOWN");

        _assert2.default.equal("3.0.0", version);

        var isUSB3 = _indexEs2.default.ofNullable("2.0").filter(function (_) {
            return _ === "3.0";
        }).isPresent();

        _assert2.default.equal(false, isUSB3);
    });
});