$('.b-b-b').on('tap', function () {
    $('.more-pop').toggleClass('active')
})

$('.more-pop .closemode').on('tap', function () {
    $('.more-pop').toggleClass('active');
})

$('.more-pop .self-mode').on('tap', function () {
    $('.self-set-pop').toggleClass('active');
})

$('.self-set-pop .closemode').on('tap', function () {
    $('.self-set-pop').toggleClass('active');
})


var nub = new Array(1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1);
var nub1 = new Array(1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75);
var mode = new Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],//全包
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],//单
    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],//双
    [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],//大
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],//小
    [10, 11, 12, 13, 14, 15, 16, 17],//中
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],//边
    [15, 17, 19, 21, 23, 25, 27],//大单
    [1, 3, 5, 7, 9, 11, 13],//小单
    [14, 16, 18, 20, 22, 24, 26],//大双
    [0, 2, 4, 6, 8, 10, 12],//小双
    [18, 19, 20, 21, 22, 23, 24, 25, 26, 27],//大边
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],//小边
    [1, 3, 5, 7, 9, 19, 21, 23, 25, 27],//单边
    [0, 2, 4, 6, 8, 18, 20, 22, 24, 26],//双边
    [0, 10, 20],//0尾
    [1, 11, 21],//1尾
    [2, 12, 22],//2尾
    [3, 13, 23],//3尾
    [4, 14, 24],//4尾
    [0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24],//小尾
    [5, 15, 25],//5尾
    [6, 16, 26],//6尾
    [7, 17, 27],//7尾
    [8, 18],//8尾
    [9, 19],//9尾
    [5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 25, 26, 27],//大尾
    [0, 3, 6, 9, 12, 15, 18, 21, 24, 27],//3余0
    [1, 4, 7, 10, 13, 16, 19, 22, 25],//3余1
    [2, 5, 8, 11, 14, 17, 20, 23, 26],//3余2
    [0, 4, 8, 12, 16, 20, 24],//4余0
    [1, 5, 9, 13, 17, 21, 25],//4余1
    [2, 6, 10, 14, 18, 22, 26],//4余2
    [3, 7, 11, 15, 19, 23, 27],//4余3
    [0, 5, 10, 15, 20, 25],//5余0
    [1, 6, 11, 16, 21, 26],//5余1
    [2, 7, 12, 17, 22, 27],//5余2
    [3, 8, 13, 18, 23],//5余3
    [4, 9, 14, 19, 24]//5余4
);


