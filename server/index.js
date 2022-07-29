require('dotenv').config();
const express = require('express');

//Databases
const db = require('../db/psql/db.js');

const app = express();

app.use(express.json());

app.get('/reviews/', (req, res) => {
  console.log('reviews', req.query);
  res.status(200);
});

app.get('/reviews/meta', (req, res) => {
  console.log('reviews', req.query);
  res.status(200);
});

app.post('/reviews/meta', (req, res) => {
  res.status(201);
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('helpful', req.params.review_id);
  res.sendStatus(204);
});

app.put('/reviews/:review_id/report', (req, res) => {
  console.log('report', req.params.review_id);
  res.sendStatus(204);
});

app.listen(process.env.PORT, () => {
  console.log(`Reviews API server is listnening on port ${process.env.PORT}.`);
});
