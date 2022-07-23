var db = require('./db');
const debug = require('debug')('cqproject:select.js');

function insertData(callback, table, body) {
    db.dbPool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
        console.log("body",body);
        connection.query(`INSERT INTO ${table} SET ?`, body, function (error, results, fields) {
             // When done with the connection, release it.
             connection.release();
            // Handle error after the release.
            if (error) throw error;
            callback({
                error: error,
                results: JSON.parse(JSON.stringify(results)),
                fields: fields
            })
            // Don't use the connection here, it has been returned to the pool.
            console.log(results.insertId);
        });
    })
}


function insertQueryData(table, body) {
    return new Promise((resolve, reject) => {
        insertData((results) => {
            debug("insertData", results.results);
            
            resolve(results);
            
        }, table, body);
    })
}

var insert = {
    insertData: insertData,
    insertQueryData: insertQueryData
}

module.exports = insert;



// Simple transaction support is available at the connection level:

// connection.beginTransaction(function(err) {
//   if (err) { throw err; }
//   connection.query('INSERT INTO posts SET title=?', title, function (error, results, fields) {
//     if (error) {
//       return connection.rollback(function() {
//         throw error;
//       });
//     }
 
//     var log = 'Post ' + results.insertId + ' added';
 
//     connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
//       if (error) {
//         return connection.rollback(function() {
//           throw error;
//         });
//       }
//       connection.commit(function(err) {
//         if (err) {
//           return connection.rollback(function() {
//             throw err;
//           });
//         }
//         console.log('success!');
//       });
//     });
//   });
// });