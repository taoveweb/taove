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
    res.render('mobile/sk', {
        title: '拍照',
        layout: 'layout_m'
    });
}


function indexPost(req, res, next) {
    res.render('mobile/sk', {
        title: '拍照',
        layout: 'layout_m'
    });
}


module.exports = {
    get: indexGet,
    post: indexPost
};



