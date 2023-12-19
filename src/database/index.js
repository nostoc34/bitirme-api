import {
    RETHINKDB_ADDRESS,
    RETHINKDB_PORT
} from '../constants';

export var r = require('rethinkdbdash')({
    servers: [{
        host: RETHINKDB_ADDRESS,
        port: RETHINKDB_PORT
    }]
});