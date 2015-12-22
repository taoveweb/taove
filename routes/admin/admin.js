/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
var photographer=require('./photographer');
router.get('/', orders);
router.get('/carts', carts);
router.get('/albums', albums);
router.get('/production', production);
router.get('/photographer', photographer.get);
router.post('/photographer',  photographer.post);

function production(req, res, next) {
    res.render('admin/production', {title: '摄影作品', layout: 'layout_pc'});
}

function orders(req, res, next) {
    res.render('admin/orders', {title: '订单', layout: 'layout_pc'});
}
function carts(req, res, next) {
    res.render('admin/carts', {title: '购物车', layout: 'layout_pc'});
}
function albums(req, res, next) {
    res.render('admin/albums', {title: '相片', layout: 'layout_pc'});
}

module.exports = router;
