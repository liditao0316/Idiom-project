var flag = 1;
$(function(){

    var window_size = $(window).height();
    //设置主体内容的高度
    $(".content").height(650);
    $(".content-left").height(650);
    $(".controduction").height(650);
    $(".content_right-content-box").height(650);
    $(".content_right-content-top").height(600);

    //如果屏幕的宽度小于760内容主体容器大小发生改变
    if($(window).width()<760){
        window_size = $(window).height();
        $("#main-wrapper").height($(window).height()+$(".content_right").height()+40);
    }else{
        $("#main-wrapper").height(850);
    }

    //如果屏幕发生变化时，同时屏幕的宽度小于760内容主体容器大小发生改变
    $(window).resize(function() {
        if($(window).width()<760){
        window_size = $(window).height();
        $("#main-wrapper").height($(window).height()+$(".content_right").height()+40);
        }else{
        $("#main-wrapper").height(850);
        }
    });


    // 导航栏的三个汉堡按钮的点击事件
    $('.navbar-toggler').on('click', function () {
        $(this).toggleClass('show');
    });

    //中间内容导航栏的选中值情况
    var type = "成语列表";
    
    //右边主体内容顶部的tab的点击事件
    $(".content_right-nav li").click(function() {
        $(this).siblings('li').removeClass('current');  // 删除其他兄弟元素的样式
        $(this).addClass('current');                            // 添加当前元素的样式
        if($(this)[0].innerText == type)
            flag = 1;
        else 
            flag = 0;
        var start = 1;
        $(".page_ul li").each(function(){
            $(this).text(start);
            start++;
        })
        showData(1);
    })
    
    //分页索引的点击事件
    
    //上一页

    $(".page_left li").click(function() {
    //改变页框内的数据
        if(parseInt($(".page_item").text())!=1){
            $(".page_ul li").each(function(){
                $(this).text(parseInt($(this).text())-1);
            })
        }
        showData(parseInt($(".page_item").text()));
    }) 

    
    //点击数字
    $(".page_ul li").click(function() {
        var start = parseInt($(this).text());
        $(".page_ul li").each(function(){
            $(this).text(start);
            start++;
        })
        showData(parseInt($(".page_item").text()));
    })

    //下一页
    $(".page_right li").click(function() {
        //改变页框内的数据
        $(".page_ul li").each(function(){
            $(this).text(parseInt($(this).text())+1);
        })
        showData(parseInt($(".page_item").text()));
    })
    
    //初始化页面数据
    if(getCookie("id") !=null){
        showData(1);
        countLength(1);
    }

})


//goto
function gotoIdiom(that){
    window.location.href = "http://localhost:8080/page/explain_page.html?idiom="+encodeURI(that.children[0].innerText)

}

//goto
function gotoStory(that){
    window.location.href = "http://localhost:8080/page/story_page.html?idiom="+encodeURI(that.children[0].innerText)

}
function deleteIdiom(that){
    var idiom = $(that)[0].parentElement.firstChild.firstChild.innerHTML
    console.log($(that)[0].parentElement.firstChild.firstChild.innerHTML);
    $.ajax({
        //data表示发送的数据
        data: JSON.stringify({
            id:getCookie("id"),
            idiom: idiom,
        }), //定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType: "json",
        //成功响应的结果
        url: '/deleteFavariteIdiom',
        type: "POST",
        success: function(data) {
            console.log(data);
            if(data.status == 200){
                window.alert("删除成功");
                showData(parseInt($(".page_item").text()));
            }
        }
    })
}

function countLength(start){
    start = start-1;
    $.ajax({
        //请求路径
        url : "/selectFavariteStoryPage",
        //请求类型
        type : "post",
        //data表示发送的数据
        data : JSON.stringify({
            id:getCookie("id"),
            start:start
        }),
        //data表示发送的数据
        //定义发送请求的数据格式为JSON字符串
        contentType : "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType : "json",
        //成功响应的结果
        success : function(data) {
            $("#story-length").text(data.data.length);
            //window.location.href = "http://localhost:8080/page/explain_page.html?idiom=点点滴滴";
        /*创建的是一个表格，并将数据放进去*/
        }
    });
}

