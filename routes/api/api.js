var express = require('express');
var db=require('../../models/db');
var router = express.Router();

/* GET users listing. */

router.get('/', api);
router.get('/albums', albums);
function api  (req,res){
  res.render('api/user',{
    layout:'layout_api',
    title:'用户中心'
  });
};

function albums (req,res){
  res.render('api/album',{
    layout:'layout_api',
    title:'相册'
  });
};


module.exports = router;
