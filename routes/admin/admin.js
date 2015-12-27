/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
var photographer=require('./photographer');
var production=require('./production');
router.get('/', orders);
router.get('/carts', carts);
router.get('/albums', albums);
router.get('/photographer', photographer.get);
router.get('/production', production.get);
router.post('/production', production.post);
router.post('/productiondetail',  production.postdetail);
router.get('/productiondetail',  production.getdetail);




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
