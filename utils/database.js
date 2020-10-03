//requires
'use strict';

var AWS = require('aws-sdk');

AWS.config.update({
    endpoint: "http://localhost:8001",
    region: 'us-east-2',
    accessKeyId: "akid", 
    secretAccessKey: "secret",
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.setupTables = async function setupTables(){
    var locationParams = {
        TableName : "Locations",
        KeySchema: [       
            { AttributeName: "input", KeyType: "HASH"}
        ],
        AttributeDefinitions: [       
            { AttributeName: "input", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };
    
    var concordanceParams = {
        TableName : "Concordances",
        KeySchema: [       
            { AttributeName: "input", KeyType: "HASH"}
        ],
        AttributeDefinitions: [       
            { AttributeName: "input", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    //await dynamodb.deleteTable({TableName: "Concordances"}, function(err) {console.log(err)})
    
    dynamodb.createTable(locationParams, function(err, data) {
        if (err) {
            if (err.message != "Cannot create preexisting table"){
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Table already exists");
            }
        } else {
            console.log("Created table: " + locationParams.TableName);
        }
    });
    
    dynamodb.createTable(concordanceParams, function(err, data) {
        if (err) {
            if (err.message != "Cannot create preexisting table"){
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Table already exists");
            }
        } else {
            console.log("Created table: " + concordanceParams.TableName);
        }
    });
    
}

module.exports.putItem = function putItem(table, input, data){
    var params = {
        TableName: table,
        Item:{
            "input": input,
            "data": data,
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
    });

}

module.exports.getItem = function getItem(table, input, callback){
    var params = {
        TableName: table,
        Key:{
            "input": input
        }
    };
    
    var item = null;

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(data.Item)
        }
    });
}