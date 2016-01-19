/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var db = require('../../models/db');
var PhotoFrames = db.PhotoFrames;
var router = express.Router();
router.get('/', index);
router.get('/detail', detail);
function index(req, res, next) {
    PhotoFrames.find({},function(err,doc){
        res.render('pc/photoframes/index', { title: '婚件产品',photoFrames:doc,layout:'layout_pc' });
    });

}

function detail(req, res, next) {
    PhotoFrames.findOne({_id:req.query.q},function(err,doc){
        res.render('pc/photoframes/photoframes_detail', { title: '婚件产品详情',photoFrames:doc,layout:'layout_pc' });
    });

}

module.exports = router;
