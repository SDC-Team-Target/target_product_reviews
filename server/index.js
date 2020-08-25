/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const {
  postReview,
  getProducts,
  getReviewsByID,
} = require('../database/query');

const app = express();
const port = 8080;

// connect to the client
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cors());

// ROUTING
// handle get request for individual product by id
app.get('/products/:item_id', (req, res) => {
  getProducts(req.params.item_id, (err, data) => {
    if (err) {
      console.log('problem getting tasks from server for products');
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// handle get request for reviews by id
app.get('/reviews/:item_id', (req, res) => {
  getReviewsByID(req.params.item_id, (err, data) => {
    if (err) {
      console.log('problem getting tasks from server for reviews');
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// handle post request and add reviews sent by clients
app.post('/add-review', (req, res) => {
  postReview(
    req.body.customer_name,
    req.body.review_title,
    req.body.review,
    req.body.rating,
    req.body.item_id,
    (err, data) => {
      if (err) {
        console.log('problem getting tasks from server');
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    },
  );
});

// listen to port
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
