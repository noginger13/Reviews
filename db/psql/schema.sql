-- Database: reviewapi

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

-- COPY CSV DATA
COPY reviews
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/reviews.csv'
  DELIMITER ','
  CSV HEADER;


--CHARACTERISTIC REVIEWS

--CREATE TABLE
CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id integer,
  review_id integer,
  value integer,
  FOREIGN KEY (review_id) REFERENCES reviews
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
  FOREIGN KEY (review_id) REFERENCES reviews
);

--COPY CSV DATA
COPY reviews_photos
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/reviews_photos.csv'
  DELIMITER ','
  CSV HEADER;

