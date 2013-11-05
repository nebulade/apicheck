'use strict';

/* global describe: true */
/* global it: true */

var expect = require('expect.js'),
    apicheck = require('./index');

describe('apicheck', function () {
    it('expects two arguments, one object one array', function () {
        expect(function () { apicheck(); }).to.throwError();
        expect(function () { apicheck({}); }).to.throwError();
        expect(function () { apicheck([]); }).to.throwError();
        expect(function () { apicheck(1337); }).to.throwError();
        expect(function () { apicheck('foo'); }).to.throwError();
        expect(function () { apicheck({}); }).to.throwError();
        expect(function () { apicheck({}, 1337); }).to.throwError();
        expect(function () { apicheck({}, 'foo'); }).to.throwError();
        expect(function () { apicheck({}, {}); }).to.throwError();
        expect(function () { apicheck({}, function () {}); }).to.throwError();

        apicheck({}, []);
    });

    it('ignores properties and function with _ prefix', function () {
        function Foo () {
            this.pounder = 'heavy';
        }
        Foo.prototype.bar = function () {};
        Foo.prototype.baz = function (something) {};
        Foo.prototype._boo = function (something) {};

        apicheck(new Foo(), ['bar', 'baz']);
    });

    it('missing function on object', function () {
        function Foo () {
            this.pounder = 'heavy';
        }
        Foo.prototype.bar = function () {};
        Foo.prototype.baz = function (something) {};
        Foo.prototype._boo = function (something) {};

        expect(function () { apicheck(new Foo(), ['bar', 'baz', 'wee']); }).to.throwError();
    });

    it('unexpected function on object', function () {
        function Foo () {
            this.pounder = 'heavy';
        }
        Foo.prototype.bar = function () {};
        Foo.prototype.baz = function (something) {};
        Foo.prototype._boo = function (something) {};

        expect(function () { apicheck(new Foo(), ['bar']); }).to.throwError();
    });
});
