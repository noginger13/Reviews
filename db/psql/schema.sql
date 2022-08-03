--DATABASE REVIEWAPI

--CREATE DATABASE
DROP DATABASE IF EXISTS reviewapi;

CREATE DATABASE reviewapi
    WITH
    OWNER = root
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


--DROP TABLES
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS reviews_photos;
DROP TABLE IF EXISTS reviews;


--REVIEWS

--CREATE TABLE

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id integer NOT NULL,
  rating integer NOT NULL,
  date bigint,
  summary text,
  body text,
  recommend boolean,
  reported boolean,
  reviewer_name text,
  reviewer_email text,
  response text,
  helpfulness integer NOT NULL
);

--COPY CSV DATA
COPY reviews
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/reviews.csv'
  DELIMITER ','
  CSV HEADER;

--TRANSFORM RESPONSE COLUMN
UPDATE reviews
SET response = null
WHERE response = 'null';


--CHARACTERISTICS

--CREATE TABLE
CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id integer,
  name text,
  FOREIGN KEY (product_id) REFERENCES reviews(id)
);

--COPY CSV DATA
COPY characteristics
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/characteristics.csv'
  DELIMITER ','
  CSV HEADER;



--CHARACTERISTIC REVIEWS

--CREATE TABLE
CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id integer,
  review_id integer,
  value integer,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

--COPY CSV DATA
COPY characteristic_reviews
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/characteristic_reviews.csv'
  DELIMITER ','
  CSV HEADER;

--REVIEWS PHOTOS

--CREATE TABLE
CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id integer,
  url text,
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

--COPY CSV DATA
COPY reviews_photos
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/reviews_photos.csv'
  DELIMITER ','
  CSV HEADER;


--CREATE INDICES

--REVIEWS
CREATE INDEX reviews_date_index ON reviews (date);
CREATE INDEX reviews_helpfulness_index ON reviews (helpfulness);
CREATE INDEX review_id_index ON reviews (id);
CREATE INDEX reviews_product_id_index ON reviews (product_id);
CREATE INDEX reviews_rating_index ON reviews (rating);
CREATE INDEX reviews_reported_index ON reviews (reported);

--CHARACTERISTICS
CREATE INDEX characteristics_id_index ON characteristics (id);
CREATE INDEX characteristics_product_id_index ON characteristics (product_id);

--CHARACTERISTIC_REVIEWS
CREATE INDEX characteristic_reviews_characteristic_id_index ON characteristic_reviews (characteristic_id);
CREATE INDEX characteristic_reviews_id_index ON characteristic_reviews (id);
CREATE INDEX characteristic_reviews_review_id_index ON characteristic_reviews (review_id);

--REVIEWS_PHOTOS
CREATE INDEX reviews_photos_id_index ON reviews_photos (id);
CREATE INDEX reviews_photos_review_id_index ON reviews_photos (review_id);


--SETVALS FOR SEQUENCES TO TOTAL AFTER CSV IMPORT
SELECT setval('characteristic_reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristic_reviews), 1), false);
SELECT setval('reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews), 1), false);
SELECT setval('reviews_photos_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews_photos), 1), false);
