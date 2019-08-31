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

// Returns true if the array contains integers
exports.parse = function(textLines, delimiter) {
  if(!textLines) throw new Error("Text is invalid");

  let headers = new Map();
  let columns = new Map();

  // Extract headers from the first line
  // TODO: Detect whether the first line really are headers or if there are no headers
  let firstLine = textLines.shift();
  if(firstLine && firstLine.trim().length > 0) {
    let columnNames = firstLine.split(delimiter).map(x => x.trim());
    for(let cn of columnNames) {
      let cleanName = cn.trim();
      headers.set(cleanName, {name: cleanName, primary: false, type: "TEXT"});
      columns.set(cleanName, []);
    }

    // Assemble columns from the row data
    for(let r of textLines) {
      let values = r.split(delimiter);
      for(let i=0;i<values.length;i++) {
        columns.get(columnNames[i]).push(values[i]);
      }
    }
  }

  return {
    headers: headers,
    columns: columns
  };
}