var maxnum = parseInt(10000000000000); // 最大投注额
var limit_msg = "投注上限" + maxnum + "黄豆，请重新投注！！";
$(document).ready(function () {
    //点击投注模式
    $(".mode_lottery").tap(function () {
        console.log('mode_lottery')
        var i = $(this).attr("attr");
        clear();
        /*$(this).removeClass('standard_bg1');
         $(this).addClass('standard_bg2');*/
        if (i) {
            setValue(i)
        }
        ;
        recount_coins();
    })

    //点击简易投注模式
    $(".mode_lottery1").click(function () {
        var i = $(this).attr("attr");
        clear();
        if (i) setValue(i);
        recount_coins();
    })

    //点击号码
    $('table').on('tap', '.num', function () {
        var This = $(this);
        This.parents('tr').find('input').addClass('selected');
        var index = parseInt($(this).html());
        This.parents('tr').find('input').val(nub[index]);
        recount_coins();
    })

    //点击反选按钮
    $(".fanxian").tap(function () {
        un_select();
    })
    //点击清除按钮
    $(".qingchu").tap(function () {
        clear();
    })

    $('.pei').on('tap', 'span', function () {
        var This = $(this);
        var peilv = This.attr('val');
        var input = This.parents('tr').find('input');
        var txt_value = $.trim(input.val()).replace(/,/gi, "");
        if (txt_value && !isNaN(txt_value)) {
            var new_value = Math.floor(txt_value * peilv);
            if (new_value > maxnum) {
                showmsg("1", limit_msg);
                return false;
            }
            input.val(number_format(new_value + ""));
        }
        recount_coins();
    });


    $(".touzhuclear").click(function () {
        clear();
    })
    //刷新赔率
    $(".refreshpeiv").click(function () {
        refresh_odds(lottery_id);
    });
    //上期投注-----------------------没有--------------------------no
    $(".touzhu1").eq(1).click(function () {
        last_lottery();
    })
    //点击整体的倍数
    $(".double_insert").tap(function () {
        var This = $(this);
        var peilv = parseFloat(This.attr('val'));
        if (peilv > 0) {
            setAllvalue(peilv);
            recount_coins();
        } else {//梭哈
            setSuoha(); //------------------------------------------还没看-------------------------no
        }

    });


    //输入投注数据
    // $('.table-select').on('keyup','input');
    // $("#panel").find("input[name='mdp_coin']").keyup(function () {
    $('.table-select').find('input[type="number"]').keyup(function () {
        console.log('keyup')
        var regex = /^[1-9]\d{0,}$/;
        var val = $(this).val();
        if (!regex.test(val)) {
            val = val.replace(/\D/g, '');
            $(this).val(val);
        }
        if (!regex.test(val)) {
            $(this).val(val.substring(1));
            recount_coins();
        } else {
            // $('#checkboxd' + val).attr("checked", true);
            $(this).parents('tr').find('input').addClass('selected');
            recount_coins();
        }

    }).blur(function () { //移开
        //console.log('blur')
        /* var i = $(this).attr('id').replace('txt', '');*/
        if ($(this).val() > maxnum) {
            showmsg("1", limit_msg);
            return false;
        }
        $(this).val(number_format($(this).val()));
        if ($(this).val()) {
            setSelectCss(this);
            /*$('#txt' + i).removeClass('input_modou_txt_null');
             $('#txt' + i).removeClass('input_modou_txt_sel');
             $('#txt' + i).addClass('input_modou_txt');*/
        } else {
            unsetSelectCss(this);
            /* $('#txt' + i).removeClass('input_modou_txt');
             $('#txt' + i).removeClass('input_modou_txt_sel');
             $('#txt' + i).addClass('input_modou_txt_null');*/
        }

    }).focus(function () {//选中
        console.log('focus')
        /* var i = $(this).attr('id').replace('txt', '');
         $('#txt' + i).removeClass('input_modou_txt_null');
         $('#txt' + i).removeClass('input_modou_txt');
         $('#txt' + i).addClass('input_modou_txt_sel');*/
        if ($(this).val().indexOf(",") > -1) {
            domvalue = $(this).val().replace(/,/gi, "");
            $(this).val(domvalue);
        } else {
        }

    });

    /* $("#use_leave_modou_num").keyup(function () {
     var regex = /^[1-9]\d{0,}$/;
     var val = $(this).val();
     if (!regex.test(val)) {
     val = val.replace(/\D/g, '');
     $(this).val(val);
     $('#used_leave_modou_num').val(val);
     }
     }).blur(function () { //移开
     if ($(this).val() > maxnum) {
     showmsg("1", limit_msg);
     cancel();
     return false;
     }
     $('#used_leave_modou_num').val($(this).val());
     $(this).val(number_format($(this).val()));
     }).focus(function () {//选中
     if ($(this).val().indexOf(",") > -1) {
     domvalue = $(this).val().replace(/,/gi, "");
     $(this).val(domvalue);
     $('#used_leave_modou_num').val(domvalue);
     }
     });*/
});

