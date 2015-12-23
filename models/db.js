var mongoose = require('mongoose');
var dbURI = 'mongodb://taove:taove@localhost/test';
var dbOptions = {'user': 'taove', 'pass': 'taove'};
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
    name: {type: String, trim: true, required: true},//文件名与图片名称一样
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
var photographyerAlbums = new Schema({
    photographyId:String,//摄影师Id
    title: {type: String, trim: true, required: true},//title
    description: {type: String, trim: true, required: true},//描述
    city: {type: String, trim: true, required: true},//地区
    style: {type: String, trim: true, required: true},//风格
    img: [imgSchema],//图片信息
    customer: ObjectId,// {buyer:user_id}//用户id
    createdBy: String,//谁提交的
    createOn: {type: Date, default: Date.now()},//创建时间
    updated: Date,
    package: {type: String, trim: true, required: true},//套餐
    approved: {type: Boolean, default: false}
});
//账单
var pay=new Schema({
    payMony:Number,
    createdOn:{type: Date, default: Date.now()}//创建时间
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

//产品物件
var shops=new Schema({
    name: String,//imgName
    photoUrl:String,//链接
    price:Number,//价格
    saled:Number,//已销售
    desgin:String //产品规格

});

//我的购买的商品
var myshop=new Schema({
    showid: ObjectId,//shopid
    getPrice:Number,//购买的价格
    num: Number //购买数量
});


//主表
var TaoveSchema = new Schema({
    nikeName: {type: String, trim: true},//昵称
    realName: {type: String, trim: true},//真实姓名
    phone: {type: Number, trim: true, required: true},//13621214703
    password: {type: String, required: true, trim: true},//
    email: {type: String, trim: true},//taoveweb@gmail.com
    pohotoUrl: {type: String, trim: true}, //userpicture
    city: String,//城市
    admin: {type: Boolean, default: false},//管理员 用户
    approved: {type: Boolean, default: false},//核准  摄影师资格
    banned: {type: Boolean, default: false},//禁止 摄影师状态
    application: {type: Boolean, default: false},//禁止申请摄影状态 已申请和未申请
    credentialsPhotoUrl: String,// 证件照 '
    singed: String,// 签名
    makeuperIntroduction: String,//化妆师
    goodStyle: {type: String, trim: true},//擅长的样式
    selfIntroduction: {type: String, trim: true},//自我介绍
    fromTime: {type: String, trim: true},//20150202 从事时间
    intention: Schema.Types.Mixed,//{package:'A',budget:'1500~4000',time:'201504'}
    lastLogin: {type: Date, default: Date.now()},//最后登录时间
    updated: {type: Date, default: Date.now()},//更新日期
    createdOn: {type: Date, default: Date.now()},//创建时间
    userAlbumsid:[Schema.Types.Mixed],//用户摄影相册  TaoveSchemaId_photographyerAlbumsId
    "pay":[pay],//账单
    "posts":[posts],//提交的评论、喜欢
    "photographyerAlbums": [photographyerAlbums],//相册id
    "myshop":[myshop],//商品
    "message": [message]//消息
});
TaoveSchema.virtual('vcreatedOn').get(function () {
    console.log(moment(this.createdOn).format('YYYY-MM-DD'))
    return moment(this.createdOn).format('YYYY-MM-DD');
});
/*
TaoveSchema.post('update', function() {
    console.log('update')
    this.update({},{ $set: { updated: new Date() } });
});
TaoveSchema.post('save', function() {
    console.log('save')
    this.update({},{ $set: { updated: new Date() } });
});
TaoveSchema.post('find', function() {
    console.log('find')
    this.update({},{ $set: { updated: new Date() } });
});
TaoveSchema.pre('update', function() {
    console.log('update')
    this.update({},{ $set: { updated: new Date() } });
});
TaoveSchema.pre('save', function() {
    console.log('save')
    this.update({},{ $set: { updated: new Date() } });
});
TaoveSchema.pre('find', function() {
    console.log('find')
    this.update({},{ $set: { updated: new Date() } });
});*/

var Taove = mongoose.model('Taove', TaoveSchema);

module.exports ={
    "ObjectId": mongoose.Types.ObjectId,
    "Taove":Taove
};


