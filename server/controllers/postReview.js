//Database
const pool = require('../../db/psql/db.js');

//GET /Reviews/
module.exports = postReview = (req, res) => {
  //REVIEWS QUERY STRING
  let date = Date.now();

  let reviewValues = [
    req.body.summary,
    req.body.body,
    req.body.name,
    req.body.email
  ];

  //REVIEWS_PHOTOS VALUES
  let photoValues = '';
  let photoString = '';


  if (req.body.photos.length > 0) {
    for (let i = 0; i < req.body.photos.length; i++) {
      let currentUrl = `$${i + 5}`;
      reviewValues.push(req.body.photos[i]);
      if (i < req.body.photos.length - 1) {
        photoValues += `(default, (select review_id from review_ins), ${currentUrl}), `;
      } else {
        photoValues += `(default, (select review_id from review_ins), ${currentUrl})`;
      }
    }

    photoString = `,
    photo_ins as (
      insert into reviews_photos
        values ${photoValues}
    )`
  }

  //CHARACTERISTICS_REVIEWS VALUES
  let charIds = Object.keys(req.body.characteristics);
  let charRatings = Object.values(req.body.characteristics);

  let charValues = '';

  for (let i = 0; i < charIds.length; i++) {
    let id = charIds[i];
    let rating = charRatings[i];
    if (i < charIds.length - 1) {
      charValues += `(default, ${id}, (select review_id from review_ins), ${rating}), `;
    } else {
      charValues += `(default, ${id}, (select review_id from review_ins), ${rating})`;
    }
  }

  let postReviewQuery = `with review_ins as (
    insert into reviews
      values (
      default,
      ${req.body.product_id},
      ${req.body.rating},
      ${date},
      $1,
      $2,
      true,
      false,
      $3,
      $4,
      null,
      0
      )
      returning id as review_id
    )${photoString}
    insert into characteristic_reviews
      values ${charValues};`;

  //DB QUERY
  pool
    .query(postReviewQuery, reviewValues)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
