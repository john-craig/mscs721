# Concordance parser

## Overview
This server was generated by the [swagger-codegen](https://github.com/swagger-api/swagger-codegen) project. 

### Running the server
To run the server, run:

```
npm start
```

### Submitting POST requests
To submit a POST request to analyze a concordance, run the following command:

```
curl -X POST localhost:8080/[DIRNAME]/concordance/1.0.0/analyze -H "Content-Type: text/plain" -d [YOUR STRING HERE]
```

To submit a POST request to find locations in a string, run the following command:

```
curl -X POST localhost:8080/[DIRNAME]/concordance/1.0.0/locate -H "Content-Type: text/plain" -d [YOUR STRING HERE]
```
