var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();
var co = require('co');



var index=require('./index');
var albums=require('./albums');
var explorer=require('./explorer');
var sk=require('./sk');
var message=require('./message');
var login=require('./login');

router.use(function(req,res,next){
    var phone=18550035081;
    req.session.userId = {};
    req.session.userId['phone']=18550035081+'';
    res.locals.loginInfo = req.session.userId;
    if(!/Mobile/.test(req.get('user-agent'))){
        res.redirect('/');
        res.locals.nomibile=true;
    }

    next();
});

//Ê×Ò³
/*router.get('/', index.get);
router.post('/', index.post);*/

//Ïà²á
router.get('/', albums.get);
router.post('/', albums.post);

//ä¯ÀÀ
router.get('/explorer', explorer.get);
router.post('/explorer', explorer.post);

//ÅÄÕÕ
router.get('/sk', sk.get);
router.post('/sk', sk.post);

//ÏûÏ¢
router.get('/message', message.get);
router.post('/message', message.post);

//µÇÂ¼
router.get('/login', login.get);
router.post('/login', login.post);

module.exports = router;
