//requires
'use strict';

var path = require('path');
var http = require('http');

var AWS = require('aws-sdk/dist/aws-sdk-react-native');
//var myCredentials = AWS.Credentials('akid', 'secret', 'session')

AWS.config.update({
    endpoint: "http://localhost:8000",
    region:'us-east-2',
    //credentials: myCredentials
    "accessKeyId": "akid", 
    "secretAccessKey": "secret",
});

var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

//dynamoDB setup

const locationParams = {
    TableName: "locations",
    KeySchema: [
        {
            AttributeName: "input",
            KeyType: "STRING"
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: "location",
            AttributeType: "JSON"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
}

dynamodb.createTable(locationParams, function(err, data){
    if (err) console.log(err, err.stack);
    else     console.log(data);
})

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