function setSelectCss(i) {
    $(i).parents('tr').find('input').addClass('selected');
    /* $('#click_number' + i).removeClass('no_left_bg');
     $('#click_number' + i).addClass('no_left_bg_02');
     $('#txt' + i).removeClass('input_modou_txt_null');
     $('#txt' + i).addClass('input_modou_txt');
     $('#clear_this_val' + i).removeClass('sack_02');
     $('#clear_this_val' + i).addClass('sack_03');
     $('#clear_this_val' + i).show();
     $('#peilv' + i).show();*/
    /* $('#checkboxd' + i).attr("checked", true);
     $('#checkboxd' + i).parent().parent().removeClass('across_par1_no');
     $('#checkboxd' + i).parent().parent().addClass('across_par1_bg1');*/

}

function unsetSelectCss(i) {
    $(i).parents('tr').find('input').removeClass('selected');
    /* $('#click_number' + i).removeClass('no_left_bg_02');
     $('#click_number' + i).addClass('no_left_bg');
     $('#txt' + i).removeClass('input_modou_txt');
     $('#txt' + i).addClass('input_modou_txt_null');
     $('#clear_this_val' + i).removeClass('sack_03');
     $('#clear_this_val' + i).addClass('sack_02');
     $('#clear_this_val' + i).hide();
     $('#peilv' + i).hide();
     $('#checkboxd' + i).attr("checked", false);
     $('#checkboxd' + i).parent().parent().removeClass('across_par1_bg1');
     $('#checkboxd' + i).parent().parent().addClass('across_par1_no');*/
}

//标准投注模式设定方法---------------------------------------------no
function setValue(num) {
    for (var i = 0; i < mode[num].length; i++) {
        var id_num = mode[num][i];
        var tr = $('.table-select').find('tr').eq(mode[num][i]);
        var input = tr.find('input');
        input.val(nub[id_num]);
        setSelectCss(input);
        if (!input.val()) {
            unsetSelectCss(input);
        }
        //var id_name = "#txt" + mode[num][i];
        /* if (!$(id_name).attr("readonly")) {
         $(id_name).val(nub[id_num]);
         setSelectCss(id_num);
         if (!$(id_name).val()) {
         unsetSelectCss(id_num);
         }
         } else {
         if (!$(id_name).val()) {
         unsetSelectCss(id_num);
         }
         }*/
    }
}

//清除方法
function clear() {
    $("input[type='number']").each(function () {
        $(this).removeClass('selected');
        $(this).val('');
    });
    recount_coins();
}

//数字加千分符号
function number_format(n) {
    re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
    return n.replace(re, "$1,");
}

//设置所有投注
function setAllvalue(peilv) {
    $("input[type='number']").each(function () {
        if ($(this).hasClass('selected')) {
            var txt_value = $.trim($(this).val()).replace(/,/gi, "");
            if (txt_value && !isNaN(txt_value)) {
                var new_value = Math.floor(txt_value * peilv);
                $(this).val(number_format(new_value + ""));
            }
        }
    });
}

//反选
function un_select() {
    $("input[type='number']").each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $(this).val('');
        } else {
            $(this).parents('tr').find('.num').trigger('tap');
        }

    });
    recount_coins();
}
// 上期投注
function last_lottery() {
    $.ajax({
        type: "get",
        url: "/Luck28/ajaxBuy?do=lastLottery&g28=" + g28,
        error: function () {
        },
        success: function (data, textStatus) {
            data && lottery_mode(data.split(","));
        }
    });
}
// 自定义模式
function personmode(id) {
    $.ajax({
        type: "get",
        url: "/Luck28/ajaxModel?do=detail&g28=" + g28 + "&model_id=" + id,
        error: function () {
        },
        success: function (data, textStatus) {
            //  set_lottery_val(data.split(","));
            lottery_mode(data.split(","));
        }
    });
}

// 刷新赔率
function refresh_odds(id) {
    $.ajax({
        type: "get",
        url: "/Luck28/ajaxBuy?do=odds&g28=" + g28 + "&Luck28Id=" + id,
        error: function () {
        },
        success: function (data, textStatus) {
            set_odds("", data.split(",")); //当前赔率
        }
    });
}

