$(function() {
    var window_size = $(window).height();
    //设置主体内容的值
    $("#main-wrapper").height($(window).height() - $("#header").height());
    //窗口变化时的响应事件
    $(window).resize(function() {
        if (window_size < $(window).height()) {
            window_size = $(window).height();
            $("#main-wrapper").height($(window).height() - $("#header").height());
            $("#main-wrapper").css("background-size", "100% 100%");
        }
    });
    // Mobile Menu
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('show');
    });


    $.ajax({
        //data表示发送的数据
        contentType: "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType: "json",
        //成功响应的结果
        url: '/selectIdiomhot',
        type: "POST",
        success: function(data) {
            console.log(data);
            //点击成语列表跳转到相应成语
            var html = []
            for(var i = 0; i < data.length; i++) {
                html.push("<li class='hot_li' >");
                html.push("<a onclick='getIdiom(this)'>");
                html.push("<span class='hot_index'>"+(i+1)+"</span>");
                html.push("<span class='hot_content'>"+data[i].idiom+"</span>");
                html.push('</a>');
                html.push("<span class='hot_name'>热</span>");
                html.push("</li>");
                
                }
                var mainObj = $('.hot_ul');
                mainObj.html(html.join(''));
        }
    })

})

//点击热词的路由跳转
function getIdiom(that){
    gotoIdiom($(that)[0].children[1].innerHTML);
}



function search() {
    //获取input文本
    var idiom = $(".searchBox_Input").val();
    gotoIdiom(idiom);
}

function gotoIdiom(idiom){
    $.ajax({
        //data表示发送的数据
        data: JSON.stringify({
            idiom: idiom,
        }), //定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType: "json",
        //成功响应的结果
        url: '/selectIdiomOne',
        type: "POST",
        success: function(data) {
            //点击成语列表跳转到相应成语
            if (data.length == 0) {
                alert("查无此成语");
            } else {
                window.location.href = "http://localhost:8080/page/explain_page.html?idiom=" + idiom;
            }
        },
    });
}