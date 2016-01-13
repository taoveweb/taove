var co = require('co');
var db = require('../../models/db');
var Intention = db.Intention;
var Taove = db.Taove;

function post(req, res, next) {
    switch (req.body.type) {
        case "post":
            PostIntention(req, res, next);
            break;
        case "delete":
        {
            DeleteIntention(req, res, next);
            break;
        }
    }

};

function PostIntention(req, res, next) {
    var phone = parseInt(req.body.phone);
    var body = req.body;
    delete req.body.type;
    body.phone = phone;
    co(function *() {
        var intetionold = yield  Intention.findOne({phone: phone}).exec();
        if (!intetionold) {
            Intention.create(body, function (err, doc) {
                res.json({
                    success: true,
                    msg: "提交成功"
                })
            })
        } else {
            res.json({
                success: false,
                msg: "您的电话已经提交了请不要重复提交哦"
            })
        }
    });
}

function DeleteIntention(req, res, next) {
    var _id = req.body._id;
    Intention.findOneAndRemove({_id: _id}, function (err, doc) {
        console.log(err, doc);
        if (doc) {
            res.json({
                success: true,
                msg: "取消成功"
            })
        }
    })
}

function getIntention(req, res, next) {
    var phone = req.session.userId['phone'];
    co(function *() {
        var intention = yield  Intention.findOne({phone: phone}).exec();
        if (!intention || !intention.photographyPhone) {
            var taove = {realName: ''}
        } else {
            var photographyPhone = parseInt(intention.photographyPhone);
            var taove = yield Taove.findOne({phone: photographyPhone}, "realName").exec();
        }

        res.render('admin/intention', {
            title: '意向单',
            layout: 'layout_pc',
            intention: intention,
            realName: taove.realName
        });
    });
};

module.exports = {
    get: getIntention,
    post: post
};
