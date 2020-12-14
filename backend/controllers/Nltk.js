'use strict';

var utils = require('../utils/writer.js');
var Nltk = require('../service/NltkService');

module.exports.getNltk = function getNltk (req, res, next, body) {
  Nltk.getNltk(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
