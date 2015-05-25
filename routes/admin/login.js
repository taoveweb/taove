var express = require('express');
var User=require('../../models/db').User;
var router = express.Router();

/* GET users listing. */

router.get('/', index); // Current user profile
router.post('/', doLogin); // Login action
router.post('/logout', doLogout); // Logout current user

function index  (req,res){
    console.log('login');
    res.render('admin/login',{
        title:'登录'
    });
};

function doLogin(req,res,next){
    res.send('doLogin');
};

function doLogout(req,res,next){
    res.send('doLogout');
};


module.exports = router;
