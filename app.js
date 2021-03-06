var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var minify = require('express-minify');
var fs = require('fs');
var hbs = require('hbs');
var helpers = require('handlebars-helpers');
var minifyHTML  = require('express-minify-html');
var compression = require('compression');
global.__baseDir = __dirname;


var app = express();
app.locals.imgStatic = '/';
app.locals.jsStatic = '/';
app.locals.cssStatic = '/';
app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(function(req,res,next){
    app.locals.static=req.protocol+"://"+req.headers['host']+'/';
    next();
});


//??hbs??
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseInlineTagWhitespace:true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true,
        minifyCSS:true
    }
}));
helpers.register(hbs, {});
require('./hbsregister')(hbs);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
/*app.use(function(req, res, next){
    var reqData = [];
    var size = 0;
    req.on('data', function (data) {
        console.log('>>>req on');
        reqData.push(data);
        size += data.length;
    });
    req.on('end', function () {
        req.reqData = Buffer.concat(reqData, size).toString();
        console.log(req.reqData)
    });
    next();
});*/
app.use(compression({level:9}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    rolling: true,
    cookie: {maxAge: 1000 * 60 * 30},
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://taove:taove@localhost/test'
    })
}));
app.use(cookieParser());
app.use(minify());

app.use(express.static(path.join(__dirname, 'public')));
//app.use(processImage({root:path.join(__dirname, 'uploads')}));
app.use(express.static(path.join(__dirname, 'uploads')));




require('./routes/route')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err)
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to buyer
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('404', {
        layout:null,
        message: err.message,
        error: {}
    });
});


module.exports = app;
