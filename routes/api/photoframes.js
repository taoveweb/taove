/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var formidable = require('formidable');
var fs = require('fs');
var PhotoFrames = db.PhotoFrames;
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var co = require('co');
//相册性能需更改
function getPhotoframes(req, res, next) {
    co(function *() {
        var photoFrames = yield PhotoFrames.find({}).sort({createdOn: -1}).exec();
        res.render('api/photoframes', {
            layout: "layout_api",
            title: "相册",
            photoFrames: photoFrames
        });
    });
}

function post(req, res, next) {
    var type = req.body.type || req.query.type;
    console.log(type + "------------aaaa");
    switch (type) {
        case 'addImg': //添加轮播图
            addImgIntention(req, res, next);
            break;
        case 'addCollection': //添加轮播图
            addPhotoFrames(req, res, next);
            break;
        case 'deleteCollection':  //删除文档
            deletePhotoFrames(req, res, next);
            break;
        case 'deleteImg': //删除轮播图
            deleteImgPhotoFrames(req, res, next);
            break;
        case 'updateCollection': //更新所有
            updateCollection(req, res, next);
            break;
    }

}

function addPhotoFrames(req, res, next) {
    var newObj = req.body;
    delete req.body.type;

    PhotoFrames.create(newObj, function (err, photoFrames) {
        console.log(photoFrames + "photoFrames")
        if (photoFrames) {
            res.json({
                success: true,
                msg: '创建成功'
            })
        }
    });
}

function deletePhotoFrames(req, res, next) {
    co(function *() {
        var id = req.body.id;
        var photoFrames = yield PhotoFrames.findOneAndRemove({_id: id}).exec();
        if (photoFrames) {
            res.json({
                success: true,
                msg: '删除成功'
            })
        }
    })
}

function deleteImgPhotoFrames(req, res, next) {
    co(function *() {
        var imgId = req.body.imgId;
        var collectionId = req.body.collectionId;
        var set = {$pull: {imgs: {_id: imgId}}};
        PhotoFrames.findOneAndUpdate({_id: collectionId}, set, function (err, doc) {
            console.log(err, doc)
            res.json({
                success: true,
                msg: '删除成功'
            })
        })
    })
}




function updateCollection(req, res, next) {
    co(function *() {
        var _id = req.body._id;
        var body=req.body;
        delete req.body.type;
        delete req.body._id;
        var set = {$set:body};
        PhotoFrames.findOneAndUpdate({_id: _id}, set, function (err, doc) {
            res.json({
                success: true,
                msg: '更新成功'
            })
        })
    })
}


function addImgIntention(req, res, next) {
    var body = req.body;
    var _id = req.query.id;
    delete body.type;
    delete body.id;
    var reset = {$set: body};


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
        var param = files;
        var imgname = new ObjectId();
        var ext = '';
        var title = param.files.name.substring(0, param.files.name.indexOf('.'));
        var imgWebDir = "images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
        if (isValidFileName(files.files.path)) {
            ext = getExt(files.files.path);
        } else {
            // 错误处理
        }
        imgname += "." + ext;
        fs.renameSync(files.files.path, dir + imgname);


        var doc = {
            $push: {
                imgs: {
                    name: imgname,//文件名与图片名称一样
                    path: imgWebDir//目录名
                }
            }
        };

        PhotoFrames.findOneAndUpdate({_id: _id}, doc, function (err, doc) {
            console.log(err)
            res.json({})
        })

    });


    /*    res.json({
     "files": [{
     "url": "https://jquery-file-upload.appspot.com/image%2Fjpeg/4106290111/1.jpg",
     "thumbnailUrl": "https://jquery-file-upload.appspot.com/image%2Fjpeg/4106290111/1.jpg.80x80.jpg",
     "name": "1.jpg",
     "type": "image/jpeg",
     "size": 122715,
     "deleteUrl": "https://jquery-file-upload.appspot.com/image%2Fjpeg/4106290111/1.jpg",
     "deleteType": "DELETE"
     }]
     }
     );
     co(function *() {
     var photoFrames = yield PhotoFrames.findOneAndUpdate({_id: _id}, reset).exec();
     console.log(photoFrames);
     })*/


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
    get: getPhotoframes,
    post: post
};



