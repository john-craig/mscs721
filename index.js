//requires
'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

var child = require('child_process').spawn(
    'java', ['-Djava.library.path=./database/DynamoDBLocal_lib', '-jar', './database/DynamoDBLocal.jar', '-sharedDb']
);

//-Djava.library.path=./database/DynamoDBLocal_lib -jar ./database/DynamoDBLocal.jar -sharedDb

var database = require('./utils/database');

//dynamoDB setup
database.setupTables();

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});