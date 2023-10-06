const fs = require('fs');
const path = require('path');
const caPath = path.join(__dirname, 'ca.pem');

// โหลดแพ็คเกจ dotenv
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL_CA ? {
    ca: Buffer.from(process.env.DB_SSL_CA, "base64").toString("ascii"),
  } : null,
}

module.exports = dbConfig;
