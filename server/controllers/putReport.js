//Database
const pool = require('../../db/psql/db.js');

//GET /Reviews/
module.exports = putReport = (req, res) => {
  let reviewId = Number(req.params.review_id);

  let allQueryString = `update reviews
  set reported = true
  where id = ${reviewId};`;

  pool
    .query(allQueryString)
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
