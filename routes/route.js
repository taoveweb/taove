/**
 * Created by Administrator on 2015/5/25.
 */
var index = require('../routes/index');
//api
var users = require('../routes/api/users');
var albums = require('../routes/api/albums');
var photographer = require('../routes/api/photographer');

//admin
var admin = require('../routes/admin/admin');
var login = require('../routes/admin/login');
var register = require('../routes/admin/register');
var intention = require('../routes/admin/intention');

module.exports = function (app) {

    app.use('/', index);

    //api
    app.use('/api', albums);
    app.use('/api/users', users);
    app.use('/api/photographer', photographer);

    //admin
    app.use('/admin/', admin);
    app.use('/admin/login', login);
    app.use('/admin/register', register);
    app.use('/admin/intention', intention);

};

