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


--REVIEWS

--CREATE TABLE
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id integer PRIMARY KEY,
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

DROP TABLE IF EXISTS characteristic_reviews;
CREATE TABLE characteristic_reviews (
  id integer PRIMARY KEY,
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

DROP TABLE IF EXISTS reviews_photos;
CREATE TABLE reviews_photos (
  id integer PRIMARY KEY,
  review_id integer,
  url text,
  FOREIGN KEY (review_id) REFERENCES reviews
);

--COPY CSV DATA
COPY reviews_photos
  FROM '/Users/michaelschoenecker/Documents/hackreactor/rfe-neptunium/Reviews/db/data/reviews_photos.csv'
  DELIMITER ','
  CSV HEADER;