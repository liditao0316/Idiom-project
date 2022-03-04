//验证表单是否为空，若为空则将焦点聚焦在input表单上，否则表单通过，登录成功
function check(form) {
    var exampleInput = $("#exampleInput");
    var exampleInputPassword1 = $("#exampleInputPassword1");
    var exampleInputPassword2 = $("#exampleInputPassword2");
    exampleInput = exampleInput.val();
    exampleInputPassword1 = exampleInputPassword1.val();
    exampleInputPassword2 = exampleInputPassword2.val();
    var yanzhengma = $("#exampleInput");
    yanzhengma = yanzhengma.val();
    // var str = "sss_ss";
    //长度判断
    var preg = /^\w{6,12}$/;
    //必须包含两种类型
    var preg1 = /([\da-zA-Z]+?[_]+?)|([_]+?[\da-zA-Z]+?)|(\d+?[a-zA-Z]+?)|([a-zA-Z]+?\d+?)/;
    var num1 = preg.test(exampleInput);
    var num2 = preg1.test(exampleInput);
    var psw1 = preg.test(exampleInputPassword1);
    var psw2 = preg1.test(exampleInputPassword1);

    if (!exampleInput || exampleInput == "") {
        alert("请输入账号");
        form.exampleInput.focus();
        return false;
    } else if (!exampleInputPassword1 || exampleInputPassword1 == "") {
        alert("请输入密码");
        form.exampleInputPassword1.focus();
        return false;
    } else if (!exampleInputPassword2 || exampleInputPassword2 == "") {
        alert("请再次确认密码");
        form.exampleInputPassword2.focus();
        return false;
    } else if (!yanzhengma || yanzhengma == "") {
        alert("请输入验证码");
        form.yanzhengma.focus();
        return false;
    } else if (exampleInputPassword1 != exampleInputPassword2) {
        alert("两次密码输入不一致");
        form.exampleInputPassword2.focus();
        return false;
    }
    if (num1 && num2) {
        // alert(str+'用户名符合');
        // }else{undefined
        console.log("正确");
    } else {
        // alert(str+'用户名符合');
        // }else{undefined 
        alert("请输入6-12位包含数字和字母的账号");
        exampleInput.val = " ";
        form.exampleInput.focus();
        return false;
    }
    if (psw1 && psw2) {
        // alert(str+'用户名符合');
        // }else{undefined
        console.log("正确");
        return true;
    } else {
        // alert(str+'用户名符合');
        // }else{undefined
        alert("请输入6-12位包含数字和字母的密码");
        form.exampleInputPassword1.focus();
        return false;
    }



}


/*注册按钮登陆事件 */
function register(bool) {
    if (bool == false) {
        return false;
    }
    var username = document.getElementById("exampleInput").value;
    var password = document.getElementById("exampleInputPassword1").value;
    if (check() == true) {
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
            url: '/insertUser',
            type: "POST",
            success: function(data) {
                if (data.status == 200) {
                    alert("注册成功，请登录！");
                    window.location.href = "http://localhost:8080/page/login_page.html";
                } else {
                    resetCode();
                    window.alert("该用户名已经存在！请输入新的用户名！");
                }

            }
        })

    } else {
        resetCode();
    }

}