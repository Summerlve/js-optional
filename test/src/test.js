"use strict";
import assert from "assert";
import Optional from "../../build/index.js";

describe("Optional test: ", () => {
    describe("create Optional instance:", () => {
        it("Optional.of", () => {
            let maybeVersion = Optional.of(3);
            assert.equal(true, maybeVersion instanceof Optional);
            assert.equal(3, maybeVersion.__value);

            try {
                let version = Optional.of(null);
            }
            catch (error) {
                assert.equal("Optional.of's argument can not be null", error.message);
            }

            try {
                let version = Optional.of(undefined);
            }
            catch (error) {
                assert.equal("Optional.of's argument can not be null", error.message);
            }
        });

        it("Optional.ofNullable", () => {
            let nullable = Optional.ofNullable(null);
            assert.strictEqual(null, nullable.__value);

            nullable = Optional.ofNullable(undefined);
            assert.strictEqual(null, nullable.__value);

            nullable = Optional.ofNullable(3);
            assert(3, nullable.__value);
        });

        it("Optional.empty", () => {
            let empty = Optional.empty();
            assert.equal(null, empty.__value);
        });
    });

    describe("Optional instance method:", () => {
        it("Optional.prototype.isPresent", () => {
            let maybe = Optional.of(3);
            assert.equal(true, maybe.isPresent());

            maybe = Optional.empty();
            assert.equal(false, maybe.isPresent());
        });

        it("Optional.prototype.ifPresent", () => {
            let maybe = Optional.empty();
            let isCall = false;
            maybe.ifPresent((value) => isCall = true);
            assert.equal(false, isCall);

            maybe = Optional.of(3);
            maybe.ifPresent((value) => isCall = true);
            assert.equal(true, isCall);
        });

        it("Optional.prototype.get", () => {
            let maybe = Optional.ofNullable(3);
            assert.equal(3, maybe.get());

            maybe = Optional.of(3);
            assert.equal(3, maybe.get());

            maybe = Optional.empty();
            try {
                maybe.get()
            }
            catch (error) {
                assert.equal("optional in empty, can not use get()", error.message);
            }
        });

        it("Optional.prototype.orElse", () => {
            let maybe = Optional.of(3);
            assert.equal(3, maybe.orElse(4));

            maybe = Optional.empty();
            assert.equal(4, maybe.orElse(4));

            maybe = Optional.ofNullable(null);
            assert.equal(5, maybe.orElse(5));

            maybe = Optional.ofNullable(6);
            assert.equal(6, maybe.orElse(7));
        });

        it("Optional.prototype.orElseGet", () => {
            let maybe = Optional.of(3);
            assert.equal(3, maybe.orElseGet(_ => 4));

            maybe = Optional.empty();
            assert.equal(4, maybe.orElseGet(_ => 4));

            maybe = Optional.ofNullable(null);
            assert.equal(5, maybe.orElseGet(_ => 5));

            maybe = Optional.ofNullable(6);
            assert.equal(6, maybe.orElseGet(_ => 7));
        });

        it("Optional.prototype.orElseThrow", () => {
            let maybe = Optional.of(3);
            assert.equal(3, maybe.orElseThrow(_ => new Error("")));

            maybe = Optional.empty();
            try {
                maybe.orElseThrow(_ => new Error("non value"));
            }
            catch (error) {
                assert.equal("non value", error.message);
            }


            maybe = Optional.ofNullable(null);
            try {
                maybe.orElseThrow(_ => new Error("non value"));
            }
            catch (error) {
                assert.equal("non value", error.message);
            }

            maybe = Optional.ofNullable(4);
            assert.equal(4, maybe.orElseThrow(_ => new Error("non value")));
        });

        it("Optional.prototype.map", () => {
            let maybe = Optional.of(3);
            assert.equal(6, maybe.map(value => value * 2).__value);

            maybe = Optional.empty();
            assert.equal(null, maybe.map(_ => _).__value);
            assert.equal(null, maybe.map(_ => _).__value);
        });

        it("Optional.prototype.flatMap", () => {
            let maybe = Optional.of(3);
            assert.equal(6, maybe.flatMap(value => value * 2));

            maybe = Optional.empty();
            assert.equal(null, maybe.flatMap(_ => _).__value);
            assert.equal(null, maybe.flatMap(_ => _).__value);
        });

        it("Optional.prototype.filter", () => {
            let maybe = Optional.of(3);
            assert.equal(3, maybe.filter(_ => _ === 3).__value);
            assert.equal(null, maybe.filter(_ => _ === 4).__value);

            maybe = Optional.empty();
            assert.equal(maybe, maybe.filter(_ => _ === 5));
        });
    });
});

describe("Example: ", () => {
    it("complex use case", () => {
        let version = Optional.ofNullable("3.0.0").orElse("defalut");
        assert.equal("3.0.0", version);

        version = Optional.ofNullable({version: "3.0.0"})
                            .flatMap(value => Optional.ofNullable(value.version))
                            .map(_ => _)
                            .orElse("UNKNOWN");

        assert.equal("3.0.0", version);

        let isUSB3 = Optional.ofNullable("2.0")
                            .filter(_ => _ === "3.0")
                            .isPresent();

        assert.equal(false, isUSB3);
    });
});
