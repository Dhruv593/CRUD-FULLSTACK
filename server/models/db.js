// // backend/models/db.js
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,        
//   password: process.env.DB_PASSWORD,         
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT   
// });

// connection.connect(error => {
//   if (error) {
//     console.error('Error connecting to MySQL database:', error);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// module.exports = connection;

// backend/models/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD,         
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  // Adjust the limit as needed
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL database:', error);
  });

module.exports = pool;
