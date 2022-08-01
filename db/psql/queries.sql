--SAMPLE QUERIES

-- REVIEWS
select r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, coalesce(rp.photos, '[]') as photos
from reviews r
left join lateral (
	select json_agg(json_build_object( 'id', rp.id, 'url', rp.url)) as photos
	from reviews_photos rp
	where rp.review_id = r.id
	) rp on true
where r.product_id = 12 and reported = false
order by r.helpfulness desc, r.date desc
offset 0 limit 15;

--METADATA
select json_build_object(
	'product_id',
	'12',
	'ratings',
	(
		select json_object_agg(rv.rating, rv.count)
		from (select r.rating, count(*)
			  from reviews r
			  where r.product_id=12
			  group by r.rating) as rv
	),
	'recommended',
	(
		select json_build_object('0',
								 (select count(*)
								  from reviews r
								  where r.product_id=12 and r.recommend=false),
								 '1',
								 (select count(*)
								  from reviews r
								  where r.product_id=12 and r.recommend=true)
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
												   where c.product_id=12
												   group by c.name, c.id
												  ) as cv)

) as metadata;

--REVIEW POST
--REVIEWS
insert into reviews
values (
		default,
		12,
		5,
		1659302163578,
		'this is a summary!',
		'this is a body for a review, isnt it great. Feels like its the best one ever. It is. It is the best one ever. You know that though. I needt tell you. So, Im done telling you. It is though.',
		true,
		false,
		'this is a name?',
		'this@email.com',
		null,
		0
  )
returning id;

--REVIEWS PHOTOS
insert into reviews_photos
values (
		default,
		5774953,
		'https://images.unsplash.com/photo-1659273144626-63cb708617fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80');

--REVIEWS CHAR
insert into characteristic_reviews
values (
	default,
	39,
	5774953,
	5);

--HELPFULNESS
update reviews
set helpfulness = helpfulness + 1
where id = 12;

--REPORT
update reviews
set helpfulness = true
where id = 12;