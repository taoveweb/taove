/**
 * Created by Administrator on 2015/5/25.
 */

//pc
var index_pc = require('../routes/pc/index');
var app_pc = require('../routes/pc/app');
//mobile
var index_mb = require('../routes/index');
var sort_mb = require('../routes/sort');
var photographer_mb = require('../routes/photographer');
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
    app.use('/app',index_app );
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

