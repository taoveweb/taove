/**
 * Created by Administrator on 2015/5/25.
 */

//pc
var index_pc = require('../routes/pc/index');
var app_pc = require('../routes/pc/app');
var autumn_pc = require('../routes/pc/autumn');//秋季特惠
var photoframes_pc = require('../routes/pc/photoframes');//婚件产品
var wd_pc = require('../routes/pc/wd'); //结婚喜帖
var photograhper_pc = require('../routes/pc/photograhper'); //摄影师列表
var photograhper_detail_pc = require('../routes/pc/photograhper_detail'); //摄影师详情
var package_pc = require('../routes/pc/package'); //套餐
var buyer_pc = require('../routes/pc/buyer'); //用户
//mobile
var index_mb = require('../routes/index');
var sort_mb = require('../routes/sort');
var photographer_mb = require('../routes/mobile/photographer');
//api
var apiUsers = require('../routes/api/users');
var apiAlbums = require('../routes/api/albums');
var apiPhotographer = require('../routes/api/photographer');

//admin
var admin = require('../routes/admin/admin');
var login = require('../routes/admin/login');
var register = require('../routes/admin/register');
var intention = require('../routes/admin/intention');

module.exports = function (app) {
    //pc
/*    app.use(function(req,res,next){
        if (!req.session.userId) {
            app.authorize=false;
            req.session.userId = {};
        }else{
           // app.authorize=res.session.userId;
        }
        console.log('----------------'+JSON.stringify(req.session.userId));
        next();
    });*/
    app.use('/',index_pc );
    app.use('/app',app_pc );
    app.use('/autumn',autumn_pc );
    app.use('/photoframes',photoframes_pc );
    app.use('/photograhper',photograhper_pc );
    app.use('/photograhperDetail',photograhper_detail_pc );
    app.use('/buyer',authorize,buyer_pc );
    app.use('/package',package_pc );
    app.use('/wd',wd_pc );

    //mobile
    app.use('/pc', index_mb);
    app.use('/pc/sort', sort_mb);
    app.use('/pc/photographer', photographer_mb);

    //api
    app.use('/api', apiUsers);
    app.use('/api/albums', apiAlbums);


    //admin
    app.use('/admin', admin);
    app.use('/login', login);
    app.use('/register', register);
   app.use('/intention', intention);









    function authorize(req,res,next){
        if (!req.session.userId) {
            app.locals.loginInfo=false;
            res.redirect('/login');
        } else {
            app.locals.loginInfo=req.session.userId;
            next();
        }
    }

};



