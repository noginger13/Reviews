//Database
const pool = require('../../db/psql/db.js');

//GET /Reviews/
module.exports = postReview = (req, res) => {
  console.log(req.body);



  //insert review (get review_id)
  let date = Date.now();
  let postReviewQuery;


  //Insert photos from review (if any)
  let postPhotosQuery;

  //insert characteristics from
  let postCharQuery;


  res.sendStatus(201);


  // (async () => {
  //   const client = await pool.connect();
  //   try {
  //     await client.query('BEGIN');
  //     const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id';
  //     const res = await client.query(queryText, ['brianc']);
  //     const insertPhotoText =
  //       'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)';
  //     const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo'];
  //     await client.query(insertPhotoText, insertPhotoValues);
  //     await client.query('COMMIT');
  //   } catch (e) {
  //     await client.query('ROLLBACK');
  //     throw e;
  //   } finally {
  //     client.release();
  //   }
  // })().catch((err) => {
  //   console.log(err);
  // });
};
