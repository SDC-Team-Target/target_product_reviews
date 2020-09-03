import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '1m45s', target: 250 },
    { duration: '1m30s', target: 300 },
    {duration: '1m15s', target: 350 },
    {duration: '1m10s', target: 500 },
  ]
};

// export default function() {
//   let res = http.get('http://localhost:3000/reviews/9999999');
//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });
// }
export default function () {
  var url = 'http://localhost:3000/review';
  var payload = JSON.stringify({
    customer_name: 'customer',
    review_title: 'title',
    reviewText: 'some text',
    rating: 3,
    productID: 5000000
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}