var db = require('./db');
const debug = require('debug')('cqproject:select.js');

function queryData(callback, selectQuery, params) {
    db.dbPool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
        if (process.env.env === 'development') {
            const sql = db.getQuerySql(selectQuery, params);
            debug(sql);
        }
        // Use the connection
        connection.query(selectQuery, params || [], function (error, results, fields) {
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
        })
    })
}

function getQueryData(selectQuery, params) {
    return new Promise((resolve, reject) => {
        queryData((queryData) => {
            debug("queryData", queryData.results);
            if (queryData.results && queryData.results.length > 0) {
                resolve(queryData.results);
            } else {
                resolve([]);
            }
        }, selectQuery, params);
    })
}

var select = {
    queryData: queryData,
    getQueryData: getQueryData
}

module.exports = select;