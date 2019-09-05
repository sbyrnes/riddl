"use strict";

const typer = require('../src/typer.js');

var assert = require('assert');
describe('Typer', function() {
  describe('#isEmpty()', function() {
    it('should return true if there is no values', function() {
      assert.equal(typer.isEmpty(), true);
    });
    it('should return true if the array is empty', function() {
      assert.equal(typer.isEmpty([]), true);
    });
    it('should return true if all values are empty', function() {
      assert.equal(typer.isEmpty([""]), true);
      assert.equal(typer.isEmpty(["","",""]), true);
    });
  });

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
    it('should return false when there is a date value', function() {
      assert.equal(typer.isInteger(["1", "2.234", "12/23/2018", "0"]), false);
      assert.equal(typer.isInteger(["1", "2.234", "2002-12-01", "0"]), false);
    });
    it('should return false when the array is empty', function() {
      assert.equal(typer.isInteger([]), false);
    });
  });

  describe('#isBoolean()', function() {
    it('should return true when all values are booleans', function() {
      assert.equal(typer.isBoolean(["true", "false", "false", "true"]), true);
    });
    it('should return false when there is a string value', function() {
      assert.equal(typer.isBoolean(["true", "false", "false", "hello"]), false);
    });
    it('should return false when there is an integer value', function() {
      assert.equal(typer.isBoolean(["1", "false", "false", "true"]), false);
    });
    it('should return false when there is an decimal value', function() {
      assert.equal(typer.isBoolean(["true", "2.3", "false", "true"]), false);
    });
    it('should return false when the array is empty', function() {
      assert.equal(typer.isBoolean([]), false);
    });
  });

  describe('#isDecimal()', function() {
    it('should return true when all values are decimals', function() {
      assert.equal(typer.isDecimal(["1.1", "2.0", "23.234", "12.12324235"]), true);
    });
    it('should return false when there is a string value', function() {
      assert.equal(typer.isDecimal(["hello", "2.0", "23.234", "12.12324235"]), false);
    });
    it('should return true when there is an integer value', function() {
      assert.equal(typer.isDecimal(["1.1", "2.0", "5", "12.12324235"]), true);
    });
    it('should return false when there is a boolean value', function() {
      assert.equal(typer.isDecimal(["1.1", "2.0", "true", "12.12324235"]), false);
    });
    it('should return false when the array is empty', function() {
      assert.equal(typer.isDecimal([]), false);
    });
  });

  describe('#isDate()', function() {
    it('should return true when all values are dates', function() {
      assert.equal(typer.isDecimal(["2/24/17", "5/7/17","7/1/17","8/25/17"]), true);
    });
    it('should return false when dates are malformed', function() {
      assert.equal(typer.isDecimal(["23234/24/17", "5/7/17","7/1/17","8/25/17"]), true);
    });
    it('should return true when all values are sql dates', function() {
      assert.equal(typer.isDecimal(["2018-05-07", "2018-06-17", "2018-07-21", "2018-08-20"]), true);
    });
    it('should return true when all values are datetimes', function() {
      assert.equal(typer.isDecimal(["2/24/03 0:00", "5/7/03 0:00", "7/1/03 0:00", "8/25/03 0:00"]), true);
    });
    it('should return true if date times contain extra information', function() {
      assert.equal(typer.isDecimal(["2/24/03 0:00 AM", "5/7/03 0:00 PM", "7/1/03 0:00", "8/25/03 0:00"]), true);
    });
    it('should return false if there are string values', function() {
      assert.equal(typer.isDecimal(["2/24/17", "hello","7/1/17","8/25/17"]), false);
    });
    it('should return false if there are integers', function() {
      assert.equal(typer.isDecimal(["2/24/17", "123124124","7/1/17","8/25/17"]), false);
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