//页面载入时执行
function set_lottery_val(arr, flag) {
    if (left_time_out == "-1") {
        showmsg("1", "该期已经截止投注！", last_issue_id);
        return false;
    }
    else if (is_clear_mdp == "1") {

    }
    // clear();
    $.each(arr,
        function (i) {
            if (this != "" && this != 0) {
                if ($("#txt" + i).attr("readonly")) {
                    unsetSelectCss(i);
                    return;
                }
                if (flag) {
                    unsetSelectCss(i);
                    $("#checkboxd" + i).attr("disabled", true);
                    $("#txt" + i).attr("readonly", true).attr("disabled", true);
                    $('#click_number' + i).removeClass('no_left_bg');
                    $('#click_number' + i).addClass('no_left_bg_02');
                } else {
                    setSelectCss(i);
                    $("#checkboxd" + i).attr("checked", true);
                }
                $("#txt" + i).val(number_format(this));
            } else {
                unsetSelectCss(i);
            }
        });
    recount_coins();
}

//自定义投注模式
function lottery_mode(arr, flag) {
    if (left_time_out == "-1") {
        showmsg("1", "该期已经截止投注！", last_issue_id);
        return false;
    }
    clear();
    $.each(arr,
        function (i) {
            if (this != "" && this != 0) {
                if ($("#txt" + i).attr("readonly")) {
                    unsetSelectCss(i);
                    return;
                }
                if (flag) {
                    unsetSelectCss(i);
                    $("#checkboxd" + i).attr("disabled", true);
                    $("#txt" + i).attr("readonly", true).attr("disabled", true);
                    $('#click_number' + i).removeClass('no_left_bg');
                    $('#click_number' + i).addClass('no_left_bg_02');
                } else {
                    setSelectCss(i);
                    $("#checkboxd" + i).attr("checked", true);
                }
                $("#txt" + i).val(number_format(this));
            }
        });
    recount_coins();
}

var first = 0;
//取总的投注比特币
function recount_coins() {
    var total = 0;
    var now_total = 0;
    $('.selected').each(function () {
        var txt_value = $.trim($(this).val()).replace(/,/gi, "");
        if (txt_value && !isNaN(txt_value)) {
            total += parseInt(txt_value);
            /* if (!$(this).attr("readonly")) {
             now_total += parseInt(txt_value);
             }*/
        }
    });
    $("#totalvalue").html(number_format(total + ""));
}

function set_odds(last_odds_ary, this_odds_ary) {
    if (last_odds_ary != "") {
        $.each(last_odds_ary, function (i) {
            var v = this + "";
            $('.peirrv').eq(i).html(v);
            // $("#last_lottery_odds" + i).text(v); //上期赔率
        })
    }
    if (this_odds_ary != "") {
        $.each(this_odds_ary, function (i) {
            var v = this + "";
            $('.peirrv').eq(i).html(v);
            // $("#this_lottery_odds" + i).text(v); //当前赔率
        })

    }
}

// TODO 判断是否当前正在投注的期数
function judge_issue(issue) {
    var now_issue;
    $.ajax({
        type: "get",
        async: false, //同步
        url: "/Luck28/judge?g28=" + g28 + "&Luck28Id=" + issue,
        error: function () {
        },
        success: function (data) {
            now_issue = parseInt(data);
        }
    });
    return now_issue;
}

