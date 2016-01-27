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
        var docs = yield Albums.find({photographyId: req.session.userId['_id']}).exec();
        res.render('mobile/index', {
            title: '摄影作品',
            taove: docs,
            albumsNum: docs.length,
            detail: false,
            layout: 'layout_m'
        });
    });
}


module.exports = {
    get: indexGet
};



