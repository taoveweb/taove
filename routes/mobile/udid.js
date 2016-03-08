/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;
var path = require('path');
var co = require('co');
//相册性能需更改
function indexGet(req, res, next) {
    console.log(path.join(__baseDir, 'public/udid.mobileconfig'))
    var url=path.join(__baseDir, 'public/udid.mobileconfig')
    res.set({
        'Content-Type': 'application/x-apple-aspen-config'
    });
    res.sendFile(url, function (err) {
        if (err) {
            res.status(err.status).end();
        }
        else {
        console.log('aa')
        }
    });
}


module.exports = {
    get: indexGet,
    post: indexGet
};



