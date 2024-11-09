const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//Create a conecction to the database
// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
//     insecureAuth: dbConfig.AUTH
// });

var connection  = mysql.createPool({
    connectionLimit : 10,
    host     : dbConfig.HOST,
    user     : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB,
    typeCast: function(field, next) {
        if (field.type === 'BIT' && field.length === 1) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }
        return next();
    },
    multipleStatements: true
  });

//Open the MySQL connection
// connection.connect(error => {
//     if (error) throw error.message;
//     console.log(`Successfully connected to the database.`);
// });

connection.getConnection(error=>{
    let msg = error ? error.message : `Se conectó a la base de datos`;
    console.log(msg);
})

module.exports = connection;