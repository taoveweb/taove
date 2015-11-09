/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/', index);

function index(req, res, next) {
    res.render('pc/photograhper', { title: '桃微摄影师列表',layout:'layout_pc' });
}

module.exports = router;
