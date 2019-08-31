"use strict";
/**
 * StatUtil.js
 *
 * Calculates statistics on columns detected from the data;
 */

// Returns true if the array contains integers
exports.analyze = function(columns) {
  let counts = new Map();

  for(let [name, entry] of columns) {
    let type = entry.type;

    // normalize all VARCHAR fields, regardless of characters
    if(type.indexOf("VARCHAR") != -1) type = "VARCHAR";

    if(!counts.has(type)) counts.set(type, 1);
    else counts.set(type, counts.get(type)+1);
  }

  return counts;
}
