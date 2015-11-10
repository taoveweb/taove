/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/b', index_b);
router.get('/c', index_c);
router.get('/d', index_d);
router.get('/e', index_e);

function index_b(req, res, next) {
    res.render('pc/package/packageb', { title: '桃微婚纱摄影--B套系',layout:'layout_pc' });
}
function index_c(req, res, next) {
    res.render('pc/package/packagec', { title: '桃微婚纱摄影--C套系',layout:'layout_pc' });
}
function index_d(req, res, next) {
    res.render('pc/package/packaged', { title: '桃微婚纱摄影--D套系',layout:'layout_pc' });
}
function index_e(req, res, next) {
    res.render('pc/package/packagee', { title: '桃微婚纱摄影--E套系',layout:'layout_pc' });
}
module.exports = router;