// TODO 实时获取现有的比特币
function check_md() {
    var flag;
    $.ajax({
        type: "get",
        async: false, //同步
        url: "/Luck28/getBalance?g28=" + g28,
        error: function () {
        },
        success: function (data) {
            flag = data;
        }
    });
    return flag;
}
function check_auto() {
    var flag;
    $.ajax({
        type: "get",
        async: false, //同步
        url: "/Luck28/ajaxAutoPlay",
        data: "do=isauto&g28=" + g28,
        //error: function() {},
        success: function (data) {
            flag = parseInt(data);
        }
    });
    return flag;
}
//确认投注
function comform() {
    var t = $("#totalvalue").html().replace(/,/gi, "");
    var throwing = parseInt($("#now_total").val().replace(/,/gi, ""));
    t = parseInt(t);
    var str = [];
    var soonIssue = judge_issue($('#_issue').val());
    if (soonIssue) {//过期
        showmsg("3", "对不起，当前投注已过期，是否进入最近一期？", soonIssue);
        return false;
    } else if (throwing == 0) {
        showmsg("1", "对不起，请先投注！");
        return false;
    } else if (throwing > maxnum) {//limit
        showmsg("1", limit_msg);
        return false;
    } else if (throwing > check_md()) {
        showmsg("1", "您的黄豆余额不足！");
        return false;
    } else {
        for (var i = 0; i < 28; i++) {
            var txt_value = $.trim($("#txt" + i).val()).replace(/,/gi, "");
            str.push(txt_value);
        }
        $("#str_mdp_coin").val(str.join(","));
        var checkFlag = check_auto();
        var extmsg = checkFlag ? '本操作将会停止自动投注模式！' : '';
        showmsg("2", "确认投注<b class='lightred base_jg' style='color:red;'>" + throwing + "</b>个黄豆！" + extmsg, last_issue_id);
    }
}


//取消投注
function cancel() {
    $('#depend_parent').val('0');
    $('#shade_div_id').hide();
    $('#message_box').hide();
    $('#message_casesave').hide();
    $('#message_modesh').hide();
    $('#used_leave_modou_num').val('');
}

//确认投注
function save_data() {
    $('#save_28data').removeAttr('onclick');
    $('#save_28data').unbind('click');
    $("input[name='mdp_coin']").attr("disabled", false);
    var form1 = document.getElementById("form1"); //父层
    form1.submit();
}

//滚动
function set_boxsize(id) {
    document.getElementById(id).style.top = (document.documentElement.scrollTop + document.body.scrollTop + (document.documentElement.clientHeight - document.getElementById(id).offsetHeight) / 2) + "px";
    document.getElementById(id).style.left = (document.documentElement.scrollLeft + (document.documentElement.clientWidth - document.getElementById(id).offsetWidth) / 2) + "px";
}

//window.onscroll = set_boxsize;

function showshade() {
    //弹出笼罩层
    var bodyheight = 1002;
    var shade_div_id = document.getElementById("shade_div_id");
    shade_div_id.style.display = 'block';
    shade_div_id.style.height = parseInt(bodyheight) + 'px';
}
//投注后信息返回
function showmsg(flag, msg, issue_id) {
    $("#message_box").css("display", "");
    set_boxsize("message_box");
    switch (flag) {
        case "0":
            if (readcookie("handflag") == "1") {
                setcookie("handflag", "2");
            }
            window.location.href = "/Luck28?g28=" + g28;
            break;
        case "1":
            //投注失败
            $("#box_title").html('提示信息');
            $("#box_contents").html(msg);
            $("#box_confirm").html($.trim('<a href="javascript:;" onClick="cancel();"  class="a1">确定</a>'));
            //$("#submit_ok").addClass('mode_box_btn');
            break;
        case "4":
            $("#box_title").html('提示信息');
            $("#box_contents").html(msg);
            $("#box_confirm").html($.trim('<a href="javascript:;" onClick="cancel();document.location.reload();"  class="a1">确定</a>'));
            //$("#submit_ok").addClass('mode_box_btn');
            break;
        case "2":
            //确认投注
            $("#box_contents").html(msg);
            $("#box_confirm").html($.trim('<a href="javascript:;" id="save_28data" onClick="point_touch_submit(this.form1, save_data);"  class="a1">确定</a><a href="javascript:;" onclick="cancel();" class="a2">取消</a>'));
            //$("#submit_ok").addClass('mode_box_btn');
            //$("#submit_no").addClass('mode_box_btn');
            break;
        case "3":
            //提示过期
            $("#box_contents").html(msg);
            $("#box_confirm").html($.trim('<a href="javascript:;" onclick="go_url(' + issue_id + ');"  class="a1">确定</a><a href="javascript:;" onclick="cancel();" class="a2">取消</a>'));
            //$("#submit_ok").addClass('mode_box_btn');
            //$("#submit_no").addClass('mode_box_btn');
            break;
    }
    showshade();
}


