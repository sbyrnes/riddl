"use strict";
/**
 * Typer.js
 *
 * Type checking utilities for arrays of values;
 */

// Returns true if the array contains only empty values
exports.isEmpty = function(array) {
  if(!array || array.length === 0) return true;

  // Are there any false values? If so return false;
  return array.filter(x => x.length > 0).length == 0;
};


// Returns true if the array contains integers
exports.isInteger = function(array) {
  if(!array || array.length === 0) return false;

  let testResults = array.map(x => !isNaN(parseInt(x)) && x.indexOf('.') == -1);

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns true if the array contains booleans
exports.isBoolean = function(array) {
  if(!array || array.length === 0) return false;

  let testResults = array.map(x => x.trim().toUpperCase() === "true".toUpperCase() || x.trim().toUpperCase() === "false".toUpperCase());

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns true if the array contains decimals
exports.isDecimal = function(array) {
  if(!array || array.length === 0) return false;

  let testResults = array.map(x => !isNaN(parseFloat(x)));

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns true if the array contains dates
//const SQL_DATE_REGEX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/i;
const SQL_DATE_REGEX = /\d{4,}-\d{2,}-\d{2,}/i;
const GREGORIAN_DATE_REGEX = /\d+\/\d+\/\d+/i;
exports.isDate = function(array) {
  if(!array || array.length === 0) return false;

  let testResults = array.map(x => SQL_DATE_REGEX.test(x) || GREGORIAN_DATE_REGEX.test(x));

  // Are there any false values? If so return false;
  return testResults.filter(bool => bool == false).length == 0;
};

// Returns the maximum number of characters from the values in an array
exports.maxChars = function(array) {
  if(!array || array.length === 0) return 0;

  let testResults = array.map(x => x.length);
  let max = Math.max.apply(null, testResults);

  // Round up to the next multiple of 5;
  return Math.ceil(max / 5) * 5;
};
