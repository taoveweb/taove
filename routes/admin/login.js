/**
 * Created by Administrator on 2015/9/7.
 */
var express = require('express');
var router = express.Router();
var Taove = require('../../models/db').Taove;
router.get('/', index);
router.post('/', post);

function index(req, res, next) {
    res.render('admin/login', {title: '登录', layout: 'layout_pc'});
}


function post(req, res, next) {
    var phone=req.body.phone;
    var password=req.body.password;

    //注册
    if (req.body.type == 'r') {

        Taove.findOne({phone: phone}, function (err, doc) {
            if (err) {
                res.json({ok: 0, msg: err})
            }
            if (!doc) {
                Taove.create({phone: phone, password: password}, function (err, doc) {
                    if (err) {
                        console.error(err);
                    } else {
                        res.json({ok: 1, msg: "注册成功请登录"})
                    }
                })
            } else {
                res.json({ok: 0, msg: "手机号已经注册过了"})
            }
        });
    } else {//登录
        Taove.findOne({phone: phone}, function (err, doc) {
            if (err) {
                res.json({ok: 0, msg: err});
            }
            if (!doc) {
                res.json({ok: 0, msg: "无此账号"});
            } else {
                doc.comparepassword(password,function(err,isMatch){
                    if(err) return next(err);
                    if(isMatch){
                        if (!req.session.userId) {
                            req.session.userId = {};
                        }
                        req.session.userId['phone']=req.body.phone;
                        req.session.userId['approved']=doc.approved;
                        req.session.userId['city']=doc.city;
                        req.session.userId['_id']=doc._id;
                        res.json({ok: 1, msg: "登录成功",sesstion:req.session.userId});
                    }else{
                        res.json({ok: 0, msg: "密码不正确"});
                    }

                });
            }

        })
    }

}

module.exports = router;
