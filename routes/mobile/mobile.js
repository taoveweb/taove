var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();
var co = require('co');



var index=require('./mIndex');

router.get('/', index.get);


function index(req, res, next) {
  res.render('index', { title: '桃微' });
}



module.exports = router;
