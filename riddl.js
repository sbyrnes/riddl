"use strict";
/**
 * Riddl.js
 *
 * Generates DDL statements for a given CSV file.
 */
const fs = require('fs');
const typer = require('./src/typer.js');
const ddlBuilder = require('./src/ddlBuilder.js');

// limit on the number of lines from the CSV to consider
const LINE_LIMIT = 100;

const DEFAULT_DELIMITER = ',';


let delimiter = DEFAULT_DELIMITER;
if(process.argv[3]) {
  delimiter = process.argv[3];
  console.log("Using delimiter: " + delimiter);
}

// Output containers
let headers = new Map();
let columns = new Map();

// read in the input CSV file
// TODO: Only read in LINE_LIMIT lines of the input
let inputCSV = fs.readFileSync(process.argv[2], 'utf-8');
let inputCSVlines = inputCSV.trim().split('\n');

// Extract headers from the first line
let columnNames = inputCSVlines.shift().split(delimiter);
for(let cn of columnNames) {
  headers.set(cn, {name: cn.trim(), primary: false, type: "TEXT"});
  columns.set(cn, []);
}

// Assemble columns from the row data
for(let r of inputCSVlines) {
  let values = r.split(delimiter);
  for(let i=0;i<values.length;i++) {
    columns.get(columnNames[i]).push(values[i]);
  }
}

// Look through columns and identify the type
for(let cn of columnNames) {
  let type = "TEXT";
  let column = columns.get(cn);
  if(typer.isInteger(column)) {
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

// Print the DDL to STD Output
let ddl = ddlBuilder.create(headers);
console.log(ddl);

process.exit(1);
