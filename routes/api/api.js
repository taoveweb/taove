var express = require('express');
var db = require('../../models/db');
var Taove = db.Taove;
var ObjectId = db.ObjectId;
var router = express.Router();
var intention=require('./intention');
var photoframes=require('./photoframes');
var photoframesDetail=require('./photoframesDetail');
/* GET users listing. */

router.get('/', api);
router.post('/', postApi);
router.get('/albums', albums);
router.get('/intention', intention.get);
router.post('/intention', intention.post);
//婚件产吕
router.get('/photoframes', photoframes.get);
router.post('/photoframes', photoframes.post);
//婚件产吕详情
router.use('/photoframesDetail',photoframesDetail);


function postApi(req,res,next){
    var params=req.body;
    var options={new:true};
    Taove.findOneAndUpdate({
        phone:params.phone
    },{
        $set:{
            admin:params.admin=="true",
            approved:params.approved=="true",
            banned:params.banned=="true",
            application:params.application=="true"
        }
    },options,function(err,doc){

        //审合后重新设置审合状态
        req.session.userId['approved']=doc.approved;
        res.json({
            err:err,
            //doc:doc,
            //post:params,
            success:true,
            msg:'提交成功'
        })
    })

}
function api(req, res) {
    var pagesize=10;
    var pageNum=req.query.p || 1;
    var match={};
    if(req.query.application=='true'){
        match.application=true;
    }
    if(req.query.phone){
        match.phone=parseInt(req.query.phone);
    }
    if(req.query.realName){
        match.realName=req.query.realName;
    }
    console.log(match);
    Taove.aggregate(
        {$match:match},
        {
            $project: {
                nikeName: 1,
                password: 1,
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
                createdOn: {$dateToString: {format: "%Y-%m-%d %H:%M:%S", date: "$createdOn"}},
                lastLogin: {$dateToString: {format: "%Y-%m-%d %H:%M:%S", date: "$lastLogin"}},
                updated: {$dateToString: {format: "%Y-%m-%d %H:%M:%S", date: "$updated"}}

            }
        },
        { $skip: (parseInt(pageNum)-1)*pagesize },
        {$limit:pagesize}
    ).
        exec(function (err, doc) {
            console.log(err);
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
                        current:parseInt(pageNum),
                        application:req.query.application=='true',
                        length: Math.ceil(count/pagesize)
                    });
                })
            }
        });
};

function albums(req, res) {
    res.render('api/album', {
        layout: 'layout_api',
        title: '相册'
    });
};


module.exports = router;
