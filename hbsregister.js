/**
 * Created by kiiekin on 15/12/27.
 */
var fs = require('fs');
var blocks = {};
module.exports=function(hbs){
    hbs.registerPartial('ajax_albums_box', fs.readFileSync(__dirname + '/views/mobile/ajax_albums_box.hbs', 'utf8'));
    hbs.registerPartial('ajax_explorer_box', fs.readFileSync(__dirname + '/views/mobile/ajax_explorer_box.hbs', 'utf8'));
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
        var src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEX///+nxBvIAAAAAXRSTlMD2e+J3AAAAA1JREFUGNNjGAWDCgAAAZAAAXtlmk8AAAAASUVORK5CYII=";
        var original=imgPath+imgName;
        var setWidth='';
        switch(sizeLevel){
            case 2:
                setWidth='_640';
                break;
            case 3:
                setWidth='_1080';
                break;
        }
        original=imgPath+val[0]+setWidth+'.'+val[1];
       // var img= '<img style="width:'+w+'px; height:'+h+'px;" src="'+src+'" data-src="/'+original+'"   class="swiper-lazy" />'
        var img= '<img style="width:'+w+'px; height:'+h+'px;" src="'+src+'" data-src="/'+original+'"   class="lazy" />'
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