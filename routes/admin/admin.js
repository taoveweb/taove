/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/', orders);
router.get('/carts', carts);
router.get('/albums', albums);
router.get('/photographer', photographer);

function orders(req, res, next) {
    res.render('admin/orders', { title: '订单',layout:'layout_pc' });
}
function carts(req, res, next) {
    res.render('admin/carts', { title: '购物车',layout:'layout_pc' });
}
function albums(req, res, next) {
    res.render('admin/albums', { title: '相片',layout:'layout_pc' });
}
function photographer(req, res, next) {
    res.render('admin/photographer', { title: '摄影师申请入驻',layout:'layout_pc' });
}

module.exports = router;
