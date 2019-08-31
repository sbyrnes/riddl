"use strict";
/**
 * DDLBuilder.js
 *
 * Builds a DDL from inputs;
 */

 // template for the beginning of the DDL
 const DDL_TEMPLATE = "CREATE TABLE ";
 const DEFAULT_TABLE_NAME = "_put_table_name_here_";

// Builds a DDL from the headers in the form {name: '', type: ''}
exports.create = function(headers, tableName) {
  if(!headers) throw new Error ("No columns found");

  if(!tableName) tableName = DEFAULT_TABLE_NAME;
  let outputDDL = DDL_TEMPLATE + tableName + " (\n";

  // output the columns into the DDL
  for(let [name, entry] of headers) {
    outputDDL += "\t" + entry.type + " " + exports.formatHeader(entry.name);
    if(entry.primary) {
      outputDDL += " PRIMARY KEY"
    }
    outputDDL += ",\n";
  }

  // end file
  if(headers.size > 0) outputDDL = outputDDL.slice(0, outputDDL.length-2) + "\n"; // remove last comma
  else outputDDL = outputDDL.slice(0, outputDDL.length-1); // remove last return
  outputDDL += ");";

  return outputDDL;
}

// Formats a header to comply with SQL requirements
exports.formatHeader = function(headerName) {
  if(!headerName) return "COLUMN_NAME";

  headerName = headerName.replace(/\s+/g, '_');     // replace spaces with underscores
  headerName = headerName.replace(/[\"\']/g, ''); // remove all quotations

  return headerName;
}
