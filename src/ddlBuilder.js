"use strict";
/**
 * DDLBuilder.js
 *
 * Builds a DDL from inputs;
 */

 // template for the beginning of the DDL
 const DDL_TEMPLATE = "CREATE TABLE { \n";

// Builds a DDL from the headers in the form {name: '', type: ''}
exports.create = function(headers) {
  let outputDDL = DDL_TEMPLATE;

  // output the columns into the DDL
  for(let c of headers.entries()) {
    outputDDL += "\t" + c[1].type + " " + exports.formatHeader(c[1].name);
    if(c.primary) {
      outputDDL += " PRIMARY KEY"
    }
    outputDDL += ",\n";
  }

  // end file
  outputDDL = outputDDL.substring(0, outputDDL.length-2) + "\n}";

  return outputDDL;
}

// Formats a header to comply with SQL requirements
exports.formatHeader = function(headerName) {
  if(!headerName) return "COLUMN_NAME";

  headerName = headerName.replace(/\s+/g, '_');     // replace spaces with underscores
  headerName = headerName.replace(/[\"\']/g, ''); // remove all quotations

  return headerName;
}
