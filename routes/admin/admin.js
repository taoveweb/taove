var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', index); // Current buyer profile


function index  (req,res){
    console.log('admin');
    res.render('admin/index',{
        title:'我的'
    });
};

module.exports = router;
