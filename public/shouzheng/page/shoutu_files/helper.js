// 弹窗
var showConfirm = function(message, callback) {
    if (message.length === 0) {
        alert('showConfirm no');
    }
    var $dialog = $('#weui_dialog_confirm');
    $dialog.find('.weui_dialog_bd').html(message[0]);
    if (message.length > 1) {
        $dialog.find('.weui_dialog_title').html(message[1]);
    } else {
        $dialog.find('.weui_dialog_title').html('温馨提醒');
    }
    $dialog.show();
    $('.ok-btn', $dialog).off('click').on('click', function(e) {
        e.stopPropagation();
        if (callback != undefined) {
            callback();
        }
        $dialog.hide();
    });
    $('.close-btn', $dialog).off('click').on('click', function(e) {
        e.stopPropagation();
        $dialog.hide();
    });
};
var showAlert = function(message, callback) {
    if (message.length === 0) {
        alert('showConfirm no');
    }
    var $dialog = $('#weui_dialog_alert');
    $dialog.find('.weui_dialog_bd').html(message[0]);
    if (message.length > 1) {
        $dialog.find('.weui_dialog_title').html(message[1]);
    } else {
        $dialog.find('.weui_dialog_title').html('提示');
    }
    $dialog.show();
    $('.ok-btn', $dialog).on('click', function() {
        if (callback != undefined) {
            callback();
        }
        $dialog.hide();
    });
    $('.close-btn', $dialog).on('click', function() {
        $dialog.hide();
    });
};
var showLoading = function(message) {
    if (message.length === 0) {
        alert('showConfirm no');
    }

    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') {
        return;
    }
    $loadingToast.find('.weui_toast_content').html(message);
    $loadingToast.show();
};
var hideLoading = function() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') == 'none') {
        return;
    }
    $loadingToast.hide();
};
var toast = function(message, callback, time) {
    var $toast = $('#toast');
    if ($toast.css('display') != 'none') {
        return;
    }
    $toast.find('.weui_toast_content').html(message);
    $toast.show();
    if (!time) {
        time = 1000;
    }
    setTimeout(function() {
        $toast.hide();
        if (callback != undefined) {
            callback();
        }
    }, time);
};

// 与小助手交互
var callAide = function(uri, success_cb, error_cb) {
    $.ajax({
        url: "http://127.0.0.1:8082/" + uri,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: "callback",
        success: function(res) {
            if (success_cb)
                success_cb(res);
        },
        error: function(res) {
            if (error_cb)
                error_cb(res);
        }
    });
}

// ajax请求
var ajax = function(url, data, cb, loadingMessage) {
    if (loadingMessage) {
        showLoading(loadingMessage);
    } else {
        showLoading('页面加载中...');
    }
    $.ajax({
        type: "get",
        async: false,
        url: url,
        dataType: "jsonp",
        data: data,
        jsonp: "callback", //服务端用于接收callback调用的function名的参数
        jsonpCallback: "success_jsonpCallback" + (new Date()).valueOf(), //callback的function名称
        success: function(res) {
            hideLoading();
            cb(res);
        },
        error: function() {
            hideLoading();
            // showAlert(['出错了...']);
        }
    });
}

// 获取当地时间
function getLocalTime(nS, format) {
    Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
    if (!format) {
        format = 'yyyy-MM-dd';
    }
    return new Date(parseInt(nS) * 1000).format(format);
}

/**
 * 获取图片路径
 */
function getImgSrc(uri) {
    if (!uri) {
        return '/static/img/default_avatar.jpg';
    }

    if (uri.indexOf('http') > -1 || uri.indexOf('static') > -1) {
        return uri;
    }

    return img_domain + uri;
}

/**
 * 是否在微信浏览器
 */
function is_inwechat() {
    var ua = window.navigator.userAgent.toLowerCase();
    //if (ua.match(/micromessenger/i) == 'micromessenger') {
    if (!ua.match(/safari/i)) {
        return true;
    }
    return false;
}

function getTargetTime(t) {
    var d = t.split(" ")[0],
        h = t.split(" ")[1],
        date = new Date()

    date.setYear(d.split("-")[0])
    date.setMonth(d.split("-")[1] - 1)
    date.setDate(d.split("-")[2])

    date.setHours(h.split(":")[0])
    date.setMinutes(h.split(":")[1])
    date.setSeconds(h.split(":")[2])

    return date.getTime()
}
