/**
 * Created by Administrator on 2015/5/25.
 */

//pc
var index_pc = require('../routes/pc/index');
var app_pc = require('../routes/pc/app');
var autumn_pc = require('../routes/pc/autumn');//秋季特惠
var photoframes_pc = require('../routes/pc/photoframes');//婚件产品
var login_pc = require('../routes/pc/login');//登录
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
    app.use('/',index_pc );
    app.use('/mobile',app_pc );
    app.use('/autumn',autumn_pc );
    app.use('/photoframes',photoframes_pc );
    app.use('/photograhper',photograhper_pc );
    app.use('/photograhperDetail',photograhper_detail_pc );
    app.use('/buyer',buyer_pc );
    app.use('/package',package_pc );
    app.use('/login',login_pc );
    app.use('/wd',wd_pc );
    //mobile
    app.use('/pc', index_mb);
    app.use('/pc/sort', sort_mb);
    app.use('/pc/photographer', photographer_mb);

    //api
    app.use('/api', apiAlbums);
    app.use('/api/users', apiUsers);
    app.use('/api/photographer', apiPhotographer);

    //admin
    app.use('/admin', admin);
    app.use('/admin/login', login);
    app.use('/admin/register', register);
    app.use('/admin/intention', intention);

};

