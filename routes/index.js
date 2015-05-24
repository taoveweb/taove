var express = require('express');
var router = express.Router();
var photographer={};
var db=require('../models/db');
/* GET home page. */

router.get('/', index);
router.get('/photographer/new', create); // Create new
//photographer form
router.post('/photographer/new', doCreate); // Create new
//photographer action
router.get('/photographer/:id', displayInfo); // Display photographer
//info
router.get('/photographer/edit/:id', edit); // Edit selected
//photographer form
router.post('/photographer/edit/:id', doEdit);// Edit selected
//photographer action
router.get('/photographer/delete/:id', confirmDelete);// Delete
// selected product form
router.post('/photographer/delete/:id', doDelete); // Delete
//selected photographer action

function index(req, res, next) {
  res.render('index', { title: '桃微' });
}

function create(req,res,next){
  res.render('index',{title:'桃微'});
};

function doCreate(req,res,next){
  res.render('index',{title:'doCreate'});
};

function displayInfo(req,res,next){
  res.render('index',{title:'displayInfo'});
};

function edit(req,res,next){
  res.render('index',{title:'edit'});
};

function doEdit(req,res,next){
  res.render('index',{title:'doEdit'});
};

function confirmDelete(req,res,next){
  res.render('index',{title:'confirmDelete'});
};

function doDelete(req,res,next){
  res.render('index',{title:'doDelete'});
};



module.exports = router;
