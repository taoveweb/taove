/**
 * Created by Administrator on 2015/9/7.
 */
    var util=require('util');
var express = require('express');
var router = express.Router();
router.get('/', index);

function index(req, res, next) {
    var headers=req.headers;

    if(headers['user-agent'].indexOf('Windows')>0){
        var width='400px';
    }else{
        var width='auto';
    }
    //console.log(util)
   // console.log(JSON.parse(headers));
   // console.log(req.headers);
    res.render('pc/zt/wd', { title: '黄家金&严珍',layout:null,wd:width });
}

module.exports = router;
