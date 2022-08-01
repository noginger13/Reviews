require('dotenv').config();
const express = require('express');

//Controllers
const getMetadata = require('./controllers/getMetadata.js');
const getReviews = require('./controllers/getReviews.js');
const postReview = require('./controllers/postReview.js');
const putHelpful = require('./controllers/putHelpful.js');
const putReport = require('./controllers/putReport.js');

const app = express();

app.use(express.json());

app.get('/reviews/', getReviews);

app.get('/reviews/meta', getMetadata);

app.post('/reviews/', postReview);

app.put('/reviews/:review_id/helpful', putHelpful);

app.put('/reviews/:review_id/report', putReport);

app.listen(process.env.PORT, () => {
  console.log(`Reviews API server is listnening on port ${process.env.PORT}.`);
});
