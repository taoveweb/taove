var express = require('express');
var router = express.Router();
var photographer={};
var db=require('../models/db');
/* GET home page. */

router.get('/', index);

//selected photographer action

function index(req, res, next) {
  res.render('sort', { title: '分类' });
}




module.exports = router;
