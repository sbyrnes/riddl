"use strict";
/**
 * ParseUtil.js
 *
 * Utility for parsing files.
 */

var fs = require('fs');

// Default number of lines to read
const DEFAULT_LINES_TO_READ = 100;
const BUFFER_SIZE = 10;
const DEFAULT_TYPE = "BLANK";
const QUOTATION_CHARACTER = '\"';

// Returns true if the array contains integers
exports.parse = function(textLines, delimiter) {
  if(!textLines) throw new Error("Text is invalid");

  let headers = new Map();
  let columns = new Map();

  let firstLine = textLines.shift();
  if(firstLine && firstLine.trim().length > 0) { // make sure there is a first line
    // Parse header names on the first line
    // TODO: Detect whether the first line really are headers or if there are no headers
    let columnNames = exports.safeSplit(firstLine, delimiter);
    for(let i=0; i< columnNames.length; i++) {
      if(columnNames[i].length == 0) columnNames[i] = "COLUMN_" + i;
    }

    // Build initial data structures
    for(let cn of columnNames) {
      let cleanName = cn.trim();
      headers.set(cleanName, {name: cleanName, primary: false, type: DEFAULT_TYPE});
      columns.set(cleanName, []);
    }

    // Assemble columns from the row data
    for(let r of textLines) {
      let values = exports.safeSplit(r, delimiter);
      for(let i=0;i<values.length;i++) {
        let cleanValue = values[i].trim();
        if(cleanValue.length > 0) {
          columns.get(columnNames[i]).push(cleanValue);
        }
      }
    }
  }

  return {
    headers: headers,
    columns: columns
  };
}

// Safely splits a string with a given delimiter, respecting quotation segments where the delimiter should be ignored
exports.safeSplit = function(input, delimiter) {
  let segments = [];
  if(input.length == 0) return segments;

  let accumulator = "";
  let escape_status = false;
  for (const c of input) {
    if(c == QUOTATION_CHARACTER) {
      escape_status = !escape_status; // toggle whether we are escaped
    } else if(c == delimiter) {
      if(escape_status) {
        accumulator += c;
      } else {
        segments.push(accumulator);
        accumulator = "";
      }
    } else {
      accumulator += c;
    }
  }
  segments.push(accumulator);

  return segments.map(x => x.trim());
}
