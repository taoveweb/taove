var express = require('express');
var User=require('../../models/db').User;
var router = express.Router();

/* GET users listing. */

router.get('/', index); // Current buyer profile
router.get('/new', create); // Create new buyer form
router.post('/new', doCreate); // Create new buyer action
router.get('/edit', edit); // Edit current buyer form
router.post('/edit', doEdit); // Edit current buyer action
router.get('/delete', confirmDelete); // delete current
//buyer form
router.post('/delete', doDelete); // Delete current

router.get('/login', login); // Login form
router.post('/login', doLogin); // Login action
router.get('/logout', doLogout); // Logout current buyer

function index  (req,res){
  console.log('users');
  res.render('api/buyer',{
    layout:'layout_admin'
  });
};

function create(req,res,next){
  console.log(create)
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
