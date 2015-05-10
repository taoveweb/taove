/**
 * Created by Administrator on 2015/5/7.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var util = require('util');
var URL = require('url');
var db = require('../models/db');
var albums = db.albums;
var ObjectId = db.ObjectId;

router.get('/', getAlbum);
router.get('/:projectTitle', getAlbum);
router.get('/user', getUser);
router.get('/photographer', getPhotographer);
router.post('/', postAlbum);

/*相册------------------------------------------------*/
function getAlbum(req, res, next) {
    console.log('getAlbum------------------------------');
    var query={};
    if(!!req.params.projectTitle){
        query={projectTitle:req.params.projectTitle};
    }
    albums.find(query,null, function (err, list) {
        if (err) {
            console.log(err);
            res.render('admin/album', {
                getSucess: false,
                title:"相册",
                err:err
            })
        }
            console.log('getAlbum成功');
        res.render('admin/album', {
            layout: "layout_admin",
            title:"相册",
            list: list
        });
    });

};

function postAlbum(req, res, next) {

    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        var param = fields;
        var img = files.img;
        albums.create({
            projectTitle: param.projectTitle,
            photographer: param.photographer,
            package: param.package,
            description: param.description,
            area: param.area,
            style: param.style,
            img: [
                {
                    img_id: new ObjectId,
                    path: img.path.replace("uploads\\", ""),
                    name: img.path.replace("uploads\\", ""),
                    collectUser: [],
                    comment: []
                }
            ],
            customer: param.customer,
            createdBy: param.createdBy,
            modifiedOn: new Date().getTime(),
            photoOn: param.photoOn

        }, function (err, list) {
            console.log(list);
            if (err)   res.send('失败了');
            res.send('成功了')
        });
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