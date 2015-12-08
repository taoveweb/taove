/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/', index);
router.post('/', post);

function index(req, res, next) {
    res.render('pc/login', { title: '登录',layout:'layout_pc' });
}

function post(req, res, next) {
    console.log(req.body);
    res.json({ok:1})
}

module.exports = router;
