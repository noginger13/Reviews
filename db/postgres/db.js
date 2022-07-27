require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres'
}
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Server has connected to the database ${process.env.DATABASE} as user ${process.env.USER}.`);
  })
  .catch((err) => {
    console.error(err);
  });
