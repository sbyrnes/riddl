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
    it('should throw an error if no parameters are provided', function() {
      assert.throws(() => DDLBuilder.create());
    });
    it('should create an empty table if there are no columns', function() {
      assert.equal(DDLBuilder.create([], "this_table"),
      "CREATE TABLE this_table ();");
    });
    it('should create an empty table if there are no columns and no name', function() {
      assert.equal(DDLBuilder.create([]),
      "CREATE TABLE _put_table_name_here_ ();");
    });
    it('should properly create a table', function() {
      let data = new Map();
      data.set("guid", {name: "guid", type: "INTEGER"});
      data.set("some chars", {name: "some chars", type: "VARCHAR(5)"});
      data.set("bool", {name: "bool", type: "BOOLEAN"});

      let ddl = DDLBuilder.create(data, "valid_table");
      assert.equal(ddl, "CREATE TABLE valid_table (\n\tINTEGER guid,\n\tVARCHAR(5) some_chars,\n\tBOOLEAN bool\n);");
    });
  });
});
