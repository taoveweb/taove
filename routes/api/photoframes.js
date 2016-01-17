/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var PhotoFrames = db.PhotoFrames;
var Taove = db.Taove;
var co = require('co');
//相册性能需更改
function getPhotoframes(req, res, next) {
    co(function *() {
        var photoFrames = yield PhotoFrames.find({}).exec();
        res.render('api/photoframes', {
            layout: "layout_api",
            title: "相册",
            photoFrames: photoFrames
        });
    });
}

function post(req, res, next) {
    switch (req.body.type) {
        case 'update':
            updateIntention(req, res, next);
            break;
        case 'add':
            addPhotoFrames(req, res, next);
            break;
    }

}

function addPhotoFrames(req, res, next) {
    co(function *() {
        var newObj = req.body;
        delete req.body.type;

        var photoFrames = yield PhotoFrames.create(newObj).exec();
        if (photoFrames) {
            res.json({
                success: true,
                msg: '创建成功'
            })
        }
    })

}
function updateIntention(req, res, next) {
    var body = req.body;
    var _id = req.body._id;
    delete body.type;
    delete body._id;
    if (body.hasdo == 0) {
        body.hasdo = true;
    } else {
        body.hasdo = false;
    }
    var reset = {$set: body};
    co(function *() {
        var intention = yield Intention.findOneAndUpdate({_id: _id}, reset).exec();
        console.log(intention)
        if (intention) {
            res.json({
                success: true,
                msg: '更新成功'
            });
        } else {
            res.json({
                success: true,
                msg: '更新失败'
            });
        }

    })

}


module.exports = {
    get: getPhotoframes,
    post: post
};



