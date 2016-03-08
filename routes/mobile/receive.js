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
    console.log('aaa-------------')
    console.log('aaa-------a------')
    console.log(req)
    res.status(301);
    res.json({ok:req.body})
}


module.exports = {
    get: indexGet,
    post: indexGet
};



