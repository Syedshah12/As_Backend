// database.js
const mysql = require('mysql2/promise'); // Using mysql2 promise-based API



const pool = mysql.createPool({
  connectionLimit: 10,
  host: '108.181.197.184', // Update with the IP address or hostname of your database server
  port: '10052', // If your database server uses a custom port, specify it here
  user: 'user1', // Update with your database username
  password: 'Muzfer@34', // Update with your database password
  database: 'ascdb' // Update with your database name (if it's different from 'ascdb')
});


// Create MySQL connection pool
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'ascdb'
// });

// Log when the database connection is established
pool.getConnection()
  .then(connection => {
    console.log('Connected to database');
    connection.release(); // Release the connection after logging
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });

module.exports = pool;
