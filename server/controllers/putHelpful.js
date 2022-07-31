//Database
const pool = require('../../db/psql/db.js');

//GET /Reviews/
module.exports = putHelpful = (req, res) => {
  let productId = Number(req.params.review_id);

  let allQueryString = `update reviews
  set helpfulness = helpfulness + 1
  where id = ${productId};`;

  pool
    .query(allQueryString)
    .then((results) => {
      console.log('put', results.rows);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
