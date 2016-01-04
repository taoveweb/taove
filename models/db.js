var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR=10;
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





//账单
var pay=new Schema({
    payMony:Number,
    createdOn:{type: Date, default: new Date().getTime()+60*60*8*1000}//创建时间
});

//消息
var message=new Schema({
    fromId:ObjectId,
    title:String,
    comtent:String,
    createdOn:{type: Date, default: new Date().getTime()+60*60*8*1000} //创建时间
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
    desgin:String, //产品规格
    createdOn:{type: Date, default: new Date().getTime()+60*60*8*1000} //创建时间
});

//我的购买的商品
var myshop=new Schema({
    showid: ObjectId,//shopid
    getPrice:Number,//购买的价格
    num: Number, //购买数量
    createdOn:{type: Date, default: new Date().getTime()+60*60*8*1000} //创建时间
});

//相册图片
var imgSchema = new Schema({
    path: {type: String, trim: true, required: true},//目录名
    name: {type: String, trim: true, required: true},//文件名与图片名称一样
    title: {type: String, trim: true},//相册标题
    description: {type: String, trim: true},//描述
    likes: [{type: ObjectId}],//user id
    watches: [{type: ObjectId}],//user id
    master: {type: Boolean, default: false},//封面
    createdOn:{type: Date, default: new Date().getTime()+60*60*8*1000}, //创建时间
    imgType:{type:Number},//图片类型 0为未修 1为精修 3相册封面 4x展架
    comment: [{
        userId: ObjectId,//user id
        time: {type: Date, default: Date.now()}, //
        text: {type: String, trim: true, max: 2000}
    }]
});

//相册
var AlbumsSchema = new Schema({
    photographyId:String,//摄影师Id
    customerId: ObjectId,//用户id
    title: {type: String, trim: true, required: true},//相册标题
    description: {type: String, trim: true, required: true},//描述
    city: {type: String, trim: true, required: true},//地区
    style: {type: String, trim: true, required: true},//风格
    img: [imgSchema],//图片信息
    createdOn:{type: Date, default: new Date().getTime()+60*60*8*1000}, //创建时间
    updated:{type: Date, default: Date.now()}, //更新时间
    package: {type: String, trim: true},//套餐
    approved: {type: Boolean, default: false}
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
    lastLogin: {type: Date, default: new Date()},//最后登录时间
    updated: {type: Date, default: new Date()},//更新日期
    createdOn: {type: Date, default: new Date()},//创建时间
    userAlbumsid:[Schema.Types.Mixed],//用户摄影相册  TaoveSchemaId_photographyerAlbumsId
    "pay":[pay],//账单
    "posts":[posts],//提交的评论、喜欢
    "myshop":[myshop],//商品
    "message": [message]//消息
});


//主表预处理------------------------------------
TaoveSchema.pre('save',function(next){
    var user=this;
    if(this.isNew){
        this.updated=this.createdOn=this.lastLogin=new Date().getTime()+60*60*8*1000
        bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })
        });
    }else{
        this.updated=new Date().getTime()+60*60*8*1000
        next();
    }
});


TaoveSchema.pre('update',function(next){
    this.update({},{ $set: { updated: new Date().getTime()+60*60*8*1000} });
    next();
});
TaoveSchema.methods.comparepassword=function(_password,cb){
    bcrypt.compare(_password,this.password,function(err,isMatch){
        cb(err,isMatch);
    })
};

//相册预处理----------------------------------------------
AlbumsSchema.pre('save',function(next){
    var user=this;
    if(this.isNew){
        this.updated=this.createdOn=new Date().getTime()+60*60*8*1000
    }else{
        this.updated=new Date().getTime()+60*60*8*1000
    }
    next();
});
AlbumsSchema.pre('update',function(next){
    this.update({},{ $set: { updated: new Date().getTime()+60*60*8*1000} });
    next();
});








var Taove = mongoose.model('Taove', TaoveSchema);
var Albums = mongoose.model('Albums', AlbumsSchema);

module.exports ={
    "ObjectId": mongoose.Types.ObjectId,
    "Taove":Taove,
    'Albums':Albums
};


