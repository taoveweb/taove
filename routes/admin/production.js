/**
 * Created by Administrator on 2015/12/21 0021.
 */
var formidable = require('formidable');
var fs = require('fs');
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;

function getProduction(req, res, next) {
    Albums.find({photographyId: req.session.userId['_id']}, function (err, doc) {
        if (err) next(err);
        res.render('admin/production', {title: '摄影作品', taove: doc, detail: false, layout: 'layout_pc'});
    });
}
//创建相册
function postProduction(req, res, next) {

    switch (req.body.type) {
        case 'create':
            createAlbums(req, res, next);
            break;
        case "delete":
            deleteImg(req, res, next);
            break;
    }

}

function getProductiondetail(req, res, next) {
    AlbumsImg.find({albumsId: req.query.albumsId}).sort({createdOn: -1}).exec(function (err, albums) {
        res.render('admin/production_detail', {
            title: '摄影作品',
            detail: true,
            "albums": albums,
            imgNum: albums.length,
            layout: 'layout_pc'
        });
    });

}
//只要在当前用户下的图片才有资格册除----------------------
function deleteImg(req, res, next) {
    var _id = req.body._id;
    AlbumsImg.findOneAndRemove({
        "_id": _id,
        photographyId: req.session.userId['_id']
    }, function (err, albumsimg, result) {
        if (!albumsimg) {
            res.json({
                success: false,
                msg: '你没有权限'
            })
        } else {
            var updateSet = {$inc: {imgNum: -1}};
            Albums.findOneAndUpdate({_id: albumsimg.albumsId}, updateSet, {new: true}, function (err, doc) {

                res.json({
                    success: true,
                    msg: '删除成功'
                })
            });
        }

    });
}
//创建相册-----------------------------------------------------
function createAlbums(req, res, next) {
    var params = req.body;
    var doc = {
        photographyId: params.photographyId,
        title: params.title,
        description: params.description,
        customerId: req.session.userId['_id'],
        city: params.city,
        style: params.style
    };
    if (params.phone != "") {
        Taove.findOne({phone: params.phone}, "_id", function (err, taove) {
            doc.customerId = taove._id;
            if (!taove || err) {
                createPhotographyerAlbums(res, req, doc, '没有这个客户')
            } else {
                createPhotographyerAlbums(res, req, doc, '创建成功')
            }
        })
    } else {
        createPhotographyerAlbums(res, req, doc, '创建成功');
    }
}


function createPhotographyerAlbums(res, req, doc, msg) {
    Albums.create(doc, function (err, doc) {
        if (err || !doc) {
            res.json({ok: 0, err: err});
        } else {
            res.json({ok: 1, params: req.body, msg: msg});
        }
    });
}


//提交相册图片
function postProductionimg(req, res, next) {

    var form = new formidable.IncomingForm();
    var dir = "./uploads/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    form.uploadDir = dir;
    //form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.multiples = true;
    form.maxFieldsSize = 5 * 1024 * 1024;
    console.log('postProductionimg-----------------------------');

    form.on('progress', function(bytesReceived, bytesExpected) {
        res.json({
            bytesReceived:bytesReceived,
            bytesExpected:bytesExpected
        })
    });

    form.parse(req, function (err, fields, files) {
        console.log(err, '11111111111111111111111111111');
        var param = fields;
        var imgname = new ObjectId();
        var ext = '';
        var title = param.qqfilename.substring(0, param.qqfilename.indexOf('.'));
        var imgWebDir = "images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
        var albumsId = param.AlbumsId;
        if (isValidFileName(files.qqfile.path)) {
            ext = getExt(files.qqfile.path);
        } else {
            // 错误处理
        }
        imgname += "." + ext;
        fs.renameSync(files.qqfile.path, dir + imgname);
        // console.log(files.qqfile);
        var doc = {
            "albumsId": albumsId,//相册id
            photographyId: req.session.userId['_id'],//摄影师Id
            name: imgname,//文件名与图片名称一样
            path: imgWebDir,//目录名
            title: title,//图片标题
            imgType: param.imgType//图片类型 0为未修 1为精修 3相册封面 4x展架
        };

        //如果第一张默认设计为相册首页并更新相册数量
        AlbumsImg.count({albumsId: param.AlbumsId}, function (err, count) {
            if (!count) {
                doc.cover = true;
            }
            var albums = new AlbumsImg(doc);
            if (count >= 200) {
                res.json({
                    success: true,
                    msg: '但提交图片超出来数量'
                });
            }
            albums.save(function (err) {
                var updateSet = {$set: {imgNum: parseInt(count) + 1}};
                if (!count) {
                    updateSet = {$set: {coverImg: imgWebDir + imgname, imgNum: parseInt(count) + 1}}
                }
                Albums.findOneAndUpdate({_id: albumsId}, updateSet, {new: true}, function (err, doc) {
                    res.json({
                        success: true,
                        msg: '提交图片成功'
                    });
                });

            });

        });


    });


}


function getExt(filename) {
    var split = filename.split('.');
    return split[split.length - 1];
}
function isValidFileName(filename) {
    var split = filename.split('.');
    if (split.length < 2) {
        return false;
    }
    return true;
}


module.exports = {
    get: getProduction,
    post: postProduction,
    getdetail: getProductiondetail,
    postimg: postProductionimg
};



