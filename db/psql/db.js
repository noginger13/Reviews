require('dotenv').config();

const { Pool, Client } = require('pg');

const client = new Client();
client.connect().then(() => {
  console.log(
    `Connected to database ${process.env.PGDATABASE} as ${process.env.PGUSER}.`
  );
});

const pool = new Pool();

module.exports = pool;