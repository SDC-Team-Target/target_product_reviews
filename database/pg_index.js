const pgConnectionString = require('./pg_config');
const { Client } = require('pg');

//Postgres connection
const pgClient = new Client({
    connectionString: pgConnectionString.connectionString
});

pgClient.connect()
.then(() => console.log('Connected to pg db!'))
.catch(err => console.log(err))

// CREATE TABLE public.reviews
// (
//     review_id numeric NOT NULL,
//     customer_name text NOT NULL,
//     review_title text NOT NULL,
//     review text NOT NULL,
//     rating numeric NOT NULL,
//     item_id numeric NOT NULL,
//     date text NOT NULL,
//     PRIMARY KEY (review_id)
// );
