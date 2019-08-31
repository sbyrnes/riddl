"use strict";

const DDLBuilder = require('../src/ddlBuilder.js');

var assert = require('assert');
describe('DDLBuilder', function() {
  describe('#formatHeader()', function() {
    it('should return a value for a null header', function() {
      assert.equal(DDLBuilder.formatHeader(), "COLUMN_NAME");
    });
    it('should return the same value provided if its valid', function() {
      assert.equal(DDLBuilder.formatHeader("Valid_Column_Name"), "Valid_Column_Name");
    });
    it('should reformat invalid column names', function() {
      assert.equal(DDLBuilder.formatHeader("This is a sentence"), "This_is_a_sentence");
      assert.equal(DDLBuilder.formatHeader("Lots      of space"), "Lots_of_space");
      assert.equal(DDLBuilder.formatHeader("Don\'t use apostrophes"), "Dont_use_apostrophes");
      assert.equal(DDLBuilder.formatHeader("\"Do not use quotes\""), "Do_not_use_quotes");
    });
  });

  describe('#create()', function() {
    it('should have tests', function() {
      assert.equal(false, true);
    });
  });
});
