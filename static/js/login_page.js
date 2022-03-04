//验证表单是否为空，若为空则将焦点聚焦在input表单上，否则表单通过，登录成功
function check() {
    var exampleInput = $("#exampleInput").val();
    var exampleInputPassword1 = $("#exampleInputPassword1").val();
    var yanzhengma = $("#yanzhengma").val();
    console.log(exampleInputPassword1);
    if (!exampleInput || exampleInput == "") {
        alert("请输入账号");
        exampleInput.val = " ";
        return false;
    } else if (!exampleInputPassword1 || exampleInputPassword1 == "") {
        alert("请输入密码");
        return false;
    } else if (!yanzhengma || yanzhengma == "") {
        alert("请输入验证码");
        return false;
    } else
        return true;
}



/**设置cookie */

function SetCookie(name, value) //两个参数，一个是cookie的名子，一个是值 
{
    console.log(name + "==" + value);
    document.cookie = name + "=" + escape(value) + ";path=/";
}
/**获取cookie */
function getCookie(name) //取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

/*登陆按钮点击时间*/
function login(bool) {
    if (bool == false) {
        return false;
    }
    if (check()) {
        var username = document.getElementById("exampleInput").value;
        var password = document.getElementById("exampleInputPassword1").value;
        $.ajax({
            //data表示发送的数据
            data: JSON.stringify({
                username: username,
                password: password
            }), //定义发送请求的数据格式为JSON字符串
            contentType: "application/json;charset=utf-8",
            //定义回调响应的数据格式为JSON字符串，该属性可以省略
            dataType: "json",
            //成功响应的结果
            url: '/login',
            type: "POST",
            success: function(data) {
                if (data.status == 400) {
                    window.alert("输入的用户名不存在！")
                } else if (data.status == 401) {
                    window.alert("输入的密码有误！")
                } else {
                    SetCookie("id", data.id)
                    window.location.href = "http://localhost:8080"

                }

            }
        })
    }


}