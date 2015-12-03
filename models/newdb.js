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
    path: {type: String, trim: true, required: true},//只存目录名
    name: {type: String, trim: true, required: true},//文件名
    likes: [{type: ObjectId}],
    watches: [{type: ObjectId}],
    master: {type: Boolean, default: false},//封面
    comment: [{
        user: {
            id: ObjectId,
            name: String
        },
        time: {type: Date, default: Date.now()}, //
        text: {type: String, trim: true, max: 2000}
    }]
});
var albumsSchema = new Schema({
    albumsTitle: {type: String, trim: true, required: true},//相册主题
    package: {type: String, trim: true, required: true},//套餐
    description: {type: String, trim: true, required: true},//描述
    area: {type: String, trim: true, required: true},//地区
    style: {type: String, trim: true, required: true},//风格
    img: [imgSchema],//图片信息
    watches: Number,//观看数量
    customer: ObjectId,// {buyer:user_id}//用户id
    createdBy: String,//
    createOn: {type: Date, default: Date.now()},//创建时间
    updated: Date,
    approved: {type: Boolean, default: false}
});

//用户
var userSchema = new Schema({
    nikeName: {type: String, trim: true, required: true},//
    realName: {type: String, trim: true, required: true},//
    phone: {type: Number, trim: true, required: true},//13621214703
    password: {type: String, required: true, trim: true},//
    email: {type: String, trim: true},//taoveweb@gmail.com
    pohotoUrl: {type: String, trim: true}, //userpicture
    message: String,//消息
    intention: Schema.Types.Mixed,//{package:'A',budget:'1500~4000',time:'201504'}
    Photography: [Schema.Types.Mixed],//photography
    albums: [albumsSchema],
    hot: Number,//
    city: String,//
    posts: {
        likes: [Schema.Types.Mixed],
        watches: [Schema.Types.Mixed],
        comments: [Schema.Types.Mixed]
    },
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
    lastLogin: Date
});


albumsSchema.pre("save", function (next) {
    if (!this.isModified('updated')) this.updated = new Date;
    next();
});


var User = mongoose.model('User', userSchema);
exports.User = User;

module.exports.ObjectId = mongoose.Types.ObjectId;



var user = new User({realName: 'huangjiajin'});
user.save(function (err, doc) {
    if (err) console.error(err);
    console.log(doc)
});

User.find(function (err, doc) {dsfas
    console.log(doc + 'aa')
});
