//Database
const pool = require('../../db/psql/db.js');

//GET /Reviews/
module.exports = getMetadata = (req, res) => {
  let productId = Number(req.query.product_id);
  let page = Number(req.query.page) || 1;
  let count = Number(req.query.count) || 5;
  let sort = req.query.sort || 'relevant';

  let offset = (page - 1) * count;
  let limit = page * count;

  let sortString = 'r.helpfulness desc, r.date desc';
  if (sort === 'helpfulness') {
    sortString = 'r.helpfulness desc';
  } else if (sort === 'newness') {
    sortString = 'r.date desc';
  }

  let reviews = {
    product: req.query.product_id,
    page: page,
    count: count
  };

  let allQueryString = `select r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, coalesce(rp.photos, '[]') as photos
  from reviews r
  left join lateral (
    select json_agg(json_build_object( 'id', rp.id, 'url', rp.url)) as photos
    from reviews_photos rp
    where rp.review_id = r.id
    ) rp on true
  where r.product_id = ${productId}
  order by ${sortString}
  offset ${offset} limit ${limit};`;
  let settings = [productId, sortString, offset, limit];

  pool
    .query(allQueryString)
    .then((results) => {
      reviews.results = results.rows;
      res.status(200);
      res.send(reviews);
    })
    .catch((err) => {
      console.log(err);
    });
};
