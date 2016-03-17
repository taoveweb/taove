/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var path = require('path');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;
var co = require('co');
//相册性能需更改
function indexGet(req, res, next) {
    co(function *() {
        if (req.query.q && req.query.q == 'more') {
            var docs = yield Albums.find({createdOn: {$lt: req.query.createdOn}}).sort({createdOn: -1}).limit(2).exec();
            res.json({taove: docs})
        } else if (req.query.q && req.query.q == 'update') {
            var count = yield  Albums.count();
            var docs = yield Albums.find({createdOn: {$gt: req.query.createdOn}}).sort({createdOn: -1}).limit(2).exec();
            res.json({taove: docs, count: count})
        } else {
            var count = yield  Albums.count();
            var docs = yield Albums.find().sort({createdOn: -1}).limit(3).exec();
            res.render('mobile/albums', {
                title: '摄影作品',
                taove: docs,
                albumsNum: count,
                detail: false,
                layout: 'layout_m'
            });
        }
    });
}

/*improtant登录状态未做--------------------------------------------------*/
function indexPost(req, res, next) {
    var name = req.body.name || '';
    var type = req.body.type;
    var phone = req.session.userId['phone'] || '';
    var val = '';
    if (phone) {
        val = phone+'';
    } else {
        res.json({
            sucess: false,
            msg: '未登录'
        });
    }

    co(function *() {
        var has = yield AlbumsImg.findOne({likes: val, name: name}).exec();
        var doc='';
       // console.log(name,val,has);
        if (has) {
          doc=  yield AlbumsImg.findOneAndUpdate({name: name}, {$pull: {likes: val}},{new: true}).exec();
        } else {
          doc=  yield AlbumsImg.findOneAndUpdate({name: name}, {$push: {likes: val}},{new: true}).exec();
        }

        if(doc && doc.cover){
            updateCoverimg(doc);
        }
        res.json({
            success: true,
            msg: '成功'
        })
    });
}


//更新相册封面
function updateCoverimg(doc) {
    Albums.findOneAndUpdate({_id: doc.albumsId}, {$set: {coverImg: doc}}, {news: true}, function (err, doc) {
        console.log("updateCoverimg")
    })
}

module.exports = {
    get: indexGet,
    post: indexPost
};



