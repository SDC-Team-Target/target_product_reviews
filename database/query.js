/* eslint-disable no-console */
const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to the database');
  } else {
    console.log('Connected to the database');
  }
});

// get product by ID
const getProducts = (itemId, callback) => {
  connection.query(
    'SELECT * FROM products WHERE item_id=?',
    [itemId],
    (err, data) => {
      if (err) {
        console.log('problem getting all reviews in query');
        callback(err, null);
      } else {
        callback(null, data);
      }
    },
  );
};

// get all reviews
const getReviews = (callback) => {
  connection.query('SELECT * FROM reviews', (err, data) => {
    if (err) {
      console.log('problem getting all reviews in query');
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

// get reviews by product id
const getReviewsByID = (itemId, callback) => {
  connection.query(
    'SELECT * FROM reviews WHERE item_id=?',
    [itemId],
    (err, data) => {
      if (err) {
        console.log('problem getting all reviews in query');
        callback(err, null);
      } else {
        callback(null, data);
      }
    },
  );
};

// add a new review to the database
const postReview = (name, title, review, rating, id, callback) => {
  connection.query(
    `INSERT INTO reviews (customer_name, review_title, review, rating, item_id) VALUES ('${name}','${title}','${review}', '${rating}','${id}');
    update products p set p.average_stars = (select avg(e.rating) from reviews e where p.item_id=e.item_id group by e.item_id);
    update products p set p.five = (select count(e.rating) from reviews e where p.item_id=e.item_id and e.rating=5 group by e.item_id);
    update products p set p.four = (select count(e.rating) from reviews e where p.item_id=e.item_id and e.rating=4 group by e.item_id);
    update products p set p.three = (select count(e.rating) from reviews e where p.item_id=e.item_id and e.rating=3 group by e.item_id);
    update products p set p.two = (select count(e.rating) from reviews e where p.item_id=e.item_id and e.rating=2 group by e.item_id);
    update products p set p.one = (select count(e.rating) from reviews e where p.item_id=e.item_id and e.rating=1 group by e.item_id);
    update products p set p.total_reviews = (select count(e.review) from reviews e where p.item_id=e.item_id group by e.item_id);
    update products p set p.total_stars = (select sum(e.rating) from reviews e where p.item_id=e.item_id group by e.item_id);`,
    (err, data) => {
      if (err) {
        console.log('problem posting reviews in query');
        callback(err, null);
      } else {
        callback(null, data);
      }
    },
  );
};

// Update review in db by review_id
const updateReview = (reviewID, name, title, review, rating, callback) => {
  connection.query(
    `UPDATE reviews SET rating = '${rating}', customer_name = '${name}', review_title = '${title}', review = '${review}'
    WHERE review_id=?;`, [reviewID],
    (err, data) => {
      if (err) {
        console.log(`problem updating review in database`);
        callback(err, null);
      } else {
        callback(null, data);
      }
    },
  );
};

// Delete review by id
const deleteReview = (reviewID, callback) => {
  connection.query(`DELETE FROM reviews WHERE review_id=?`,[reviewID], (err, data) => {
    if (err) {
      console.log(`problem deleting review from database`);
      callback(err, null);
    } else {
      callback(null, data);
    }
  },
  );
};

module.exports = {
  getReviews, postReview, getProducts, getReviewsByID, updateReview, deleteReview
};
