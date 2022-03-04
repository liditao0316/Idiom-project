$(function() {
        var window_size = $(window).height();
        //设置主体内容的值
        if ($(window).width() >= 1200) {
            $("#main-wrapper").height(1020);
        } else if($(window).width() >=992) {
            $("#main-wrapper").height(900);
        }else if($(window).width() >=760) {
            $("#main-wrapper").height(750);
        }else {
            $("#main-wrapper").height(800);
        }
        //窗口变化时的响应事件
        $(window).resize(function() {
            if ($(window).width() >= 1200) {
                $("#main-wrapper").height(1020);
            } else if($(window).width() >=992) {
                $("#main-wrapper").height(900);
            }else if($(window).width() >=760) {
                $("#main-wrapper").height(750);
            }else {
                $("#main-wrapper").height(800);
            }
        });
        // Mobile Menu
        $('.navbar-toggler').on('click', function() {
            $(this).toggleClass('show');
        });


        //分页索引的点击事件

        //上一页

        $(".page_left li").click(function() {
            //改变页框内的数据
            if (parseInt($(".page_item").text()) != 1) {
                $(".page_ul li").each(function() {
                    $(this).text(parseInt($(this).text()) - 1);
                })
            }
            showData(parseInt($(".page_item").text()));
        })


        //点击数字
        $(".page_ul li").click(function() {
            var start = parseInt($(this).text());
            $(".page_ul li").each(function() {
                $(this).text(start);
                start++;
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

        showData(1);

    })
    //goto
function goto(that) {
    window.location.href = "http://localhost:8080/page/story_page.html?idiom=" + encodeURI(that.children[0].children[0].children[1].innerText)
}




//分页处理
function showData(start) {
    start = start - 1;
    console.log(start);
    $.ajax({
        //请求路径
        url: "/selectStoryPage",
        //请求类型
        type: "post",
        //data表示发送的数据
        data: JSON.stringify({
            start: start
        }),
        //data表示发送的数据
        //定义发送请求的数据格式为JSON字符串
        contentType: "application/json;charset=utf-8",
        //定义回调响应的数据格式为JSON字符串，该属性可以省略
        dataType: "json",
        //成功响应的结果
        success: function(data) {
            console.log(data.length);
            var html = [];
            /*创建的是一个表格，并将数据放进去*/
            for (var i = 0; i < data.length; i++) {
                html.push("<div class='d31' onclick='goto(this)'>");
                html.push("<div class='result-item'>");
                html.push("<div class='title-left'>");
                html.push("<div class='title-left-div'></div>");
                html.push("<text style='margin-left:5px;'>" + data[i].idiom + "</text>");
                html.push("</div>");
                html.push("<div class='title-right'>");
                html.push("<div class='title1'>");
                html.push("<text>" + data[i].story + "</text>");
                html.push("</div>");
                html.push("</div>");
                html.push("</div>");
                html.push("</div>");
            }
            var mainObj = $('#d3');
            mainObj.html(html.join(''));
        }
    });
}

//轮播
var i = 1;
var m = 800;
var mti;
window.onload = function start() {
        ti();
    }
    //window.onload代表页面加载即执行
function ti() {
    tim = setInterval("pho()", 2000); //定义一个4000毫秒执行一次的计时器,执行pho()函数
    color(i); //引用color()函数,自己写的,在下面
}

function pho() {
    if (i == 3) {
        i = 0;
    }
    i = i + 1;
    var a = document.getElementById("d1");
    magicti(i); //引入幻灯片效果
    color(i);
    if (i == 3) {
        i = 0;
    }
    //if分支表示1000毫秒执行一次,当i等于3就是第五个图片时候i=0,下一张执行就是i+1,即第一张
}

function off() {
    //鼠标悬浮停止播放
    //停止俩计时器
    clearInterval(tim);
    clearInterval(mti);

}

function on() {
    //鼠标离开重启计时器,开始播放
    ti();

}

function add() {
    var a = document.getElementById("d1");
    i = i + 1;
    magicti(); //引入幻灯片效果
    clearInterval(mti);
    color(i); //停止计时器,防止计时器叠加
    if (i == 3) {
        i = 0;
    }
}

function noadd() {
    var a = document.getElementById("d1");
    i = i - 1;
    if (i == 0) {
        i = 3;
    }
    magicti(); //引入幻灯片效果
    clearInterval(mti); //停止计时器,防止计时器叠加
    color(i);
}

function color(i) {
    //color()的作用在于根据展示不同的图片改变顺序点的颜色
    var d21 = document.getElementById("d21");
    var d22 = document.getElementById("d22");
    var d23 = document.getElementById("d23");
    //以上获取那3个点
    //下面是一个switch分支结构
    switch (i) {
        case 1:
            //第一个图片,第一个点变黑,还原其他四个点的颜色,之后以此类推
            d21.style.background = "gray";
            d22.style.background = "white";
            d23.style.background = "white";
            break;
        case 2:
            d21.style.background = "white";
            d22.style.background = "gray";
            d23.style.background = "white";
            break;
        case 3:
            d21.style.background = "white";
            d22.style.background = "white";
            d23.style.background = "gray";
            break;
    }
}

function magic() {
    //简单的幻灯片效果,使图片从左方滑动进入
    m = m - 2;
    var d1 = document.getElementById("d1");
    d1.style.backgroundPosition = "center 50px";
    d1.style.backgroundRepeat = "no-repeat";
    if (m == 0) {

        m = 800;
        clearInterval(mti);
    }
}

function magicti() {
    //简单的幻灯片效果,使图片从左方滑动进入
    mti = setInterval(2, "magic()"); //每一毫秒图片向左滑动
    var d11 = document.getElementById("d1");
    d1.style.background = "url(../pictures/imgBox" + i + ".png)";
    d1.style.backgroundPosition = "center center";
    d1.style.backgroundSize = "100% 100%";
    d1.style.backgroundRepeat = "no-repeat";
}

function gotoStory(){
    if(i==1){
        window.location.href = "http://localhost:8080/page/story_page.html?idiom=" + encodeURI("守株待兔");
    }else if(i==2){
        window.location.href = "http://localhost:8080/page/story_page.html?idiom=" + encodeURI("闻鸡起舞");
    }else{
        window.location.href = "http://localhost:8080/page/story_page.html?idiom=" + encodeURI("守株待兔");
    }
    
    
    
}