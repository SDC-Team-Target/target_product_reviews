/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const pgConnectionString = require('../database/pg_config');
const { Client } = require('pg');

const app = express();
const port = 8080;

// connect to the client
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cors());

// Mongodb connection
var db, reviewsCollection;
MongoClient.connect('mongodb://localhost/SDC_reviews', { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db('SDC_reviews');
    reviewsCollection = db.collection('reviews');
    console.log(`Connected to Mongodb`)
  })
  .catch((err) => console.log(err))

// get review by productID
app.get(`/review/:productID`, (req, res) => {
  let productIDNum = parseInt(req.params.productID);
  reviewsCollection.findOne({ productID: productIDNum })
  .then(result => {
      console.log(`Successfully found document by productID: ${productIDNum}`);
      res.status(200).send(result);
  })
  .catch(err => console.error(`Failed to find document: ${err}`));
})

// Postgres connection
const pgClient = new Client({
    connectionString: pgConnectionString.connectionString
});

pgClient.connect()
.then(() => console.log('Connected to pg db!'))
.catch(err => console.log(err))


// BEGIN LEGACY CODE - MySQL db
// SQL connection
// const {
//   postReview,
//   getProducts,
//   getReviewsByID,
//   updateReview,
//   deleteReview
// } = require('../database/query');

// SQL ROUTING
// handle get request for individual product by id
// app.get('/products/:item_id', (req, res) => {
//   getProducts(req.params.item_id, (err, data) => {
//     if (err) {
//       console.log('problem getting tasks from server for products');
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// });

// // handle get request for reviews by id
// app.get('/reviews/:item_id', (req, res) => {
//   getReviewsByID(req.params.item_id, (err, data) => {
//     if (err) {
//       console.log('problem getting tasks from server for reviews');
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// });

// // handle post request and add reviews sent by clients
// app.post('/add-review', (req, res) => {
//   postReview(
//     req.body.customer_name,
//     req.body.review_title,
//     req.body.review,
//     req.body.rating,
//     req.body.item_id,
//     (err, data) => {
//       if (err) {
//         console.log('problem getting tasks from server');
//         res.sendStatus(500);
//       } else {
//         res.send(data);
//       }
//     },
//   );
// });

// // handle put request to update a review by review_id
// app.put('/review/:review_id', (req, res) => {
//   updateReview(
//     req.params.review_id,
//     req.body.customer_name,
//     req.body.review_title,
//     req.body.review,
//     req.body.rating,
//     (err, data) => {
//       if (err) {
//         console.log(`problem updating review by id`);
//         res.sendStatus(500);
//       } else {
//         res.send(data);
//       }
//     },
//   );
// });

// // handle delete review
// app.delete('/review/:review_id', (req, res) => {
//   deleteReview(req.params.review_id, (err, data) => {
//     if (err) {
//       console.log(`problem deleting review by id`);
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   },
//   );
// });

// listen to port
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
