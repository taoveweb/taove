/**浏览页面
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var path = require('path');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;
var co = require('co');


function indexGet(req, res, next) {
    co(function *() {
        //加载更多图片
        if (req.query.q && req.query.q == 'more') {
            var docs = yield Albums.find({createdOn: {$lt: req.query.createdOn}}).sort({createdOn: -1}).limit(3).exec();
            //res.json({taove: docs})
            res.render('mobile/ajax_explorer_box', {
                    taove: docs,
                    layout: null
                },
                function (err, html) {
                    res.send(html);
                });
        } else if (
            //更新图片
        req.query.q && req.query.q == 'update') {
            var count = yield  Albums.count();
            var docs = yield Albums.find({createdOn: {$gt: req.query.createdOn}}).sort({createdOn: -1}).limit(3).exec();
            // res.json({taove: docs, count: count})
            res.render('mobile/ajax_explorer_box', {
                    taove: docs,
                    layout: null
                },
                function (err, html) {
                    res.send(html);
                });
        } else {
            //初次加载
            var count = yield  Albums.count();
            var docs = yield Albums.find().sort({createdOn: -1}).limit(3).exec();
            res.render('mobile/explorer', {
                title: '摄影作品',
                taove: docs,
                albumsNum: count,
                detail: false,
                layout: 'layout_m'
            });
        }
    });
}

function indexPost(req, res, next) {
    res.render('mobile/explorer', {
        title: '浏览',
        layout: 'layout_m'
    });
}


module.exports = {
    get: indexGet,
    post: indexPost
};



