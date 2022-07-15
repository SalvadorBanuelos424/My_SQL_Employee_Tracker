const mysql = require('mysql2');

/*create temporary connection to mysql database*/
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3149',
    database: 'work'
});

module.exports = db;