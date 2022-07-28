require('dotenv').config();

const { Pool, Client } = require('pg');

const client = new Client();
client.connect().then(() => {
  console.log(
    `Connected to database ${process.env.PGDATABASE} as ${process.env.PGUSER}.`
  );
});

const pool = new Pool();
pool.query('SELECT * FROM reviews WHERE id=54', (err, res) => {
  console.log(err, res.rows);
  pool.end();
});
