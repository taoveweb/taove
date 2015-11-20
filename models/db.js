/**
 * Created by Administrator on 2015/4/25aaaaa.
 */


var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/test';
var dbOptions = {'user': 'db_username', 'pass': 'db_password'};
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
mongoose.connect(dbURI);

mongoose.connection.on('error', function (err) {
    console.log(err);
});

mongoose.connection.on('open', function (err) {
    console.log(err);
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('SIGINT', function () {
    db.close(function () {
        console.log('Mongoose disconnected through mobile termination');
        process.exit(0);
    });
});


//用户
var userSchema = new Schema({
    name: {type: String, trim: true, required: true},//
    phone: {type: Number, trim: true, required: true},//13621214703
    password: {type: String, required: true, trim: true},//
    email: {type: String, trim: true},//taoveweb@gmail.com
    pohotoUrl: {type: String, trim: true},
    message: String,//
    intention: Schema.Types.Mixed,//{package:'A',budget:'1500~4000',time:'201504'}
    Photographer: {type: ObjectId,ref: 'photographerSchema' },//photographer_id
    createdOn: {type: Date, default: Date.now()},
    posts:{
        likes:[Schema.Types.Mixed],
        watches: [Schema.Types.Mixed],
        comments:[Schema.Types.Mixed]
    },
    updated: Date,
    approved: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    lastLogin: Date
});
var User = mongoose.model('User', userSchema);
exports.User = User;


//摄影师


cfg = { _id:'setD', members:[
    { _id:0, host:'127.0.0.1:27017' },
    { _id:1, host:'127.0.0.1:27018' },
    { _id:2, host:'127.0.0.1:27019' }
]};

var photographerSchema = new Schema({
    realName: {type: String, trim: true, required: true},//
    phone: {type: Number, required: true},//13621214703
    email: {type: String, unique: true, required: true, trim: true},//taoveweb@gmail.com
    fromTime: {type: Number, trim: true, required: true},//20150202
    selfIntroduction: {type: String, trim: true, required: true},//
    goodStyle: {type: String, trim: true, required: true},//
    pohotoUrl: {type: String, trim: true, required: true},//
    credentialsPhotoUrl: String,// 证件照 '
    city: String,//
    makeuperIntroduction: String,//化妆师
    hot: Number,//
    albums: [{type: ObjectId, ref: 'albumsSchema'}],
    createdOn: {type: Date, default: Date.now()},
    updated: Date
});
var Photographer = mongoose.model('Photographer', photographerSchema);
exports.photographer = Photographer;


//相册图片
var imgSchema = new Schema({
    path: {type: String, trim: true, required: true},
    name: {type: String, trim: true, required: true},
    likes: [{type: ObjectId,ref: 'User' }],
    watches: [{type: ObjectId, ref: 'User' }],
    comment: [{
        user: {
            id: {
                type: ObjectId,
                ref: 'User'
            },
            name: String
        },
        time: {type: Date, default: Date.now()}, //
        text: {type: String, trim: true, max: 2000}
    }]
});
var albumsSchema = new Schema({
    albumsTitle: {type: String, trim: true, required: true},//相册主题
    photographer: {type: Schema.Types.Mixed, trim: true, required: true},//{name:'摄影师名称',id:photographer_id}
    package: {type: String, trim: true, required: true},//套餐
    description: {type: String, trim: true, required: true},//描述
    area: {type: String, trim: true, required: true},//地区
    style: {type: String, trim: true, required: true},//风格
    img: [imgSchema],
    watches: [{type: ObjectId,ref: 'User'}],
    customer: {type: String, trim: true, required: true},// {buyer:user_id}
    createdBy: String,//
    createOn: {type: Date, default: Date.now()},//
    updated: Date,
    approved: {type: Boolean, default: false}
});

albumsSchema.pre("save", function (next) {
    if (!this.isModified('updated')) this.updated = new Date;
    console.log("updated-----------------------");
    console.log(this.updated);
    next();
});

var Albums = mongoose.model('Albums', albumsSchema);
exports.Albums = Albums;
module.exports.ObjectId = mongoose.Types.ObjectId;



