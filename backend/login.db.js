require("dotenv").config();
const { Pool } = require("pg");

const loginPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.LOGIN_DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = loginPool;

