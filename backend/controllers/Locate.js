'use strict';

var utils = require('../utils/writer.js');
var Locate = require('../service/LocateService');

module.exports.getLocations = function getLocations (req, res, next, body) {
  Locate.getLocations(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
