/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/', index);

function index(req, res, next) {
    res.render('zt/wd', { title: '黄家金&严珍',layout:null });
}

module.exports = router;
