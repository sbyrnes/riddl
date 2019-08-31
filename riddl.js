"use strict";
/**
 * Riddl.js
 *
 * Generates DDL statements for a given CSV file.
 */
const fs = require('fs');
const typer = require('./src/typer.js');
const ddlBuilder = require('./src/ddlBuilder.js');
const largeFileUtil = require('./src/largeFileUtil.js');
const statUtil = require('./src/statUtil.js');
const parseUtil = require('./src/parseUtil.js');

// limit on the number of lines from the CSV to consider
const LINE_LIMIT = 100;

const DEFAULT_DELIMITER = ',';


let delimiter = DEFAULT_DELIMITER;
if(process.argv[3]) {
  delimiter = process.argv[3];
  console.log("Using delimiter: " + delimiter);
}

// read in the input CSV file
let inputCSVlines = largeFileUtil.head(process.argv[2], LINE_LIMIT);

// Parse the input data into column definitions
const {headers, columns} = parseUtil.parse(inputCSVlines, delimiter);

// Look through columns and identify the type
let blankCounter = 0;
let blanks = [];
for(let cn of headers.keys()) {
  let type = "TEXT";
  let column = columns.get(cn);
  if(typer.isEmpty(column)) {
    type = "VARCHAR(1)";
    blankCounter += 1;
    blanks.push(cn)
  } else if(typer.isInteger(column)) {
    type = "INTEGER";
  } else if(typer.isBoolean(column)) {
    type = "BOOLEAN";
  } else if(typer.isDecimal(column)) {
    type = "DECIMAL";
  } else {
    type = "VARCHAR("+typer.maxChars(column)+")";
  }

  headers.get(cn).type = type;
}

// Display statistics
let stats = statUtil.analyze(headers);
console.log("Lines analyzed: ", '\x1b[32m', LINE_LIMIT, '\x1b[0m');
console.log("Type counts: ");
for(const [type, count] of stats) {
  console.log('\t', type, ": ", '\x1b[32m', count, '\x1b[0m');
}
console.log("Empty Columns: ", '\x1b[31m', blankCounter, '\x1b[0m');
for(const blank of blanks) {
  console.log('\t', '\x1b[31m', blank, '\x1b[0m');
}

console.log("\nDDL:");

// Print the DDL to STD Output
let ddl = ddlBuilder.create(headers);
console.log("\n"+ddl);

process.exit(1);
