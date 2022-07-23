const express = require('express');
const router = express.Router();
const debug = require('debug')('cqproject:student.js');
const select = require('../database/select');
const insert = require('../database/insert');
const tbl = require('../database/tables');
router.get('/',async function (req, res, next) {
  
  try {
    const students = await select.getQueryData(`select * from ${tbl.tbl_student}`);
    debug('students', students);
    
    res.status(200);
    res.send(students);
  } catch (err) {
    res.status(502);
    res.send(err.message || 'DB::ERROR');
  }

});

router.get('/:sid', async (req, res, next) => {
  if (req.params.sid) {
    const studentList = await select.getQueryData(`select * from ${tbl.tbl_student} where id=?`,[req.params.sid]);
    res.status(200);
    res.send(studentList);
  } else {
    next();
  }
})


router.post('/add', async (req, res, next) => {
  try {
    
    const body = req.body;
    console.log("bodyinReq",req.body, body)
    const newRecord = await insert.insertQueryData(tbl.tbl_student, req.body);
    res.status(200);
    res.send(newRecord);
    // res.send(req.body);
  } catch (err) {
    res.status(502);
    res.send(err.message || 'DB::ERROR');
  }
}) 


module.exports = router;