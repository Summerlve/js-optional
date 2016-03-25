"use strict";
const assert = require("assert");
const Optional = require("../index.js");

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
            
        });

        it("Optional.prototype.orElse", () => {

        });

        it("Optional.prototype.orElseGet", () => {

        });

        it("Optional.prototype.orElseThrow", () => {

        });

        it("Optional.prototype.map", () => {

        });

        it("Optional.prototype.flatMap", () => {

        });

        it("Optional.prototype.filter", () => {

        });
    });
});
