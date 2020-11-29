'use strict';

// eslint-disable-next-line no-undef
var utils = require('../utils/writer.js');
// eslint-disable-next-line no-undef
var Analysis = require('../service/AnalysisService');

module.exports.getConcordance = function getConcordance (req, res, next, body) {
  Analysis.getConcordance(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
