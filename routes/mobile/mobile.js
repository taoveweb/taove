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
var my=require('./my');
var login=require('./login');

router.use(function(req,res,next){
 /*   var phone=18550035081;
    req.session.userId = {};
    req.session.userId['phone']=18550035081+'';
    res.locals.loginInfo = req.session.userId;
    if(!/Mobile/.test(req.get('user-agent'))){
        res.redirect('/');
        res.locals.nomibile=true;
    }*/

    next();
});

//
/*router.get('/', index.get);
router.post('/', index.post);*/

//
router.get('/', albums.get);
router.post('/', albums.post);

//
router.get('/explorer', explorer.get);
router.post('/explorer', explorer.post);

//
router.get('/sk', sk.get);
router.post('/sk', sk.post);

//
router.get('/message', message.get);
router.post('/message', message.post);

router.get('/my', my.get);
router.post('/my', my.post);
//
router.get('/login', login.get);
router.post('/login', login.post);

//手机版退出
router.post('/loginOut', function(req,res,next){
    req.session.cookie.maxAge = 0;
    delete res.locals.loginInfo ;
    res.json({
        ok:1,
        msg:'退出成功'
    });
});

module.exports = router;
