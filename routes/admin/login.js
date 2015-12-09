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

    //注册
    if (req.body.type == 'r') {
        Taove.findOne({phone:  req.body.phone}, function (err, doc) {
            if(err){
                res.json({ok: 0,msg:err})
            }
            if (!doc) {
                Taove.create({phone: req.body.phone, password: req.body.password}, function (err, doc) {
                    if (err) {
                        console.error(err);
                    }else{
                        res.json({ok: 1})
                    }
                })
            }else{
                res.json({ok: 0,msg:"手机号已经注册过了"})
            }
        });
    }else{//登录
        Taove.findOne({phone:  req.body.phone,password:req.body.password}, function (err, doc) {
            if(err){
                res.json({ok: 0,msg:err});
            }
            if(!doc){
                res.json({ok: 0,msg:"账号和密码不正确"});
            }else{
                res.json({ok: 1,msg:"登录成功"});
            }

        })
    }

}

module.exports = router;
