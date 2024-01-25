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
import getAuthStatus from './src/authentication';
import {
    graphqlHTTP
} from 'express-graphql';
import {
    graphqlUploadExpress
} from 'graphql-upload';
import schema from './src';

//RestAPI Endpoints
import register from './src/restAPIs/register';
import login from './src/restAPIs/login';

var app = express();
app.use(cors());

const urlEncoded = bodyParser.urlencoded({
    extended: true
});
const jsonParser = bodyParser.json();


app.use("/upload", express.static(__dirname + '/upload'));

app.use(
    "/graphql",async (req, res, next) => {
        if(req.query && req.query.authorization) {
            req.headers.authorization = req.query.authorization;
        }

        if(!req.headers || !req.headers.authorization) {
            res.statusCode = 200;
            res.send({
                message: "Authentication required.",
                code: 403
            });
            return;
        }
    
        getAuthStatus({
            token: req.headers.authorization
        })
            .then((response) => {
                req.data = response;
                next();
            })
            .catch((error) => {
                res.statusCode = error.code;
                res.end(error.message);
            });
    },
    graphqlUploadExpress({
        maxFileSize: 10000000,
        maxFiles: 64 
    }),

    graphqlHTTP((request, response, graphQLParams) => {
        return {
            schema: schema,
            context: request.data,
            graphiql: true
        };
    })
);


//RestAPIs

app.post("/register", jsonParser, async (req, res) => {
    const result = await register(req);
    res.statusCode = result.code;
    res.send(result);
});

app.post("/login", jsonParser, async (req, res) => {
    const result = await login(req);
    res.statusCode = result.code;
    res.send(result);
});

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");