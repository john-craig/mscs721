//requires
"use strict";

var path = require("path");
var http = require("http");
var express = require("express");

var oas3Tools = require("oas3-tools");
var serverPort = 8080;
var dbPort = "8001";

var child = require("child_process").spawn("java", [
  "-Djava.library.path=./database/DynamoDBLocal_lib",
  "-jar",
  "./database/DynamoDBLocal.jar",
  "-sharedDb",
  "-port",
  dbPort,
]);

//-Djava.library.path=./database/DynamoDBLocal_lib -jar ./database/DynamoDBLocal.jar -sharedDb

var database = require("./utils/database");

//dynamoDB setup
database.setupTables();

// swaggerRouter configuration
var options = {
  controllers: path.join(__dirname, "./controllers"),
};

var expressAppConfig = oas3Tools.expressAppConfig(
  path.join(__dirname, "api/openapi.yaml"),
  options
);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

//app.use(express.static(path.join(__dirname + "./client")));

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
  console.log(
    "Your server is listening on port %d (http://localhost:%d)",
    serverPort,
    serverPort
  );
  console.log(
    "Swagger-ui is available on http://localhost:%d/docs",
    serverPort
  );
});
