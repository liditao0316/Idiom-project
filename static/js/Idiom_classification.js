$(function() {
    var window_size = $(window).width();
    //设置主体内容的值
    console.log(window_size);
    if (window_size >= 1200) {
        $("#main-wrapper").height(1000);
    } else if (window_size >= 990) {
        $("#main-wrapper").height(900);
    } else if (window_size >= 768) {
        $("#main-wrapper").height(750);
    } else {
        $("#main-wrapper").height(750);
    }

    $(window).resize(function() {
        if ($(window).width() >= 1200) {
            $("#main-wrapper").height(1000);
        } else if ($(window).width() >= 990) {
            $("#main-wrapper").height(900);
        } else if ($(window).width() >= 768) {
            $("#main-wrapper").height(750);
        } else {

            $("#main-wrapper").height(750);
        }
    });

    var type = "数字";

    //中间导航栏的点击事件
    $(".content_right-nav li").click(function() {
        $(this).siblings('li').removeClass('current'); // 删除其他兄弟元素的样式
        $(this).addClass('current'); // 添加当前元素的样式
        type = $(this).text();
        page = 1;
        var page = 1;
        $(".page_ul li").each(function() {
            $(this).text(page);
            page++;
        })
        showData(page);
    })

    //分页索引的点击事件




    //上一页
    $(".page_left li").click(function() {
        //改变页框内的数据
        if (parseInt($(".page_item").text()) != 1) {
            $(".page_ul li").each(function() {
                $(this).text(parseInt($(this).text()) - 1);
            })
            showData(parseInt($(".page_item").text()));
        }
    })


    //点击数字
    $(".page_ul li").click(function() {
        var page = parseInt($(this).text());
        $(".page_ul li").each(function() {
            $(this).text(page);
            page++;
        })
        showData(parseInt($(".page_item").text()));
    })

    //下一页
    $(".page_right li").click(function() {
        //改变页框内的数据
        $(".page_ul li").each(function() {
            $(this).text(parseInt($(this).text()) + 1);
        })
        showData(parseInt($(".page_item").text()));
    })

    //分页处理
    function showData(page) {
        sendPost(page, type);
    }

    //导航栏样式切换
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('show');
    });

    //初始化界面
    sendPost(1, type);
})

function sendPost(page, type) {
    page = page - 1;
    console.log(page);
    $.ajax({
        //请求路径
        url: "/selectIdiomVague",
        //请求类型
        type: "post",
        //data表示发送的数据
        data: JSON.stringify({
            page: page,
            type: type
        }),
        //data表示发送的数据
        //定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType: "json",
        //成功响应的结果
        success: function(data) {
            console.log(data.data.length);
            var row = [];
            for (var i = 0; i < data.data.length; i++) {
                row.push("<div class='id31'>");
                row.push("<div class='result-item' onclick='Goto(this)' data-idiom='一生一世'>");
                row.push("<div class='title-left'>");
                row.push("<div class='title-left-div'></div>");
                row.push(" <text style='margin-left:5px;'class='getIdiom'>" + data.data[i].idiom + "</text>");
                row.push("</div>");
                row.push("<div class='title-right'>");
                row.push(" <div class='title1'>");
                row.push("<text class='getExplanation'>" + data.data[i].explanation + "</text>");
                row.push("</div>");
                row.push("</div>");
                row.push(" </div>");
                row.push("</div>");
                row.push("</div>");
                var Classify = $('.classify');
                Classify.html(row.join(''));
            }
        }
    });
}

//点击成语列表跳转到相应成语
function Goto(that) {
    window.location.href = "http://localhost:8080/page/explain_page.html?idiom=" + encodeURI(that.children[0].children[1].innerText);

}

//点击成语卡片跳转到相应的成语
function gotoPicture1() {
    window.location.href = "http://localhost:8080/page/explain_page.html?idiom=" + encodeURI("缘木求鱼");
}

function gotoPicture2() {
    window.location.href = "http://localhost:8080/page/explain_page.html?idiom=" + encodeURI("揠苗助长");
}

function gotoPicture3() {
    window.location.href = "http://localhost:8080/page/explain_page.html?idiom=" + encodeURI("程门立雪");
}

function gotoPicture4() {
    window.location.href = "http://localhost:8080/page/explain_page.html?idiom=" + encodeURI("立木为信");
}