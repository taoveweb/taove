/**
 * Created by Administrator on 2015/4/25aaaaa.
 */


var mongoose=require('mongoose');
var dbURI='mongodb://localhost/test';
var dbOptions = {'user':'db_username','pass':'db_password'};
var Schema=mongoose.Schema;
mongoose.connect(dbURI);

mongoose.connection.on('error',function(err){
    console.log(err);
});

mongoose.connection.on('open',function(err){
    console.log(err);
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
mongoose.connection.on('SIGINT', function() {
    db.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


//用户
var userSchema=new Schema({
    name:{type:String,trim:true,required: true},//
    password:{type: String,required: true,trim: true},//
    email:{type: String,required: true,trim: true},//taoveweb@gmail.com
    userPicture:{type: String,required: true,trim: true},
    photos:[Schema.Types.Mixed],//[{id:img_id,src:'photo/ymd/name.png',collect:Number,comment:Number}]
    message:String,//
    collect:[Schema.Types.Mixed],//[{id:img_id,src:'photo/ymd/name.png',collect:collect_id,comment:comment_id,createdOn:Date.now()}]
    intention:Schema.Types.Mixed,//{package:'A',budget:'1500~4000',time:'201504'}
    isPhotographer:{type: Boolean,default: false},//photographer_id
    phone:Number,//13621214703
    createdOn:{type:Date,default :Date.now()},
    modifiedOn:Date,
    lastLogin:Date
});
var User=mongoose.model('User',userSchema);
exports.user=User;



//摄影师
var photographerSchema=new Schema({
    realName:{type:String,trim:true,required: true},//
    phone:{type:Number,required: true},//13621214703
    email:{type:String,unique:true,required: true,trim: true},//taoveweb@gmail.com
    fromTime:{type:Number,trim:true,required: true},//20150202
    selfIntroduction:{type:String,trim:true,required: true},//
    goodStyle:{type:String,trim:true,required: true},//
    photographerPicture:{type:String,trim:true,required: true},//
    credentialsPhoto:String,// 'credentials/credentialsPhoto+Date.now().png'
    city:String,//
    makeuperIntroduction:String,//
    hot:Number,//
    albums:[],//id albums_id
/*    promise:Boolean,//*/
/*    collect:[Schema.Types.Mixed],//[{albumsId:albums_id,imgId:img_id,createdOn:Date.now()}]*/
    createdOn:{type:Date,default :Date.now()},
    modifiedOn:Date,
    lastLogin:Date
});
var Photographer=mongoose.model('Photographer',photographerSchema);
exports.photographer=Photographer;



//相册就是这样子的
var albumsSchema=new Schema({
    projectTitle:{type:String,trim:true,required: true},//相册主题
    photographer:{type:Schema.Types.Mixed,trim:true,required: true},//{name:'摄影师名称',id:photographer_id}
    package:{type:String,trim:true,required: true},//套餐
    description:{type:String,trim:true,required: true},//描述
    area:{type:String,trim:true,required: true},//地区
    island:{type: Boolean,default: false},//海岛屿风格
    style:{type:String,trim:true,required: true},//风格
    img:{type:Schema.Types.Mixed,trim:true,required: true},/*相片[
                                                {
                                                    id:objectId,
                                                    path:'photo/ymd/',
                                                    name:'name.png',
                                                    collect:collect_id,
                                                    comment:[{user:user_id,name:user_name,time:comment_time,content:comment_content}],
                                                    collectUser:[user_id]
                                               }
                                             ]
                               */
    createOn:{type:Date,default:Date().now},//
    modifiedOn:Date,//
    createdBy:String,//
    photoOn:Date,//
    customer:{type:String,trim:true,required: true}// {user:user_id}
});

var Albums=mongoose.model('Albums',albumsSchema);
exports.albums=Albums;



