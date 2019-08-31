"use strict";

const StatUtil = require('../src/statUtil.js');

var assert = require('assert');
describe('StatUtil', function() {
  describe('#analyze()', function() {
    it('should throw an error if columns are null', function() {
      assert.throws(() => StatUtil.analyze());
    });
    it('should return false when there is a string value', function() {
      assert.deepEqual(StatUtil.analyze(new Map([])), new Map([]));
    });
    it('should properly handle a single entry', function() {
      assert.deepEqual(StatUtil.analyze(
        new Map([["one", {name: "one", type: "INTEGER"}]])),
        new Map([["INTEGER", 1]]));
    });
    it('should properly calculate many values', function() {
      assert.deepEqual(StatUtil.analyze(
        new Map([
          ["one", {name: "one", type: "INTEGER"}],
          ["two", {name: "two", type: "VARCHAR(5)"}],
          ["three", {name: "three", type: "INTEGER"}],
          ["four", {name: "four", type: "BOOLEAN"}],
          ["five", {name: "five", type: "INTEGER"}],
          ["six", {name: "six", type: "VARCHAR(10)"}],
          ["seven", {name: "seven", type: "DECIMAL"}],
          ["eight", {name: "eight", type: "BOOLEAN"}],
          ["nine", {name: "nine", type: "VARCHAR(5)"}]
        ])),
        new Map([
          ["INTEGER", 3],
          ["BOOLEAN", 2],
          ["DECIMAL", 1],
          ["VARCHAR", 3]
        ]));
    });
  });
});
