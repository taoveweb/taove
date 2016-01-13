var express = require('express');
var router = express.Router();
var db = require('../../models/db');
var Intention=db.Intention;
router.post('/', postIntention); // Create new buyer action

function postIntention(req,res,next){
    var phone=req.body.phone;
    var newItention={
        name:String,
        phone:Number,
        photoTime:Date,
        photoStyle:Number,// 0中式古典1韩式简约2欧式奢华3唯美自然4个性时尚
        photoCity:String,
        photoLine:String,//摄影路线
        photographyId:String//摄影师Id
    }
    Intention.findOne({phone:phone},function(err,intention){
        if(!intention){
            Intention.create(newItention,function(err,doc){
                res.json({
                    sucess:true,
                    msg:"提交成功"
                })
            })
        }
    });
    res.send('doCreate');
};

module.exports = router;
