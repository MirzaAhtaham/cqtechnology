// https://www.npmjs.com/package/mysql
var mysql = require('mysql');
var dbPool = mysql.createPool({
    connectionLimit: process.env.DBCONNECTIONLIMIT,
    host: process.env.DBPORT ? process.env.DBHOST + ':' + process.env.DBPORT : process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
   
});
// debug: process.env.DBDEBUG,
// trace: process.env.DBTRACE,

// dbPool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

dbPool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

// dbPool.on('connection', function (connection) {
//     connection.query('SET SESSION auto_increment_increment=1')
// });

dbPool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

dbPool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

// dbPool.end(function (err) {
//     // all connections in the pool have ended
//     console.log('all connections in the pool have ended', err);
// });

module.exports = {
    dbPool,
    getQuerySql: (selectQuery, params) => {
        return mysql.format(selectQuery, params || []);
    }
};