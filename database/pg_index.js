const { Client } = require('pg');
const pgConfig = require('./pg_config');

const client = new Client(pgConfig);

client.connect()
.then(() => console.log('Connected to pg db!'))
.catch(err => console.log(err))