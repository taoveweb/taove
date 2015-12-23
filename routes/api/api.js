var express = require('express');
var db=require('../../models/db');
var Taove=db.Taove;
var ObjectId=db.ObjectId;
var router = express.Router();

/* GET users listing. */

router.get('/', api);
router.get('/albums', albums);
function api (req,res){
  Taove.aggregate({
    $project:
    {
      year: { $year: "$createdOn" },
      month: { $month: "$createdOn" },
      day: { $dayOfMonth: "$createdOn" },
      hour: { $hour: "$createdOn" },
      minutes: { $minute: "$createdOn" },
      seconds: { $second: "$createdOn" },
      milliseconds: { $millisecond: "$createdOn" },
      dayOfYear: { $dayOfYear: "$createdOn" },
      dayOfWeek: { $dayOfWeek: "$createdOn" },
      week: { $week: "$createdOn" }
    }
  }).exec(function(err,doc){
    console.log(doc);
  });
  Taove.find({},function(err,doc){
    if(err){
      res.render('api/user',{
        layout:'layout_api',
        title:'用户中心',
        msg:'出错了'
      });
    }else{
      res.render('api/user',{
        layout:'layout_api',
        title:'用户中心',
        taove:doc
      });
    }
  })

};

function albums (req,res){
  res.render('api/album',{
    layout:'layout_api',
    title:'相册'
  });
};


module.exports = router;
