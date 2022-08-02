import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '10s', target: 0 }
  ]
};
export default function () {
  const BASE_URL = 'http://localhost:3000/reviews/'; // make sure this is not production

  const responses = http.batch([
    [
      'GET',
      `${BASE_URL}?product_id=${Math.floor(
        Math.random() * (1000011 - 900000) + 900000
      )}`,
      null,
      { tags: { name: 'Reviews' } }
    ],
    [
      'GET',
      `${BASE_URL}?product_id=${Math.floor(
        Math.random() * (1000011 - 900000) + 900000
      )}`,
      null,
      { tags: { name: 'Reviews' } }
    ],
    [
      'GET',
      `${BASE_URL}?product_id=${Math.floor(
        Math.random() * (1000011 - 900000) + 900000
      )}`,
      null,
      { tags: { name: 'Reviews' } }
    ],
    [
      'GET',
      `${BASE_URL}?product_id=${Math.floor(
        Math.random() * (1000011 - 900000) + 900000
      )}`,
      null,
      { tags: { name: 'Reviews' } }
    ]
  ]);

  sleep(1);
}
