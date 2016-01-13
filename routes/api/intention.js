/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var Intention = db.Intention;
var Taove = db.Taove;
var co = require('co');
//相册性能需更改
function getIntention(req, res, next) {
    co(function *(){
        var intention=yield Intention.find({}).exec();
        res.render('api/intention', {
            layout: "layout_api",
            title: "相册",
            intention:intention
        });
    });
}

function post(req, res, next) {
    switch(req.body.type){
        case 'update':
            updateIntention(req,res,next);
            break;
    }

}
function updateIntention(req,res,next){
    var body=req.body;
    var _id=req.body._id;
    delete body.type;
    delete body._id;
    if(body.hasdo==0){
        body.hasdo=true;
    }else{
        body.hasdo=false;
    }
   var reset={$set:body};
    co(function *(){
        var intention=yield Intention.findOneAndUpdate({_id:_id},reset).exec();
        console.log(intention)
        if(intention){
            res.json({
                success:true,
                msg:'更新成功'
            });
        }else{
            res.json({
                success:true,
                msg:'更新失败'
            });
        }

    })

}

module.exports = {
    get: getIntention,
    post:post
};



