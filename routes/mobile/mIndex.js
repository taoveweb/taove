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
        var albumsimgs = yield AlbumsImg.aggregate(
            {$match: {photographyId: req.session.userId['_id']}}).group({
                _id: "$albumsId",
                imgs: {$push: {name: "$name", path: "$path", width: "$width", height: "$height", cover: "$cover"}}
            }).exec();
        var docs =yield Albums.find({photographyId: req.session.userId['_id']}).exec();

        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            for (var m = 0; m < albumsimgs.length; m++) {
                var imgs = albumsimgs[m];
                if (doc._id == imgs._id) {
                    docs[i].imgNum = imgs.imgs.length;
                    for (var l = 0; l < imgs.imgs.length; l++) {
                        var img = imgs.imgs[l];
                        if (img.cover) {
                            docs[i].coverImg = img.path + img.name;
                            docs[i].height = img.height * (266 / img.width);
                            break;
                        }
                    }
                }
            }

            if (!docs[i].imgNum) {
                docs[i].imgNum = 0;
                docs[i].coverImg = "img/placeholder.png";
                docs[i].height = 266;
            }

        }
        res.render('mobile/index', {
            title: '桃微',
            taove: docs,
            albumsNum: docs.length,
            detail: false,
            layout: 'layout_pc'
        });
    });
}


module.exports = {
    get: indexGet
};



