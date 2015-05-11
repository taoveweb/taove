/**
 * Created by Administrator on 2015/5/7.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var URL = require('url');
var db = require('../models/db');
var Albums = db.Albums;
var ObjectId = db.ObjectId;

router.get('/', getAlbum);
router.get('/:projectTitle', getAlbum);//查
router.post('/', postAlbum);
router.put('/', putAlbum);//册
router.delete('/', deleteAlbum);//册

router.get('/user', getUser);
router.get('/photographer', getPhotographer);


/*相册------------------------------------------------*/
function getAlbum(req, res, next) {
    console.log('getAlbum------------------------------');
    var query = {};
    if (!!req.params.projectTitle) {
        query = {projectTitle: req.params.projectTitle};
    }
    console.log(query);
    Albums.find(query, null, function (err, list) {
        if (err) {
            console.log(err);
            res.render('admin/album', {
                getSucess: false,
                title: "相册",
                err: err
            })
        }
        console.log('getAlbum成功');
        res.render('admin/album', {
            layout: "layout_admin",
            title: "相册",
            list: list
        });
    });

};

function deleteAlbum(req, res, next) {
    console.log('deleteAlbum------------');
    var albums = new Albums;
    var imgid = req.body.imgId;
    if (!imgid) {
        Albums.remove({_id: req.body._id}, function (err, list) {
            if (err) {
                res.json({
                    state: 0
                })
            }

            res.json({
                state: 1,
                _id: req.body._id
            })
        });
    } else {
        console.log('-albums.img.id(req.body.imgId+--------------------------');
        Albums.findById(req.body._id, null, function (err, list) {
            list.img.id(imgid).remove();
            list.save(function (err) {
                if (err) {
                    res.json({
                        state: 0
                    })
                }

                res.json({
                    state: 1,
                    _id: req.body._id
                })
            });
        })


    }


}

function putAlbum(req, res, next) {
    console.log('putAlbum------------');
    res.send('修改');
}
function postAlbum(req, res, next) {
    console.log('postAlbum------------');

    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads/images/";
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.multiples = true;
    form.parse(req, function (err, fields, files) {
        var param = fields;
        var img = files.img;
        var imgS = [];

        if (files.img.length) {
            for (var i = 0; i < files.img.length; i++) {
                var imgItem = img[i];
                imgS.push({
                    path: imgItem.path.replace("uploads\\images\\", ""),
                    name: imgItem.path.replace("uploads\\", ""),
                    collectUser: [],
                    comment: []
                })
            }
        } else {
            imgS.push({
                path: img.path.replace("uploads\\images\\", ""),
                name: img.path.replace("uploads\\", ""),
                collectUser: [],
                comment: []
            })
        }

        if (param._id) {
            //只上传图处
            Albums.findById(param._id,function(err,list){
                for(var i=0;i<imgS.length;i++){
                    list.img.push(imgS[i]);
                }
                list.save(function(err){
                    if (err)   res.send('失败了' + err);
                    res.send('成功了')
                })

            });
        } else {
            //增加一条相册记录
            Albums.create({
                projectTitle: param.projectTitle,
                photographer: param.photographer,
                package: param.package,
                description: param.description,
                area: param.area,
                style: param.style,
                img: imgS,
                customer: param.customer,
                createdBy: param.createdBy,
                modifiedOn: new Date().getTime(),
                photoOn: new Date().getTime()

            }, function (err, list) {
                if (err)   res.send('失败了' + err);
                res.redirect("/admin");
                res.send('成功了')
            });

        }
        //res.end(util.inspect({fields: fields, files: files}));
    });


};


/*用户-------------------------------------------------------*/
function getUser(req, res, next) {
    res.render('admin/user', {layout: "layout_admin"});
};

/*用户-------------------------------------------------------*/
function getPhotographer(req, res, next) {
    res.render('admin/photographer', {layout: "layout_admin"});
};


module.exports = router;