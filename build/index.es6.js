"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Optional = function () {
    function Optional(value) {
        _classCallCheck(this, Optional);

        this.__value = value;
    }

    _createClass(Optional, [{
        key: "isPresent",
        value: function isPresent() {
            return this.__value != null;
        }
    }, {
        key: "ifPresent",
        value: function ifPresent() {
            if (this.isPresent()) fn();
        }
    }, {
        key: "get",
        value: function get() {
            if (!this.isPresent()) throw new TypeError("optional in empty, can not use get()");
            return this.__value;
        }
    }, {
        key: "orElse",
        value: function orElse() {
            return this.isPresent() ? this.__value : other;
        }
    }, {
        key: "orElseGet",
        value: function orElseGet() {
            return this.isPresent() ? this.__value : fn();
        }
    }, {
        key: "orElseThrow",
        value: function orElseThrow() {
            if (!this.isPresent()) throw fn();
            return this.__value;
        }
    }, {
        key: "map",
        value: function map() {
            if (!this.isPresent()) return Optional.empty();else return Optional.ofNullable(fn(this.__value));
        }
    }, {
        key: "flatMap",
        value: function flatMap() {
            if (!this.isPresent()) return Optional.empty();else return fn(this.__value);
        }
    }, {
        key: "filter",
        value: function filter() {
            if (!this.isPresent()) return this;else return fn(this.__value) ? this : Optional.empty();
        }
    }], [{
        key: "of",
        value: function of(value) {
            if (value == null) throw new TypeError("Optional.of's argument can not be null");
            return new Optional(value);
        }
    }, {
        key: "ofNullable",
        value: function ofNullable(value) {
            if (value == null) return Optional.empty(value);else return Optional.of(value);
        }
    }, {
        key: "empty",
        value: function empty() {
            return Optional.EMPTY;
        }
    }, {
        key: "Empty",
        get: function get() {
            if (this.__emptyInit) {
                this.__emptyInit = false;
                return new Optional(null);
            } else {
                this.__emptyInit = true;
                return this.Empty;
            }
        }
    }]);

    return Optional;
}();

exports.default = Optional;