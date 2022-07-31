//Database
const pool = require('../../db/psql/db.js');

//GET /Reviews/
module.exports = getMetadata = (req, res) => {
  let productId = Number(req.query.product_id);

  let allQueryString = `select json_build_object(
    'product_id',
    '${productId}',
    'ratings',
    (
      select json_object_agg(rv.rating, rv.count)
      from (select r.rating, count(*)
          from reviews r
          where r.product_id=${productId}
          group by r.rating) as rv
    ),
    'recommended',
    (
      select json_build_object('0',
                   (select count(*)
                    from reviews r
                    where r.product_id=${productId} and r.recommend=false),
                   '1',
                   (select count(*)
                    from reviews r
                    where r.product_id=${productId} and r.recommend=true)
                  )
    ),
    'characteristics',
    (select json_object_agg(cv.name, cv.vals) as obj
                         from (select c.name, json_build_object('id', c.id, 'value', avg(ctr.value)) as vals
                             from characteristics c
                             join (
                               select *
                               from reviews r
                               join characteristic_reviews cr
                               on cr.review_id = r.id
                             ) as ctr
                             on c.id = ctr.characteristic_id
                             where c.product_id=${productId}
                             group by c.name, c.id
                            ) as cv)

  ) as metadata;`;

  pool
    .query(allQueryString)
    .then((results) => {
      let metadata = results.rows[0];
      res.status(200);
      res.send(metadata);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
