//requires
'use strict';

var path = require('path');
var http = require('http');

var AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.update({
    endpoint: "http://localhost:8001",
    region: 'us-east-2',
    accessKeyId: "akid", 
    secretAccessKey: "secret",
});

var dynamodb = new AWS.DynamoDB();

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

//dynamoDB setup

var locationParams = {
    TableName : "Locations",
    KeySchema: [       
        { AttributeName: "input", KeyType: "HASH"},
        { AttributeName: "data", KeyType: "SORT" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "input", AttributeType: "S" },
        { AttributeName: "data", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

var concordanceParams = {
    TableName : "Concordances",
    KeySchema: [       
        { AttributeName: "input", KeyType: "HASH"},
        { AttributeName: "data", KeyType: "SORT" }
    ],
    AttributeDefinitions: [       
        { AttributeName: "input", AttributeType: "S" },
        { AttributeName: "data", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(locationParams, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table: " + locationParams.TableName);
    }
});

dynamodb.createTable(concordanceParams, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table: " + concordanceParams.TableName);
    }
});

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

