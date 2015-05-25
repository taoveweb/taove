/**
 * Created by Administrator on 2015/5/25.
 */
//web
var index = require('../routes/index');
var sort = require('../routes/sort');
var photographer = require('../routes/photographer');
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
    //web
    app.use('/', index);
    app.use('/sort', sort);
    app.use('/photographer', photographer);

    //api
    app.use('/api', apiAlbums);
    app.use('/api/users', apiUsers);
    app.use('/api/photographer', apiPhotographer);

    //admin
    app.use('/admin/', admin);
    app.use('/admin/login', login);
    app.use('/admin/register', register);
    app.use('/admin/intention', intention);

};

