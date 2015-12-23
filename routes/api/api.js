var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();

/* GET users listing. */

router.get('/', api);
router.get('/albums', albums);
function api(req, res) {
    var pagesize=2;
    var pageNum=req.query.p || 0;
    console.log(pageNum*pagesize,pageNum,req.query.p)
    Taove.aggregate({
            $project: {
                nikeName: 1,
                realName: 1,
                phone: 1,
                email: 1,
                city: 1,
                pohotoUrl: 1,
                admin: 1,
                approved: 1,
                banned: 1,
                application: 1,
                credentialsPhotoUrl: 1,
                singed: 1,
                makeuperIntroduction: 1,
                goodStyle: 1,
                selfIntroduction: 1,
                fromTime: 1,
                createdOn: {$dateToString: {format: "%Y-%m-%d %H:%M:%S:%L", date: "$createdOn"}},
                lastLogin: {$dateToString: {format: "%Y-%m-%d %H:%M:%S:%L", date: "$lastLogin"}},
                updated: {$dateToString: {format: "%Y-%m-%d %H:%M:%S:%L", date: "$updated"}}

            }
        },
        { $skip: pageNum*pagesize },
        {$limit:pagesize}
    ).
        exec(function (err, doc) {
            if (err) {
                res.render('api/user', {
                    layout: 'layout_api',
                    title: '用户中心',
                    msg: '出错了'
                });
            } else {
                Taove.count(function(err,count){
                    res.render('api/user', {
                        layout: 'layout_api',
                        title: '用户中心',
                        taove: doc,
                        length: Math.ceil(count/2)
                    });
                })


            }
        });
    /* Taove.find({}, function (err, doc) {
     // console.log(err,doc);
     if (err) {
     res.render('api/user', {
     layout: 'layout_api',
     title: '用户中心',
     msg: '出错了'
     });
     } else {
     res.render('api/user', {
     layout: 'layout_api',
     title: '用户中心',
     taove: doc
     });
     }
     })*/

}
;

function albums(req, res) {
    res.render('api/album', {
        layout: 'layout_api',
        title: '相册'
    });
};


module.exports = router;
