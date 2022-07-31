require('dotenv').config();
const express = require('express');

//Controllers
const getReviews = require('./controllers/getReviews.js');
const getMetadata = require('./controllers/getMetadata.js');
const putHelpful = require('./controllers/putHelpful.js');

const app = express();

app.use(express.json());

app.get('/reviews/', getReviews);

app.get('/reviews/meta', getMetadata);

app.post('/reviews/', (req, res) => {
  res.status(201);
});

app.put('/reviews/:review_id/helpful', putHelpful);

app.put('/reviews/:review_id/report', (req, res) => {
  console.log('report', req.params.review_id);
  res.sendStatus(204);
});

app.listen(process.env.PORT, () => {
  console.log(`Reviews API server is listnening on port ${process.env.PORT}.`);
});
