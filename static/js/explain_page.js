$(function() {
    //获取url数据
    function getParamString(paraPart, name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = paraPart.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    function getParamFromUrl(name) {
        var r = getParamString(window.location.search, name)
        return r;
    }
    var idiom = decodeURI(getParamFromUrl('idiom'))
    console.log(idiom)
        //如果屏幕的宽度小于760内容主体容器大小发生改变
    if ($(window).width() < 760) {
        window_size = $(window).height();
        $("#main-wrapper").height(1200);
    } else {
        $("#main-wrapper").height(850);
    }

    //如果屏幕发生变化时，同时屏幕的宽度小于760内容主体容器大小发生改变
    $(window).resize(function() {
        if ($(window).width() < 760) {
            window_size = $(window).height();
            $("#main-wrapper").height(1200);
        } else {
            $("#main-wrapper").height(850);
        }
    });
    // Mobile Menu
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('show');
    });
    // Mobile Menu
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('show');
    });


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
            console.log(data);

            var title = [];
            /*创建的是一个title表格，并将数据放进去*/
            title.push("<h3>" + data[0].pinyin + "</h3>");
            title.push("<h3>" + data[0].idiom + "</h3>");
            var Title = $('.title');
            Title.html(title.join(''));

            var row = [];
            /*创建的是一个title表格，并将数据放进去*/
            row.push("<div class='divblock'>");
            row.push("<div class='title_border' style='background-image: url('../pictures/title_border.png');'>");
            row.push(" <h4>解释</h4>");
            row.push("</div>");
            row.push("<div class='vertical-text'> " + data[0].explanation + "</div>");
            row.push("</div>");

            row.push("<div class='divblock'>");
            row.push("<div class='title_border' style='background-image: url('../pictures/title_border.png');'>");
            row.push(" <h4>出处</h4>");
            row.push("</div>");
            row.push("<div class='vertical-text'> " + data[0].derivation + "</div>");
            row.push("</div>");

            row.push("<div class='divblock'>");
            row.push("<div class='title_border' style='background-image: url('../pictures/title_border.png');'>");
            row.push(" <h4>例句</h4>");
            row.push("</div>");
            row.push("<div class='vertical-text'> " + data[0].example + "</div>");
            row.push("</div>");
            var Row = $('.row');
            Row.html(row.join(''));
        },
    });



})

function collection(){
    var idiom = $(".title")[0].lastChild.innerHTML
    console.log($(".title")[0].lastChild.innerHTML);
    if(getCookie("id")!=null){
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
            url: '/insertFavariteIdiom',
            type: "POST",
            success: function(data) {
                console.log(data);
                if(data.status == 200){
                    window.alert("收藏成功");
                }
            }
        })
    }else{
        window.alert("请登陆！");
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