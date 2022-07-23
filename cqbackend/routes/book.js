const express = require('express');
const router = express.Router();
const debug = require('debug')('cqproject:books.js');
const select = require('../database/select');
const insert = require('../database/insert');
const tbl = require('../database/tables');
router.get('/',async function (req, res, next) {
  
  try {
    const books = await select.getQueryData(`SELECT books.*, borrow.id AS bid, borrow.borrowdate, borrow.returndate, students.firstname, students.lastname FROM books LEFT JOIN borrow ON borrow.bookid = books.id LEFT JOIN students ON students.id = borrow.studentid;`);
    debug('books', books);
    
    res.status(200);
    res.send(books);
  } catch (err) {
    res.status(502);
    res.send(err.message || 'DB::ERROR');
  }

});

router.get('/:bid', async (req, res, next) => {
  try {
    if (req.params.cityid) {
      const bookList = await select.getQueryData(`select * from ${tbl.tbl_book} LEFT JOIN borrow ON borrow.bookid = books.id where id=?`,[req.params.bid]);
      res.status(200);
      res.send(bookList);
    } else {
      next();
    }
  } catch (err) {
    res.status(502);
    res.send(err.message || 'DB::ERROR');
  }
})

router.post('/add', async (req, res, next) => {
  try {
    
    const body = req.body;
    console.log("bodyinReq",req.body, body)
    const newRecord = await insert.insertQueryData(tbl.tbl_book, req.body);
    res.status(200);
    res.send(newRecord);
    // res.send(req.body);
  } catch (err) {
    res.status(502);
    res.send(err.message || 'DB::ERROR');
  }
}) 

router.post('/borrow', async (req, res, next) => {
  try {
    
    const body = req.body;
    console.log("bodyinReq",req.body, body)
    const newRecord = await insert.insertQueryData(tbl.tbl_borrow, req.body);
    res.status(200);
    res.send(newRecord);
    // res.send(req.body);
  } catch (err) {
    res.status(502);
    res.send(err.message || 'DB::ERROR');
  }
}) 

  


module.exports = router;