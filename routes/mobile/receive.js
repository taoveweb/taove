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
    res.status(301);
    console.log(req.body)
    res.json({ok:'ys'})
}


module.exports = {
    get: indexGet,
    post: indexGet
};



