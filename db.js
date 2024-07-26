require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATA_BASE_USER,
  host: process.env.DATA_BASE_HOST,
  database: process.env.DATA_BASE,
  password: process.env.DATA_BASE_PASSWORD,
  port: process.env.DATA_BASE_PORT 
});
module.exports = pool;