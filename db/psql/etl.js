require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs').promises;
const { parse } = require('csv-parse/sync');

//Data variables
let characteristic_reviews = [];
let characteristics = [];
let reviews_photos = [];
let reviews = [];

// (async function () {
//   const readData = await fs.readFile(__dirname + '/characteristics.csv');
//   const data = parse(readData, {columns: true, cast: true});
//   characteristics = data;
//   console.log('chars', characteristics.slice(0, 2));
// })();

(async function () {
  const readData = await fs.readFile(__dirname + '/characteristic_reviews.csv');
  const data = parse(readData, {columns: true, cast: true});
  characteristic_reviews = data;
  console.log('char_reviews', characteristic_reviews.slice(0, 2));
})();

// (async function () {
//   const readData = await fs.readFile(__dirname + '/reviews_photos.csv');
//   const data = parse(readData, {columns: true, cast: true});
//   reviews_photos = data;
//   console.log('photos', reviews_photos.slice(0, 2));
// })();

// (async function () {
//   const readData = await fs.readFile(__dirname + '/reviews.csv');
//   const data = parse(readData, {columns: true, cast: true});
//   reviews = data;
//   console.log('rev', reviews.slice(0, 2));
// })();