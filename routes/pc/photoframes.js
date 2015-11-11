/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/', index);
router.get('/detail', detail);
function index(req, res, next) {
    res.render('pc/photoframes/index', { title: '婚件产品',layout:'layout_pc' });
}

function detail(req, res, next) {
    res.render('pc/photoframes/photoframes_detail', { title: '婚件产品详情',layout:'layout_pc' });
}

module.exports = router;
