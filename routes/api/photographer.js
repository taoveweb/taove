var express = require('express');
var db=require('../../models/db');
var router = express.Router();

/* GET users listing. */

router.get('/', index); // Current user profile
router.get('/new', create); // Create new user form
router.post('/new', doCreate); // Create new user action
router.get('/edit', edit); // Edit current user form
router.post('/edit', doEdit); // Edit current user action
router.get('/delete', confirmDelete); // delete current
//user form
router.post('/delete', doDelete); // Delete current

router.get('/login', login); // Login form
router.post('/login', doLogin); // Login action
router.get('/logout', doLogout); // Logout current user

function index  (req,res){
  res.render('api/photographer',{
    layout:'layout_admin'
  });
};

function create(req,res,next){
  res.send('create');
};

function doCreate(req,res,next){
  res.send('doCreate');
};

function edit(req,res,next){
  res.send('edit');
};

function doEdit(req,res,next){
  res.send('doEdit');
};

function confirmDelete(req,res,next){
  res.send('confirmDelete');
};

function doDelete(req,res,next){
  res.send('doDelete');
};

function login(req,res,next){
  res.send('login');
};

function doLogin(req,res,next){
  res.send('doLogin');
};

function doLogout(req,res,next){
  res.send('doLogout');
};


module.exports = router;
