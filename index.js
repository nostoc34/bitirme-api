require('dotenv').config();
import express from 'express';
import {
    DB
} from './src/constants';
import {
    r
} from './src/database';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
    graphqlHTTP
} from 'express-graphql';
import {
    graphqlUploadExpress
} from 'graphql-upload';
import {
    schema
} from './src';

var app = express();
app.use(cors());

const urlEncoded = bodyParser.urlencoded({
    extended: true
});
const jsonParser = bodyParser.json();


app.use("/upload", express.static(__dirname + '/upload'));
app.use(
    "/graphql",
    graphqlUploadExpress({
        maxFileSize: 10000000,
        maxFiles: 64 
    }),
    graphqlHTTP((request, response, graphQLParams) => ({
        schema: schema,
        context: request.data,
        graphiql: true
    }))
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");