require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: 'postgres'
  }
);

db.authenticate()
  .then(() => {
    console.log(
      `Server has connected to the database ${process.env.DATABASE} as user ${process.env.USER}.`
    );
  })
  .catch((err) => {
    console.error(err);
  });

//id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

const Review = db.define('Review', {
  review_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  product_id: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  date: Sequelize.DATE,
  summary: Sequelize.TEXT,
  body: Sequelize.TEXT,
  recommend: Sequelize.BOOLEAN,
  reported: Sequelize.BOOLEAN,
  reviewer_name: Sequelize.STRING,
  reviewer_email: Sequelize.STRING,
  response: Sequelize.TEXT,
  helpfulness: Sequelize.INTEGER
});

Review.sync();

//id,review_id,url

const Photo = db.define('Photo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  review_id: Sequelize.INTEGER,
  url: Sequelize.STRING
});

//id,product_id,name
const Characteristic = db.define('Characteristic', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  product_id: Sequelize.STRING,
  name: Sequelize.STRING
});

//id,characteristic_id,review_id,value
const CharReview = db.define('CharReview', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  characteristic_id: Sequelize.STRING,
  review_id: Sequelize.INTEGER,
  value: Sequelize.INTEGER
})