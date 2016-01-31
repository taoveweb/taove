/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;
var co = require('co');
//相册性能需更改
function indexGet(req, res, next) {
    co(function *() {
        if (req.query.q && req.query.q == 'more') {
            var docs = yield Albums.find({createdOn: {$gt:0}}).limit(1).exec();
            console.log(docs.length);
            res.json(docs)
        } else if (req.query.q && req.query.q == 'update') {
            var docs = yield Albums.find({createdOn: {$lt:0}}).limit(1).exec();
            console.log(docs.length);
            res.json(docs)
        } else {
            var docs = yield Albums.find().limit(1).exec();
            res.render('mobile/albums', {
                title: '摄影作品',
                taove: docs,
                albumsNum: docs.length,
                detail: false,
                layout: 'layout_m'
            });
        }

    });
}


function indexPost(req, res, next) {
    co(function *() {
        var docs = yield Albums.find().exec();
        console.log(docs);
        res.json(docs)
    });
}


module.exports = {
    get: indexGet,
    post: indexPost
};