function deleteStory(that){
    var idiom = $(that)[0].parentElement.firstChild.firstChild.innerHTML
    $.ajax({
        //data表示发送的数据
        data: JSON.stringify({
            id:getCookie("id"),
            idiom: idiom,
        }), //定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType: "json",
        //成功响应的结果
        url: '/deleteFavariteStory',
        type: "POST",
        success: function(data) {
            console.log(data);
            if(data.status == 200){
                window.alert("删除成功");
                flag =0;
                showData(parseInt($(".page_item").text()));
            }
        }
    })
    
}

//分页处理
function showData(start){
    start = start-1;
    console.log(start);

    if(getCookie("id") !=null){
        if(flag){
            $.ajax({
                //请求路径
                url : "/selectFavariteIdiomPage",
                //请求类型
                type : "post",
                //data表示发送的数据
                data : JSON.stringify({
                    id:getCookie("id"),
                    start:start

                }),
                //data表示发送的数据
                //定义发送请求的数据格式为JSON字符串
                contentType : "application/json;charset=utf-8",
                //定义回调响应的数据格式为JSON字符串，该属性可以省略
                dataType : "json",
                //成功响应的结果
                success : function(data) {
                    //window.location.href = "http://localhost:8080/page/explain_page.html?idiom=点点滴滴";
                    console.log(data);
                    var html = [];
                    $("#idiom-length").text(data.data.length);
                /*创建的是一个表格，并将数据放进去*/
                    for(var i = 0; i < data.data.length; i++) {
                    html.push("<div class='Item' > ");
                    html.push("<div class='Item_top'>");
                    html.push("<navigator id='test' style='width:100%' onclick='gotoIdiom(this)'>");
                    html.push("<div class='Item_title' style='color:#000;'>"+data.data[i].idiom+"</div>");
                    html.push("<div class='Item_content' style='overflow:hidden;-webkit-line-clamp:1;display:-webkit-box;-webkit-box-orient:vertical;white-space:wrap;text-overflow:ellipsis; '>"+data.data[i].explanation+"</div>");
                    html.push("</navigator>");
                    html.push("<div class='delete' onclick='deleteIdiom(this)'>");
                    html.push("<img src='../pictures/delect.png' mode='aspectFit'></img>");
                    html.push("</div>");
                    html.push("</div>");
                    html.push("</div>");
                    }
                    var mainObj = $('.content_right-content-top');
                    mainObj.html(html.join(''));
                }
            });
        }else{
            $.ajax({
                //请求路径
                url : "/selectFavariteStoryPage",
                //请求类型
                type : "post",
                //data表示发送的数据
                data : JSON.stringify({
                    id:getCookie("id"),
                    start:start
                }),
                //data表示发送的数据
                //定义发送请求的数据格式为JSON字符串
                contentType : "application/json;charset=utf-8",
                //定义回调响应的数据格式为JSON字符串，该属性可以省略
                dataType : "json",
                //成功响应的结果
                success : function(data) {
                    $("#story-length").text(data.data.length);
                    //window.location.href = "http://localhost:8080/page/explain_page.html?idiom=点点滴滴";
                    var html = [];
                /*创建的是一个表格，并将数据放进去*/
                    for(var i = 0; i < data.data.length; i++) {
                    html.push("<div class='Item' > ");
                    html.push("<div class='Item_top'>");
                    html.push("<navigator id='test' style='width:100%' onclick='gotoStory(this)'>");
                    html.push("<div class='Item_title' style='color:#000;'>"+data.data[i].idiom+"</div>");
                    html.push("<div class='Item_content' style='overflow:hidden;-webkit-line-clamp:1;display:-webkit-box;-webkit-box-orient:vertical;white-space:wrap;text-overflow:ellipsis; '>"+data.data[i].story+"</div>");
                    html.push("</navigator>");
                    html.push("<div class='delete' onclick='deleteStory(this)'>");
                    html.push("<img src='../pictures/delect.png' mode='aspectFit'></img>");
                    html.push("</div>");
                    html.push("</div>");
                    html.push("</div>");
                    }
                    var mainObj = $('.content_right-content-top');
                    mainObj.html(html.join(''));
                }
            });
        }
    }
    
} 


//获取cookie
//获取cookie中的id
function getCookie(name) //取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}