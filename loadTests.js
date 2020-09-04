import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 250 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 1000 },
    { duration: '10m', target: 1000 },
    { duration: '30s', target: 250 }
  ]
};

export default function() {
  let id = Math.random() * (10000000 - 1) + 1;
  let res = http.get(`http://localhost:3000/reviews/${id}`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}

// export default function () {
//   var url = 'http://localhost:3000/review';
//   var payload = JSON.stringify({
//     customer_name: 'customer',
//     review_title: 'title',
//     reviewText: 'some text',
//     rating: 3,
//     productID: 5000000
//   });

//   var params = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   http.post(url, payload, params);
// }