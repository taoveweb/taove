var express = require('express');
var router = express.Router();
var photographer={};
var db=require('../../models/db');
/* GET home page. */

router.get('/', index);


function index(req, res, next) {
  res.render('photographer', { title: '摄影师' });
}



module.exports = router;
