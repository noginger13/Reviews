require('dotenv').config();
const express = require('express');

//Databases
const etl = require ('../db/data/etl.js');
const pgs = require('../db/postgres/db.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
})

app.listen(process.env.PORT, () => {
  console.log(`Reviews API server is listnening on ${process.env.PORT}`);
});
