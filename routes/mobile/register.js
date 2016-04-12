/**浏览页面
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var path = require('path');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;
var co = require('co');


function indexGet(req, res, next) {
    if(req.query.phone){
        res.render('mobile/register_validate', {
            title: '输入验证码',
            layout: 'layout_m',
            phone:req.query.phone
        });
    }else{
        res.render('mobile/register', {
            title: '注册',
            layout: 'layout_m'
        });
    }

}


function indexPost(req, res, next) {
    var phone=req.body.phone;
    co(function *(){
        var docs = yield Taove.findOne({phone: phone}).exec();
        //console.log('docs',docs);
        if(!docs){
            res.json({
                ok:1,
                msg:'可以注册'
            })
        }else{
            res.json({
                ok:0,
                msg:'已经注册过了'
            })
        }
    })
}


module.exports = {
    get: indexGet,
    post: indexPost
};



