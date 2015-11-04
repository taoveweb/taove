/**
 * Created by Administrator on 2015/5/25.
 */

//pc
var index_pc = require('../routes/pc/index');
var app_pc = require('../routes/pc/app');
var wd_pc = require('../routes/pc/wd'); //结婚
//mobile
var index_mb = require('../routes/index');
var sort_mb = require('../routes/sort');
var photographer_mb = require('moblile/photographer');
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
    app.use('/app',app_pc );
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

