"use strict";
/**
 * LargeFileUtil.js
 *
 * Utility for working with large files that don't fit entirely in memory.
 */

var fs = require('fs');

// Default number of lines to read
const DEFAULT_LINES_TO_READ = 100;
const BUFFER_SIZE = 10;

// Returns true if the array contains integers
exports.head = function(fileName, lineCount) {
  if(!fileName) throw new Error("No file specified");
  if(!fs.existsSync(fileName)) throw new Error("File not found: " + fileName);
  if(!lineCount) lineCount = DEFAULT_LINES_TO_READ;

  // create a buffer to read into
  let fd = fs.openSync(fileName, 'r');
  let buffer = Buffer.alloc(BUFFER_SIZE);

  let currentLine = '';
  let lines = [];
  let returnCharIndex = -1;
  // For every full buffer
  while (fs.readSync(fd, buffer, 0, BUFFER_SIZE) !== 0) {
    currentLine += buffer.toString('utf8'); // add to existing line
    returnCharIndex = currentLine.indexOf("\n"); // look for a return character

    if (returnCharIndex !== -1) {
      // found a complete line
      lines.push(currentLine.slice(0,returnCharIndex).trim());

      if(lines.length == lineCount) return lines;
      else currentLine = currentLine.slice(returnCharIndex+1);
    }
  }

  return lines;
}
