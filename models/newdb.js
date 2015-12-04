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


//相册图片
var imgSchema = new Schema({
    path: {type: String, trim: true, required: true},//目录名
    name: {type: String, trim: true, required: true},//文件名
    likes: [{type: ObjectId}],//user id
    watches: [{type: ObjectId}],//user id
    master: {type: Boolean, default: false},//封面
    comment: [{
        userId: ObjectId,//user id
        time: {type: Date, default: Date.now()}, //
        text: {type: String, trim: true, max: 2000}
    }]
});

//相册
var albumsSchema = new Schema({
    title: {type: String, trim: true, required: true},//相册主题
    package: {type: String, trim: true, required: true},//套餐
    description: {type: String, trim: true, required: true},//描述
    area: {type: String, trim: true, required: true},//地区
    style: {type: String, trim: true, required: true},//风格
    img: [imgSchema],//图片信息
    customer: ObjectId,// {buyer:user_id}//用户id
    createdBy: String,//
    createOn: {type: Date, default: Date.now()},//创建时间
    updated: Date,
    approved: {type: Boolean, default: false}
});
//账单
var pay=new Schema({
    payMony:Number,
    createdOn:Date
});

//消息
var message=new Schema({
    fromId:ObjectId,
    title:String,
    comtent:String,
    time:Date
});

//提交的评论、收藏=喜欢
var posts=new Schema({
    likes: [{type:String}],//imgName
    watches: [{type:String}],//imgName
    message:[message]
});

//主表
var TaoveSchema = new Schema({
    nikeName: {type: String, trim: true},//
    realName: {type: String, trim: true},//
    phone: {type: Number, trim: true, required: true},//13621214703
    password: {type: String, required: true, trim: true},//
    email: {type: String, trim: true},//taoveweb@gmail.com
    pohotoUrl: {type: String, trim: true}, //userpicture
    intention: Schema.Types.Mixed,//{package:'A',budget:'1500~4000',time:'201504'}
    photography: [Schema.Types.Mixed],//photography
    hot: Number,//
    city: String,//
    updated: Date,
    approved: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    credentialsPhotoUrl: String,// 证件照 '
    makeuperIntroduction: String,//化妆师
    goodStyle: {type: String, trim: true},//
    selfIntroduction: {type: String, trim: true},//
    fromTime: {type: Number, trim: true},//20150202
    createdOn: {type: Date, default: Date.now()},
    lastLogin: Date,
    pay:[pay],//账单
    posts:[posts],//提交的评论、收藏、喜欢
    albums: [albumsSchema],//相册
    message: [message]//消息
});


albumsSchema.pre("save", function (next) {
    if (!this.isModified('updated')) this.updated = new Date;
    next();
});


var Taove = mongoose.model('TaoveSchema', userSchema);
exports.Taove = Taove;

module.exports.ObjectId = mongoose.Types.ObjectId;

var taove = new Taove({realName: 'huangjiajin'});
taove.save(function (err, doc) {
    if (err) console.error(err);
    console.log(doc)
});

Taove.find(function (err, doc) {
    console.log(doc + 'aa')
});
