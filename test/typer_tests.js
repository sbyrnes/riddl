"use strict";

const typer = require('../typer.js');

var assert = require('assert');
describe('Typer', function() {
  describe('#isInteger()', function() {
    it('should return true when all values are integers', function() {
      assert.equal(typer.isInteger(["1", "2", "3234232", "0"]), true);
    });
    it('should return false when there is a string value', function() {
      assert.equal(typer.isInteger(["1", "2", "hello", "0"]), false);
    });
    it('should return false when there is a float value', function() {
      assert.equal(typer.isInteger(["1", "2.234", "3234232", "0"]), false);
    });
    it('should return false when there is a boolean value', function() {
      assert.equal(typer.isInteger(["1", "2.234", "true", "0"]), false);
    });
    it('should return false when the array is empty', function() {
      assert.equal(typer.isInteger([]), false);
    });
  });

  describe('#isBoolean()', function() {
    it('should return true when all values are booleans', function() {
      assert.equal(typer.isDecimal(["true", "false", "false", "true"]), true);
    });
    it('should return false when there is a string value', function() {
      assert.equal(typer.isDecimal(["true", "false", "false", "hello"]), false);
    });
    it('should return false when there is an integer value', function() {
      assert.equal(typer.isDecimal(["1", "false", "false", "true"]), false);
    });
    it('should return false when there is an decimal value', function() {
      assert.equal(typer.isDecimal(["true", "2.3", "false", "true"]), false);
    });
    it('should return false when the array is empty', function() {
      assert.equal(typer.isDecimal([]), false);
    });
  });

  describe('#isDecimal()', function() {
    it('should return true when all values are decimals', function() {
      assert.equal(typer.isDecimal(["1.1", "2.0", "23.234", "12.12324235"]), true);
    });
    it('should return false when there is a string value', function() {
      assert.equal(typer.isDecimal(["hello", "2.0", "23.234", "12.12324235"]), false);
    });
    it('should return false when there is an integer value', function() {
      assert.equal(typer.isDecimal(["1.1", "2.0", "5", "12.12324235"]), false);
    });
    it('should return false when there is a boolean value', function() {
      assert.equal(typer.isDecimal(["1.1", "2.0", "true", "12.12324235"]), false);
    });
    it('should return false when the array is empty', function() {
      assert.equal(typer.isDecimal([]), false);
    });
  });

  describe('#maxChars()', function() {
    it('should return 0 when the array is empty', function() {
      assert.equal(typer.maxChars([]), 0);
    });
    it('should return the correct max characters when given a single value', function() {
      assert.equal(typer.maxChars(["three"]), 5);
    });
    it('should return the correct max characters when given a list', function() {
      assert.equal(typer.maxChars(["hello", "h", "this is a phrase", "cmon this is too long"]), 25);
    });
  });
});
