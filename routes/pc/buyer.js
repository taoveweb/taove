/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
router.get('/orders', orders);
router.get('/carts', carts);
router.get('/albums', albums);

function orders(req, res, next) {
    res.render('pc/buyer/orders', { title: '订单',layout:'layout_pc' });
}
function carts(req, res, next) {
    res.render('pc/buyer/carts', { title: '购物车',layout:'layout_pc' });
}
function albums(req, res, next) {
    res.render('pc/buyer/albums', { title: '相片',layout:'layout_pc' });
}

module.exports = router;
