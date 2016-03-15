/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var path=require('path');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;
var co = require('co');
//相册性能需更改
function indexGet(req, res, next) {

    co(function *() {
        if (req.query.q && req.query.q == 'more') {
            var docs = yield Albums.find({createdOn: {$lt:req.query.createdOn}}).sort({createdOn:-1}).limit(2).exec();
            res.json({taove:docs})
        } else if (req.query.q && req.query.q == 'update') {
            var count=yield  Albums.count();
            var docs = yield Albums.find({createdOn: {$gt:req.query.createdOn}}).sort({createdOn:-1}).limit(2).exec();
            res.json({taove:docs,count:count})
        } else {
            var count=yield  Albums.count();
            var docs = yield Albums.find().sort({createdOn:-1}).limit(3).exec();
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


function indexPost(req, res, next) {
    var name=req.body.name|| '';
    var uuid=req.body.uuid || '';
    var userid=req.session.userId['_id'] || '';
    var val='';

    if(uuid){
        val=uuid;
    }else if(userid){
        val=userid;
    }else{
      res.json({
          sucess:false,
          msg:'参数有错'
      });
    }
    console.log(name,uuid,userid);
    co(function *() {
        var has = yield AlbumsImg.findOne({likes:val,name:name}).exec();
        console.log(has);
        if(has){
            yield AlbumsImg.findOneAndUpdate({name:name},{$pull:{likdes:val}}).exec();
        }else{
            yield AlbumsImg.findOneAndUpdate({name:name},{$push:{likdes:val}}).exec();
        }
        res.json({
            success:true,
            msg:'成功'
        })
    });
}


module.exports = {
    get: indexGet,
    post: indexPost
};



