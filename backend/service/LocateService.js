"use strict";
import database from "../utils/database";

/**
 * Calculate
 * Post text to generate locations
 *
 * body String Text to be analyzed (optional)
 * returns location_result
 **/
exports.getLocations = function (body) {
  return new Promise(function (resolve) {
    var location = [];

    if (typeof body !== "string") {
      const error = { error: "Please post a string in text/plain format" };

      resolve(error);
    } else {
      database.getItem("Locations", body, function (storedLocation) {
        if (storedLocation) {
          location = JSON.parse(storedLocation.data);
        } else {
          var locations;
          var partialLocation = {};
          var tokens = body.split(" ");

          tokens = standardize(tokens);

          tokens.forEach((token, index) => {
            if (partialLocation[token] == undefined) {
              locations = [];
              locations.push(index);

              partialLocation[token] = locations;
            } else {
              locations = partialLocation[token];
              locations.push(index);

              partialLocation[token] = locations;
            }
          });

          location = Object.keys(partialLocation).map((key) => {
            return {
              token: key,
              locations: partialLocation[key],
            };
          });

          database.putItem("Locations", body, JSON.stringify(location));
        }

        if (location.length > 0) {
          var output = {
            input: body,
            locations: location,
          };

          resolve(output);
        } else {
          resolve();
        }
      });
    }
  });
};

function standardize(stringArray) {
  const standardizedArray = stringArray.map((element) => {
    var standardized = element;

    standardized = standardized.toLowerCase();
    standardized = standardized.replace(/[^0-9a-z]/gi, "");

    return standardized;
  });

  return standardizedArray;
}
