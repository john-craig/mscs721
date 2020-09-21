'use strict';


/**
 * Calculate
 * Post text to generate locations
 *
 * body String Text to be analyzed (optional)
 * returns location_result
 **/
exports.getLocations = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "input" : "The brown fox jumped over the brown log.",
  "location" : [ {
    "token" : "brown",
    "locations" : [ 1, 6 ]
  }, {
    "token" : "fox",
    "locations" : [ 2 ]
  }, {
    "token" : "jumped",
    "locations" : [ 3 ]
  }, {
    "token" : "log",
    "locations" : [ 7 ]
  }, {
    "token" : "over",
    "locations" : [ 4 ]
  }, {
    "token" : "the",
    "locations" : [ 0, 5 ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

