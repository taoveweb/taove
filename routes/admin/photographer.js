/**
 * Created by Administrator on 2015/12/21 0021.
 */
var formidable = require('formidable');
var crypto=require('crypto');
var fs = require('fs');
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;


function getPhotographer(req, res, next) {
   /* var match={};
    match.phone=parseInt(req.session.userId['phone']);
    console.log(match);
    Taove.aggregate(
        {$match: match},
        {
            $project: {
                approved:1,
                realName:{ $concat: [ { $substr: [ "$realName", 0, 3 ] }, "***"] },
                email:{ $concat: [ { $substr: [ "$email", 0, 2 ] }, "**" ,{ $substr: [ "$email", 5, -1 ] }] },
                phone:1,
                fromTime:1,
                singed:1,
                city:1,
                selfIntroduction:1,
                makeuperIntroduction:1,
                goodStyle:1,
                credentialsPhotoUrl:1
            }
        }
    ).exec(function(err,doc){
            console.log(err,doc);
        });*/

    Taove.findOne({phone: req.session.userId['phone']}, function (err, taove) {

        var crypto = require('crypto');
        var cipher = crypto.createCipher('aes-256-cbc','InmbuvP6Z8');
        var text = "123|123123123123123";
        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        var decipher = crypto.createDecipher('aes-256-cbc','InmbuvP6Z8');
        var dec = decipher.update(crypted,'hex','utf8');
        dec += decipher.final('utf8');

        console.log(dec,crypted);



        var crypto = require('crypto');
        var fs = require('fs');
        var pem = fs.readFileSync('server.key');
        var key = pem.toString('ascii');
        var plaintext = new Buffer('abcdefghijklmnopqrstuv');
        var encrypted = "";
        var cipher = crypto.createCipher('blowfish', key);
        encrypted += cipher.update(plaintext, 'binary', 'hex');
        encrypted += cipher.final('hex');
        var decrypted = "";
        var decipher = crypto.createDecipher('blowfish', key);
        decrypted += decipher.update(encrypted, 'hex', 'binary');
        decrypted += decipher.final('binary');
        var output = new Buffer(decrypted);
        console.log('aaaaa--------------');
        console.log(encrypted);
        console.log(decrypted);






        var realName=taove.realName;
        if(realName){
            realName=realName.substr(0,1)+"*"+realName.substr(-1,1);
        }
        var email=taove.email;
        if(email){
            var emailIndex=email.indexOf('@');
            email=email.substr(0,2)+"***"+email.substr(emailIndex);
        }

        var phone=taove.phone+'';
        var doc={
            approved:taove.approved,
            "realName":realName,
            "email":email,
            "phone":phone.substr(0,7)+"***"+phone.substr(-1,1),
            fromTime:taove.fromTime,
            singed:taove.singed,
            city:taove.city,
            selfIntroduction:taove.selfIntroduction,
            makeuperIntroduction:taove.makeuperIntroduction,
            goodStyle:taove.goodStyle,
            credentialsPhotoUrl:taove.credentialsPhotoUrl,
            application:taove.application
        };
        if (doc.application && !req.query.fix) {
            res.render('admin/photographer',
                {
                    title: '摄影师申请入驻',
                    "taove": doc,
                    application: 1,
                    layout: 'layout_pc'
                })
        } else {
            res.render('admin/photographer',
                {
                    title: '摄影师申请入驻',
                    "taove": doc,
                    application: 0,
                    layout: 'layout_pc'
                })
        }
    });

}
function postPhotographer(req, res, next) {
    console.log('postAlbum------------');

    if (!req.body.fromTime) {
        console.log('img');
        updateCredentialsPhotoUrl(req, res, next);
    } else {
        console.log('info');
        update(req, res)
    }


    // res.render('admin/photographer', { title: '摄影师申请入驻',layout:'layout_pc' });
}


//证件照
function updateCredentialsPhotoUrl(req, res, next) {
    var form = new formidable.IncomingForm();
    var dir = "./uploads/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
    if (fs.existsSync(dir)) {
        console.log('已经创建过此更新目录了');
    } else {
        fs.mkdirSync(dir);
    }

    form.uploadDir = dir;
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, function (err, fields, files) {
        var param = fields;
        var img = files.img;
        var imgname = new ObjectId();
        var ext = '';
        if (isValidFileName(files.qqfile.path)) {
            ext = getExt(files.qqfile.path);
        } else {
            // 错误处理
        }
        imgname += "." + ext;
        fs.renameSync(files.qqfile.path, dir + imgname);
        Taove.findOneAndUpdate(
            {phone: req.session.userId['phone']},
            {
                credentialsPhotoUrl: "/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/' + imgname
                //updated: new Date(new Date().getTime() + 60 * 60 * 8 * 1000)
            },
            function (err, doc) {
                console.log(err);
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: '提交图片失败'
                    });
                } else {
                    console.log('提交图片成功');
                    res.json({
                        success: true,
                        msg: '提交图片成功'
                    });
                }
            })

        //update(req)
    });
}


function update(req, res) {
    console.log(req.body.fromTime);

    Taove.update({phone: req.session.userId['phone']},
        {
            realName: req.body.realName,
            email: req.body.email,
            fromTime: req.body.fromTime,
            singed: req.body.singed,
            city: req.body.city,
            selfIntroduction: req.body.selfIntroduction,
            makeuperIntroduction: req.body.makeuperIntroduction,
            goodStyle: req.body.goodStyle,
            application: true
            //updated: new Date(new Date().getTime() + 60 * 60 * 8 * 1000)
        }, function (err, doc) {

            if (err) {
                console.log(err)
            } else {
                console.log('申请提交成功');
                res.json({
                    ok: 1,
                    success: true,
                    msg: '申请提交成功'
                });
            }
        })
}


function getExt(filename) {
    var split = filename.split('.');
    return split[split.length - 1];
}
function isValidFileName(filename) {
    var split = filename.split('.');
    if (split.length < 2) {
        return false;
    }
    return true;
}


module.exports = {
    get: getPhotographer,
    post: postPhotographer
};



