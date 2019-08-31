"use strict";

const ParseUtil = require('../src/parseUtil.js');

var assert = require('assert');
describe('ParseUtil', function() {
  describe('#parse()', function() {
    it('should throw an error if no text is provided', function() {
      assert.throws(() => ParseUtil.parse());
    });
    it('should return empty results if text is empty', function() {
      assert.deepEqual(ParseUtil.parse([],','),
        {
          headers: new Map(),
          columns: new Map()
        }
    );
    });
    it('should return empty results if text is space', function() {
      assert.deepEqual(ParseUtil.parse([" "],','),
        {
          headers: new Map(),
          columns: new Map()
        });
    });
    it('should properly parse just headers', function() {
      const {headers, columns} = ParseUtil.parse(["first, second"],',');
      assert.equal(headers.size, 2);
      assert.deepEqual(headers.get("first"),
        {name: "first", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("second"),
        {name: "second", primary: false, type: "BLANK"}
      );

      assert.equal(columns.size, 2);
      assert.deepEqual(columns,
        new Map([
          ["first", []],
          ["second", []]
        ])
      );
    });
    it('should properly parse entire files', function() {
      const {headers, columns} = ParseUtil.parse(
        ["first, second, third, fourth",
         "1,hello,false,3.2",
         "2,zup,true,5.1",
         "3,bye,false,6.3"
        ],
        ',');
      assert.equal(headers.size, 4);
      assert.deepEqual(headers.get("first"),
        {name: "first", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("second"),
        {name: "second", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("third"),
        {name: "third", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("fourth"),
        {name: "fourth", primary: false, type: "BLANK"}
      );

      assert.equal(columns.size, 4);
      assert.deepEqual(columns,
        new Map([
          ["first", ["1","2","3"]],
          ["second", ["hello","zup","bye"]],
          ["third", ["false","true","false"]],
          ["fourth", ["3.2","5.1","6.3"]]
        ])
      );
    });
    it('should properly parse sparse files', function() {
      const {headers, columns} = ParseUtil.parse(
        ["first, second,,, , fourth",
         "1,hello,false,, , 3.2",
         "2,zup,true,, , 5.1",
         "3,bye,false,, , 6.3"
        ],
        ',');
      assert.equal(headers.size, 6);
      assert.deepEqual(headers.get("first"),
        {name: "first", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("second"),
        {name: "second", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("COLUMN_2"),
        {name: "COLUMN_2", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("COLUMN_3"),
        {name: "COLUMN_3", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("COLUMN_4"),
        {name: "COLUMN_4", primary: false, type: "BLANK"}
      );
      assert.deepEqual(headers.get("fourth"),
        {name: "fourth", primary: false, type: "BLANK"}
      );

      assert.equal(columns.size, 6);
      assert.deepEqual(columns.get("first"), ["1","2","3"]);
      assert.deepEqual(columns.get("second"), ["hello","zup","bye"]);
      assert.deepEqual(columns.get("COLUMN_2"), ["false","true","false"]);
      assert.deepEqual(columns.get("COLUMN_3"), []);
      assert.deepEqual(columns.get("COLUMN_4"), []);
      assert.deepEqual(columns.get("fourth"), ["3.2","5.1","6.3"]);
    });
  });
});
