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
var gm = require('gm').subClass({imageMagick: true});
var co = require('co');

//相册
function getProduction(req, res, next) {
    co(function *() {
        var docs = yield Albums.find({photographyId: req.session.userId['_id']}).exec();
        res.render('admin/production', {
            title: '摄影作品',
            taove: docs,
            albumsNum: docs.length,
            detail: false,
            layout: 'layout_pc'
        });
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
        case "cover":
            coverImg(req, res, next);
            break;
        case "editAlbumsTitle":
            editAlbumsTitle(req, res, next);
            break;
        case "editAlbumsImgsTitle":
            editAlbumsImgsTitle(req, res, next);
            break;
    }

}

function getProductiondetail(req, res, next) {

    AlbumsImg.find({
        albumsId: req.query.albumsId,
        photographyId: req.session.userId['_id']
    }).sort({createdOn: -1}).exec(function (err, albumsimgs) {
        res.render('admin/production_detail', {
            title: '摄影作品',
            detail: true,
            "albumsimgs": albumsimgs,
            imgNum: albumsimgs.length,
            layout: 'layout_pc'
        });
    });

}

//设置封面
function coverImg(req, res, next) {
    var _id = req.body._id;
    var albumsId = req.body.albumsId;
    var reset = {cover: false};
    var set = {cover: true};
    AlbumsImg.findOneAndUpdate({
        albumsId: albumsId,
        photographyId: req.session.userId['_id'],
        cover: true
    }, reset, function (err, doc) {
        AlbumsImg.findOneAndUpdate({_id: _id, photographyId: req.session.userId['_id']}, set, {new:true},function (err, albumsId) {
            updateCoverimg(albumsId);
            res.json({
                success: true,
                msg: "封面设置成功"
            })
        })
    });

}

//编缉相册标题
function editAlbumsTitle(req, res, next) {
    var _id = req.body._id;
    var title = req.body.title;
    var reset = {title: title};
    Albums.findOneAndUpdate({_id: _id, photographyId: req.session.userId['_id']}, reset, function (err, doc) {
        if (err) {
            res.json({
                success: false,
                msg: "编辑失败"
            })
        }
        res.json({
            success: true,
            msg: "编辑成功"
        })
    });
}


//编缉相册图片标题
function editAlbumsImgsTitle(req, res, next) {
    var _id = req.body._id;
    var title = req.body.title;
    var reset = {title: title};
    AlbumsImg.findOneAndUpdate({_id: _id, photographyId: req.session.userId['_id']}, reset, function (err, doc) {
        if (err) {
            res.json({
                success: false,
                msg: "编辑失败"
            })
        }
        res.json({
            success: true,
            msg: "编辑成功"
        })
    });

}

//只要在当前用户下的图片才有资格           册除----------------------
function deleteImg(req, res, next) {
    var _id = req.body._id;
    var albmsImg = new AlbumsImg();

    co(function *() {
        var albumsimg = yield AlbumsImg.findOneAndRemove({"_id": _id, photographyId: req.session.userId['_id']}).exec();
        var albumsId = albumsimg.albumsId;
        if (albumsimg) {
            var doc = yield AlbumsImg.findOne({albumsId: albumsId});
            var count=yield AlbumsImg.count({albumsId: albumsId}).exec();
            yield Albums.findOneAndUpdate({_id: albumsId}, {$set: {imgNum:count}}).exec();
            //删除的是封面重新设置封面
            if (albumsimg.cover && doc) {
                yield AlbumsImg.findOneAndUpdate({_id: doc._id}, {$set: {cover: true}});
                updateCoverimg(doc);
            }
            res.json({
                success: true,
                msg: '删除成功'
            })
        } else {
            res.json({
                success: false,
                msg: '删除失败'
            })
        }
    })
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

    form.parse(req, function (err, fields, files) {

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
        gm(dir + imgname).size(function (err, size) {
            var doc = {
                "albumsId": albumsId,//相册id
                photographyId: req.session.userId['_id'],//摄影师Id
                name: imgname,//文件名与图片名称一样
                path: imgWebDir,//目录名
                title: title,//图片标题
                width: size.width,//
                height: size.height,//
                imgType: param.imgType//图片类型 0为未修 1为精修 3相册封面 4x展架
            };

            //如果第一张默认设计为相册首页并更新相册数量
            AlbumsImg.count({albumsId: param.AlbumsId}, function (err, count) {
                if (!count) {
                    doc.cover = true;
                    updateCoverimg(doc);
                }
                doc.imgNum = count + 1;
                var albums = new AlbumsImg(doc);
                if (count >= 150) {
                    res.json({
                        success: false,
                        tooMuch: true,
                        msg: '但提交图片超出来数量'
                    });
                } else {
                    albums.save(function (err) {
                        res.json({
                            success: true,
                            files: files.qqfile,
                            fields: fields,
                            msg: '提交图片成功'
                        });
                    });
                }

            });
        });

    });


}


//更新相册封面
function updateCoverimg(doc) {
    Albums.findOneAndUpdate({_id: doc.albumsId}, {$set: {coverImg: doc}}, {news: true}, function (err, doc) {
        console.log("updateCoverimg")
    })
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



