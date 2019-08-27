"use strict";
/**
 * Typer.js
 *
 * Type checking utilities for arrays of values;
 */

// Returns true if the array contains integers
exports.isInteger = function(array) {
  let testResults = array.map(x => !isNaN(parseInt(x)) && x.indexOf('.') == -1);

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns true if the array contains booleans
exports.isBoolean = function(array) {
  let testResults = array.map(x => x.trim().toUpperCase() === "true".toUpperCase() || x.trim().toUpperCase() === "false".toUpperCase());

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns true if the array contains decimals
exports.isDecimal = function(array) {
  let testResults = array.map(x => !isNaN(parseFloat(x)));

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns the maximum number of characters from the values in an array
exports.maxChars = function(array) {
  let testResults = array.map(x => x.length);
  let max = Math.max.apply(null, testResults);

  // Round up to the next multiple of 5;
  return Math.ceil(max / 5) * 5;
};