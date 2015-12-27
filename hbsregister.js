/**
 * Created by kiiekin on 15/12/27.
 */
var fs = require('fs');
var blocks = {};
module.exports=function(hbs){
    hbs.registerPartial('left', fs.readFileSync(__dirname + '/views/admin/left.hbs', 'utf8'));//????
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
}