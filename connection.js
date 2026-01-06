const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // use 'user' instead of 'name'
    password: 'yourpassword',          // add password if needed
    database: 'caretaker',
    dateStrings:true
});

connection.connect(err => {
    if (err) {
        console.error('Initial MySQL connection failed:', err);
        return;
    }
    console.log('Connected to MySQL!');
});


module.exports = connection;
