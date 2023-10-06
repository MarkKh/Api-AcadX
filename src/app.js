const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const dbConfig = require('./db.config')

const adminRouter = require("./routers/adminRouter");
const advisorsRoutes = require("./routers/advisorsRouter");
const cooperativeRouter = require("./routers/cooperativeRouter");
const reportsRouter = require("./routers/reportsRouter");
const reporttypeRouter = require('./routers/reporttypeRouter');
const loanRouter = require('./routers/loanRouter');

const app = express();
const port = 25863;
app.use(cors());

require('dotenv').config();

// Check if DB_URL is defined in environment variables
if (!process.env.DB_URL) {
  console.error("DB_URL is not defined in environment variables.");
  process.exit(1); // Exit the application with an error code
}

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the MySQL database:", err);
    process.exit(1); // Exit the application with an error code
  }
  console.log("Connected to the MySQL database");
});

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

adminRouter(app, connection);
advisorsRoutes(app, connection);
cooperativeRouter(app, connection);
reportsRouter(app, connection);
reporttypeRouter(app, connection);
loanRouter(app, connection);

// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
