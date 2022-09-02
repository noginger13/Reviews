# Reviews
RESTful API and database for product reviews supporting a retail product page

## Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Nodemon](https://img.shields.io/badge/-Nodemon-76D04B?logo=nodemon&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![New Relic](https://img.shields.io/badge/-NewRelic-008C99?logo=newrelic&logoColor=white&style=for-the-badge)
![K6](https://img.shields.io/badge/-k6-7D64FF?logo=k6&logoColor=white&style=for-the-badge)

## Getting Started
### Setup
1. Install dependencies
```
npm install
```
2. Build the database
```
npm run build-db
```
3. Run the development server
```
npm run server-dev
```
4. Run K6 integration tests
```
npm run k6int
```
5. Run with New Relic
```
npm run newrelic
```

### Environment Variables
This project expects the following environment variables
```
//SERVER DETAILS
PORT = '3000'

//DATABASE DETAILS
PGHOST = 'localhost'
PGUSER = 'username'
PGPASSWORD = 'password'
PGDATABASE = 'reviewapi'
PGPORT = 5432
