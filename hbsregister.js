/**
 * Created by kiiekin on 15/12/27.
 */
var fs = require('fs');
var blocks = {};
module.exports=function(hbs){

    hbs.registerPartials(__dirname + '/views/partials');
    hbs.registerHelper('extend', function (name, context) {
        var block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }
        block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
    });
    hbs.registerHelper('block', function (name) {
        var val = (blocks[name] || []).join('\n');
        blocks[name] = [];
        return val;
    });


    hbs.registerHelper('getHeight', function (height,width,v3,options) {
        var val = height*(v3/width);
        return parseInt(val);
    });

    hbs.registerHelper('reNameImg', function (imgName,options) {
        if(!imgName) return false;
        var val = imgName.split('.');
        var result=val[0]+"_1080"+'.'+val[1];
        return result;
    });

    hbs.registerHelper('getImg', function (width,height,setWidth,imgPath,imgName,options) {
        if(!imgName) return false;
        var val = imgName.split('.');
        var w=width;
        var h=height;
        var src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        var original=imgPath+imgName;
        if(setWidth<width){
            original=imgPath+val[0]+"_"+setWidth+'.'+val[1];
            w=setWidth;
            h=parseInt(height*(setWidth/width));
        }

        if(setWidth==266){
            original=imgPath+imgName;
            w=setWidth;
        }
        var img= '<img width="'+w+'" height="'+h+'" src="'+src+'" data-original="/'+original+'" />'
        return img;
    });

    hbs.registerHelper('getImgM', function (width,height,sizeLevel,imgPath,imgName,options) {
        if(!imgName) return false;
        var val = imgName.split('.');
        var w=width;
        var h=height;
        var src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        var original=imgPath+imgName;
        var setWidth=0;
        switch(sizeLevel){
            case 2:
                setWidth=640;
                break;
            case 3:
                setWidth=1080;
                break;
        }
        if(setWidth<width){
            original=imgPath+val[0]+"_"+setWidth+'.'+val[1];
            w=setWidth;
            h=parseInt(height*(setWidth/width));
        }
        var img= '<img style="width:'+w+'px; height:'+h+'px;" src="'+src+'" data-src="/'+original+'"   class="swiper-lazy" />'
        return img;
    });


    hbs.registerHelper("ifCond",function(v1,operator,v2,options) {
        switch (operator)
        {
            case "==":
                return (v1==v2)?options.fn(this):options.inverse(this);

            case "!=":
                return (v1!=v2)?options.fn(this):options.inverse(this);

            case "===":
                return (v1===v2)?options.fn(this):options.inverse(this);

            case "!==":
                return (v1!==v2)?options.fn(this):options.inverse(this);

            case "&&":
                return (v1&&v2)?options.fn(this):options.inverse(this);

            case "||":
                return (v1||v2)?options.fn(this):options.inverse(this);

            case "<":
                return (v1<v2)?options.fn(this):options.inverse(this);

            case "<=":
                return (v1<=v2)?options.fn(this):options.inverse(this);

            case ">":
                return (v1>v2)?options.fn(this):options.inverse(this);

            case ">=":
                return (v1>=v2)?options.fn(this):options.inverse(this);

            default:
                return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
        }
    });



};