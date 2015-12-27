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

//mobile
var index_mb = require('../routes/index');
var sort_mb = require('../routes/sort');
var photographer_mb = require('../routes/mobile/photographer');
//api
var api = require('../routes/api/api');
var apiLogin = require('../routes/api/login');

//admin
var admin = require('../routes/admin/admin'); //用户
var login = require('../routes/admin/login');
var register = require('../routes/admin/register');
var intention = require('../routes/admin/intention');

module.exports = function (app) {

    //api
    app.use('/api',function(req,res,next){
        console.log(req.session.apiid);
        if(req.session.apiid){
            next();
        }else{
            res.redirect('/apiLogin');
        }

    }, api);
    app.use('/apiLogin',apiLogin);


    app.use(islogin);
    app.use('/', index_pc);
    app.use('/app', app_pc);
    app.use('/autumn', autumn_pc);
    app.use('/photoframes', photoframes_pc);
    app.use('/photograhper', photograhper_pc);
    app.use('/photograhperDetail', photograhper_detail_pc);
    app.use('/package', package_pc);
    app.use('/wd', wd_pc);

    //pc
    app.use('/pc', index_mb);
    app.use('/pc/sort', sort_mb);
    app.use('/pc/photographer', photographer_mb);



    //admin
    app.use('/admin', authorize, admin);
   // app.use('/admin',  admin);
    app.use('/login', login);
    app.use('/register', register);
    app.use('/intention', intention);
    app.get('/loginOut', loginOut);


    function loginOut(req, res, next) {
        req.session.cookie.maxAge = 0;
        delete res.locals.loginInfo ;
        res.redirect('/login');
    }

    function islogin(req, res, next) {
        if (!req.session.userId) {
            res.locals.loginInfo = false;
        } else {
            res.locals.loginInfo = req.session.userId;
        }
        next();
    }

    function authorize(req, res, next) {
        if (!req.session.userId) {
            res.locals.loginInfo = false;
            res.redirect('/login');
        } else {
            res.locals.loginInfo = req.session.userId;
            next();
        }
    }




};



