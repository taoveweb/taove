var express = require('express');
var User=require('../../models/db').User;
var router = express.Router();

/* GET users listing. */

router.get('/', index); // Current user profile


function index  (req,res){
    console.log('admin');
    res.render('admin/index',{
        title:'我的'
    });
};

module.exports = router;
