const faker = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('./reviewData.csv');
writeReviews.write('reviewID,customerName,reviewTitle,reviewText,productID,rating,date\n', 'utf8');

const writeTenMillionReviews = (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const reviewID = id;
      const customerName = faker.internet.userName();
      const reviewTitle = faker.commerce.productAdjective();
      const reviewText = faker.lorem.sentence();
      const productID = id;
      const rating = faker.random.number({ min: 1, max: 5 })
      const date = faker.date.recent();

      const data = `${reviewID},${customerName},${reviewTitle},${reviewText},${productID},${rating},${date}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
        if (i > 0) {
        // write some more once it drains
        writer.once('drain', write);
    }
  }
  write()
}

writeTenMillionReviews(writeReviews, 'utf-8', () => {
  writeReviews.end();
});

