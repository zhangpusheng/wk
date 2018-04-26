/**
 * 注册点击事件
**/
var sms_timer = null;
var remain_time = 60;

$(document).ready(function(){
    // username login_pwd login_pwd_repeat deal_pwd deal_pwd_repeat captcha
    $("#register").click(function(){
        var param = getParam();
        var uid = GetQueryString('uid');
        param.uid = uid;
        var login_pwd_key = 'login_pwd';
        var deal_pwd_key = 'deal_pwd';

        // 以下可以进行各种校验, 我做了手机号校验, 与二次密码相同校验.
        if (checkHasEmpty(param)) {
           return notify("请完整填写注册信息"); 
        }
        if (!checkPhoneNumber(param.username)) {
            return notify("请输入正确的手机号");
        }
        if (param[login_pwd_key] !== param[login_pwd_key + '_repeat']) {
            return notify("请确认登陆密码二次是否相同");
        }

        if (param[deal_pwd_key] !== param[deal_pwd_key + '_repeat']) {
            return notify("请确认交易密码二次是否相同");
        }
        // TODO 应该加入密码规则 与 长度判断
        // ....
        
        // TODO 发送注册请求成功后跳转.
        // register();

    });
    $("#sms_code").click(function() {
        var param = getParam();
        if (remain_time !== 60) {
            return notify(remain_time + '秒后重新获取');
        }
        if (!checkPhoneNumber(param.username)) {
            return notify("请输入正确的手机号");
        }
        getSmsCode(param.username);
        remain_time -= 1;

    });
});

function getParam() {
    var inputs = $("#registers input");
    var param = {};
    for (var i = 0; i< inputs.length; i++) {
        var tmp = inputs.eq(i);
        console.log(tmp.attr("name"));
        param[tmp.attr("name")] = tmp.val();
    }

    return param;
}
function checkHasEmpty(param) {
    if (!param) {
        return true;
    }
    if (!param instanceof Object) {
        return true;
    }
    for (var key in param){
        if (!param[key]) {
            return true;
        }
    }
    return false;
}
// 登陆的ajax
function register(data) {
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/users/login" ,//url
        data: data,
        success: function (result) {
            alert("success");
        },
        error : function() {
            alert("异常！");
        }
    });
}

function getSmsCode(number) {
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "/users/login" ,//url
        data: {phone: number},
        success: function (result) {
            alert("success");
        },
        error : function() {
            alert("异常！");
            changeRemainTime();
        }
    });
}
function changeRemainTime() {
    sms_timer = setInterval(function() {
        remain_time--;
        if (!remain_time) {
            clearInterval(sms_timer);
            remain_time = 60;
        }
        $("#sms_code").html(remain_time + '秒');
     }, 1000)
}