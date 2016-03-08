var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();
var co = require('co');



var albums=require('./albums');
var receive=require('./receive');
var udid=require('./udid');

router.get('/', albums.get);
router.post('/', albums.post);
router.post('/receive', receive.post);
router.get('/receive', receive.post);
router.get('/udid', udid.get);



module.exports = router;
