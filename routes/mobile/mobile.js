var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();
var co = require('co');



var albums=require('./albums');
var receive=require('./receive');
var udid=require('./udid');
router.use(function(req,res,next){
    var phone=18550035081;
    req.session.userId = {};
    req.session.userId['phone']=18550035081;
    next();
});
router.get('/', albums.get);
router.post('/', albums.post);
router.post('/receive', receive.post);
router.get('/receive', receive.post);
router.get('/udid', udid.get);



module.exports = router;
