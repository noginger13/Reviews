import {
  describe,
  expect,
  chai
} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.0.6/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';

export let options = {
  thresholds: {
    // fail the test if any checks fail or any requests fail
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
    http_req_failed: [{ threshold: 'rate == 0.00', abortOnFail: true }]
  },
  vus: 10,
  iterations: 10
};

let session = new Httpx({ baseURL: 'http://localhost:3000/reviews/' });

function retrieveProductReviews() {
  describe('Fetch reviews one by one', () => {
    let responses = session.batch([
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      )
    ]);

    expect(responses, 'responses').to.be.an('array');

    responses.forEach((response) => {
      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json(), 'reviews').to.be.an('object');
      expect(response.json(), 'reviews').to.include.keys(
        'product',
        'count',
        'results'
      );
      expect(response.json().product).to.be.a('string');
      expect(response.json().page).to.be.a('number');
      expect(response.json().count).to.be.a('number');
    });
  });

  describe('Results should have all attributes', () => {
    let responses = session.batch([
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      ),
      new Get(
        `?product_id=${Math.floor(Math.random() * (1000011 - 900000) + 900000)}`
      )
    ]);

    expect(responses, 'responses').to.be.an('array');

    responses.forEach((response) => {
      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json().results, 'results').to.be.an('array');
      if (response.json().results[0]) {
        expect(response.json().results[0].photos, 'photos').to.be.an('array');
        expect(response.json().results[0], 'results').to.include.keys(
          'review_id',
          'photos',
          'date'
        );
        expect(response.json().results, 'results').to.not.include.keys(
          'id',
          'reported',
          'reviewer_email'
        );
      }
    });
  });
}

function retrieveProductMetadata() {
  describe('Fetch review metadata one by one', () => {
    let responses = session.batch([
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      )
    ]);

    expect(responses, 'responses').to.be.an('array');

    responses.forEach((response) => {
      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json(), 'metadata').to.be.an('object');
      expect(response.json(), 'metadata').to.include.keys(
        'product_id',
        'ratings',
        'recommended',
        'characteristics'
      );
    });
  });

  describe('Each review metadata should have two values for recommended', () => {
    let responses = session.batch([
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      ),
      new Get(
        `meta?product_id=${Math.floor(
          Math.random() * (1000011 - 900000) + 900000
        )}`
      )
    ]);

    expect(responses, 'responses').to.be.an('array');

    responses.forEach((response) => {
      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json().recommended, 'metadata').to.be.an('object');
      expect(response.json().recommended, 'metadata').to.include.keys('0', '1');
    });
  });
}

export default function testSuite() {
  retrieveProductReviews();
  retrieveProductMetadata();
}
