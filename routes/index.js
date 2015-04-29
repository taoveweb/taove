var express = require('express');
var router = express.Router();
var photographer={};
var db=require('../models/db');
/* GET home page. */


photographer.create=function(req,res,next){
  res.render('index',{title:'index'});
};

photographer.doCreate=function(req,res,next){
  res.render('index',{title:'doCreate'});
};

photographer.displayInfo=function(req,res,next){
  res.render('index',{title:'displayInfo'});
};

photographer.edit=function(req,res,next){
  res.render('index',{title:'edit'});
};

photographer.doEdit=function(req,res,next){
  res.render('index',{title:'doEdit'});
};

photographer.confirmDelete=function(req,res,next){
  res.render('index',{title:'confirmDelete'});
};

photographer.doDelete=function(req,res,next){
  res.render('index',{title:'doDelete'});
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/photographer/new', photographer.create); // Create new
//photographer form
router.post('/photographer/new', photographer.doCreate); // Create new
//photographer action
router.get('/photographer/:id', photographer.displayInfo); // Display photographer
//info
router.get('/photographer/edit/:id', photographer.edit); // Edit selected
//photographer form
router.post('/photographer/edit/:id', photographer.doEdit);// Edit selected
//photographer action
router.get('/photographer/delete/:id', photographer.confirmDelete);// Delete
// selected product form
router.post('/photographer/delete/:id', photographer.doDelete); // Delete
//selected photographer action


module.exports = router;
