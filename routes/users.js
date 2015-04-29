var express = require('express');
var db=require('../models/db');
var router = express.Router();
var user={};
/* GET users listing. */

user.index=function (req,res){
  res.send('index');
};

user.create=function (req,res,next){
  res.send('create');
};

user.doCreate=function (req,res,next){
  res.send('doCreate');
};

user.edit=function (req,res,next){
  res.send('edit');
};

user.doEdit=function (req,res,next){
  res.send('doEdit');
};

user.confirmDelete=function (req,res,next){
  res.send('confirmDelete');
};

user.doDelete=function (req,res,next){
  res.send('doDelete');
};

user.login=function (req,res,next){
  res.send('login');
};

user.doLogin=function (req,res,next){
  res.send('doLogin');
};

user.doLogout=function (req,res,next){
  res.send('doLogout');
};


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', user.index); // Current user profile
router.get('/user/new', user.create); // Create new user form
 router.post('/user/new', user.doCreate); // Create new user action
 router.get('/user/edit', user.edit); // Edit current user form
 router.post('/user/edit', user.doEdit); // Edit current user action
 router.get('/user/delete', user.confirmDelete); // delete current
 //user form
 router.post('/user/delete', user.doDelete); // Delete current

 router.get('/login', user.login); // Login form
 router.post('/login', user.doLogin); // Login action
 router.get('/logout', user.doLogout); // Logout current user
module.exports = router;
