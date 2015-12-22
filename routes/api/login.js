var express = require('express');
var db=require('../../models/db');
var router = express.Router();

/* GET users listing. */

router.get('/', login);
router.post('/', postLogin);


function login (req,res){
  res.render('api/login',{
    layout:'layout_api',
    title:'登录'
  });
};

function postLogin (req,res){
  console.log(req.body);
  if(req.body.username=='admin' && req.body.password==111111){
    req.session.apiid={
      'username':req.body.username,
      'password':req.body.password
    };
    res.json({
      susscess:1,
      msg:'登录成功'
    });
  }else{
    res.json({
      susscess:0,
      msg:'用户名密码有误'
    });
  }
};


module.exports = router;