function go_url(id) {
    document.location.href = '/Luck28/buy?g28=' + g28 + '&Luck28Id=' + id;
}

function setSuoha() {
    var lotteryVal = parseInt($("#totalvalue").val());
    if (lotteryVal) {
        $("#message_modesh").show();
        var used_md = parseInt($('#used_leave_modou_num').val());
        var md = check_md();
        $('#old_leave_modou_num').val(md);
        $('#leave_modou_num').html(number_format(md + ""));
        md = used_md ? used_md : md;
        md = md >= maxnum ? maxnum : md;
        $('#use_leave_modou_num').val(number_format(md + ""));
        $('#used_leave_modou_num').val(md);
        set_boxsize('message_modesh');
        showshade();
    }
}

function setSmallSuoha(val, sel) {
    for (var i = 0; i <= 4; i++) {
        $('#suoha' + i).removeClass('sel');
        if (sel == i) {
            $('#suoha' + i).addClass('sel');
        }
    }
    if (sel == 0) $('#old_leave_modou_num').val('');
    var val = parseFloat(val);
    var old_md = parseInt($('#old_leave_modou_num').val());
    var md = old_md ? old_md : check_md();
    var setsh = Math.floor(md * val) + "";
    setsh = setsh >= maxnum ? maxnum : setsh;
    $('#use_leave_modou_num').val(setsh);
    $('#used_leave_modou_num').val(setsh);
}


function checkSuoha() {
    var used_md = parseInt($('#used_leave_modou_num').val());
    var sel_md = parseInt($("#totalvalue").val().replace(/,/gi, ""));
    var total = compare_md = 0;
    $(".table-select").find(".selected").each(function () {
        var txt_value = $.trim($(this).val()).replace(/,/gi, "");
        if (txt_value && !isNaN(txt_value)) {
            var new_value = Math.floor((txt_value / sel_md) * used_md);
            if (new_value > maxnum) {
                showmsg("1", limit_msg);
                cancel();
                return false;
            }
            total += new_value;
            $(this).val(number_format(new_value + ""));
        }
    });


   /* $("#panel").find("input[name='mdp_coin']").each(function () {
        if (!$(this).attr("readonly")) {
            var txt_value = $.trim($(this).val()).replace(/,/gi, "");
            if (txt_value && !isNaN(txt_value)) {
                var new_value = Math.floor((txt_value / sel_md) * used_md);
                if (new_value > maxnum) {
                    showmsg("1", limit_msg);
                    cancel();
                    return false;
                }
                total += new_value;
                $(this).val(number_format(new_value + ""));
            }
        }
    });*/
    //if(compare_md = parseInt(used_md-total)){}
    recount_coins();
    cancel();
}

/**
 * 简易/标准模式切换
 * @param i
 */
function modes_easy_all(i) {
    if (i == 1) {
        $("#m_a0").removeClass("sel");
        $("#m_a1").addClass("sel");
        $("#modes_easy").hide();
        $("#modes_all").show();
    } else {
        $("#m_a0").addClass("sel");
        $("#m_a1").removeClass("sel");
        $("#modes_easy").show();
        $("#modes_all").hide();
    }
}


var html = "";
for (var i = 0; i <= 27; i++) {
    var m = i;
    if (i < 10) {
        var m = 0 + '' + i;
    }
    html +=
        '<tr>\
        <td><span class="num">' + m + '</span></td>\
    <td><input type="number"/></td>\
    <td class="peirrv">1001.15</td>\
    <td class="pei"><span val="0.5">×0.5</span><span val="2">×2</span><span val="10">×10</span></td>\
    </tr>';
}


$('.table-select').html(html)
