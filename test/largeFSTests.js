"use strict";

const LargeFileUtil = require('../src/largeFileUtil.js');

var assert = require('assert');
describe('LargeFileUtil', function() {
  describe('#head()', function() {
    it('should throw an error if no file is provided', function() {
      assert.throws(() => LargeFileUtil.head());
    });
    it('should throw an error if the file is not found', function() {
      assert.throws(() => LargeFileUtil.head("./nothing.here"));
    });
    it('should read 1 line when asked', function() {
      assert.deepEqual(LargeFileUtil.head("./test/test.csv", 1),
      ["User ID,Shoe,Size,Color,Coupon,Postal_Code,Payment,Amount"]);
    });
    it('should read 5 lines when asked', function() {
      assert.deepEqual(LargeFileUtil.head("./test/test.csv", 5),
      ["User ID,Shoe,Size,Color,Coupon,Postal_Code,Payment,Amount",
       "1,Sneaker,10,Blue,true,51000,Credit,135.67",
       "2,Boot,9,Black,false,17900,Debit,86.75",
       "3,Sandal,7,Blue,true,53200,Debit,56.43",
       "4,Sneaker,12,Grey,true,60900,Credit,135.67"]);
    });
    it('should read all lines if the file is shorter than the request', function() {
      assert.deepEqual(LargeFileUtil.head("./test/test.csv", 100),
      ["User ID,Shoe,Size,Color,Coupon,Postal_Code,Payment,Amount",
       "1,Sneaker,10,Blue,true,51000,Credit,135.67",
       "2,Boot,9,Black,false,17900,Debit,86.75",
       "3,Sandal,7,Blue,true,53200,Debit,56.43",
       "4,Sneaker,12,Grey,true,60900,Credit,135.67",
       "5,Flat,7,Blue,false,17800,Credit,45.24"]);
    });
  });
});
