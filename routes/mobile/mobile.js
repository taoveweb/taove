var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();
var co = require('co');



var index=require('./mIndex');

router.get('/', index.get);
router.post('/', index.post);



module.exports = router;
