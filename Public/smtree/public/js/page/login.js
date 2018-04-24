/**
 * 登陆界面的点击事件
**/

$(document).ready(function(){

    $("#login").click(function(){
        var param = {};
        var username = $("#username").val();
        var pwd = $("#password").val()
        if (!checkPhoneNumber(username)) {
            return alert("请输入合法的手机号码");
        }
        if (!pwd) {
            return alert("请输入密码");
        }
        param.username = $("#username").val();
        param.password = $("#password").val();
        // 当前打印的是用户名与密码
        console.log("param", param);
        login(param);
    });

    $("#register").click(function(){
        alert("register");
    });
});

// 登陆的ajax
function login(data) {
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "{:U('/Index.php/Home/Login/enlogincl')}" ,//url
        data: $('form').serialize(),
        dataType:"json",
        success: function (data) {
        if(data.status==1){
    
        location.href="/index.php/Home/Info/enmykuangche/";
                }else{
                    $.alert(data.msg);
                }
        },
        error : function() {
            alert("异常！");
        }
    });
}