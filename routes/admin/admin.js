/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
var photographer=require('./photographer');
var production=require('./production');
var intention=require('./intention');
/*router.get('/', orders);*/
//意向单
router.get('/',  intention.get);
router.post('/',  intention.post);

router.get('/carts', carts);
router.get('/albums', albums);
router.get('/photographer', photographer.get);
router.post('/photographer', photographer.post);
router.get('/production', production.get);//摄影师作品相册
router.get('/productiondetail',  production.getdetail);//摄影师作品相册图片
router.post('/production', production.post);//提交相册
router.post('/productionimg',  production.postimg);



function carts(req, res, next) {
    res.render('admin/carts', {title: '购物车', layout: 'layout_pc'});
}
function albums(req, res, next) {
    res.render('admin/albums', {title: '相片', layout: 'layout_pc'});
}

module.exports = router;
