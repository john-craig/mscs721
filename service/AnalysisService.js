'use strict';


/**
 * Calculate
 * Post text to generate concordance
 *
 * body String Text to be analyzed (optional)
 * returns result
 **/
exports.getConcordance = function(body) {
  return new Promise(function(resolve, reject) {
    var concordance = []

    if(typeof body !== "string"){
      const error = {"error": "Please post a string in text/plain format"}

      resolve(error)
    } else {
      var partialConcordance = {}
      var tokens = body.split(' ')
      tokens = standardize(tokens)
      tokens.sort()

      tokens.forEach(token => {
        if(partialConcordance[token] == undefined) {
          partialConcordance[token] = 1
        } else {
          partialConcordance[token] = partialConcordance[token] + 1
        }
      })

      concordance = Object.keys(partialConcordance).map(key => {
        return {
          "token": key,
          "count": partialConcordance[key]
        }
      })
    }

    if (concordance.length > 0) {
      resolve(concordance);
    } else {
      resolve();
    }
  });
}

function standardize(stringArray){
  const standardizedArray = stringArray.map(element => {
    var standardized = element

    standardized = standardized.toLowerCase()
    standardized = standardized.replace(/[^0-9a-z]/gi, '')

    return standardized
  })

  return standardizedArray
}