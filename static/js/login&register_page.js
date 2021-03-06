$(function() {
    var window_size = $(window).height();
    //设置主体内容的值
    if (window_size < 580) {
        $("#main-wrapper").height(580);
        $(".right").height(580);
        $(".Box").height(580);
        $(".left").height(580);
    } else {
        $("#main-wrapper").height($(window).height() - $("#header").height());
        $(".right").height($(window).height() - $("#header").height());
        $(".Box").height($(window).height() - $("#header").height() - 50);
        $(".left").height($(window).height() - $("#header").height());
    }

    //窗口变化时的响应事件

    $(window).resize(function() {
        window_size = $(window).height();
        if (window_size < 580) {
            $("#main-wrapper").height(580);
            $(".right").height(580);
            $(".Box").height(580);
            $(".left").height(580);
        } else {
            $("#main-wrapper").height($(window).height() - $("#header").height());
            $(".right").height($(window).height() - $("#header").height());
            $(".Box").height($(window).height() - $("#header").height() - 50);
            $(".left").height($(window).height() - $("#header").height());
        }
        if ($(window).width() < 767) {
            $(".Box").css("margin-left", ($(window).width() - 250) / 2);
        } else {
            $(".Box").css("margin", "0 auto");
        }
    });
    // Mobile Menu
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('show');
    });
    var verVal = drawCode();


})


/**设置验证码 开始*/
var verVal;
$(function() {
    /**设置验证码*/
    verVal = drawCode();
})


var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
var str = '';
// 绘制验证码
function drawCode(str) {
    var canvas = document.getElementById("verifyCanvas"); //获取HTML端画布
    var context = canvas.getContext("2d"); //获取画布2D上下文
    context.fillStyle = "cornflowerblue"; //画布填充色
    context.fillRect(0, 0, canvas.width, canvas.height); //清空画布
    context.fillStyle = "white"; //设置字体颜色
    context.font = "25px Arial"; //设置字体
    var rand = new Array();
    var x = new Array();
    var y = new Array();
    for (var i = 0; i < 4; i++) {
        rand.push(rand[i]);
        rand[i] = nums[Math.floor(Math.random() * nums.length)]
        x[i] = i * 20 + 10;
        y[i] = Math.random() * 20 + 20;
        context.fillText(rand[i], x[i], y[i]);
    }
    str = rand.join('').toUpperCase();
    //画3条随机线
    for (var i = 0; i < 3; i++) {
        drawline(canvas, context);
    }

    // 画30个随机点
    for (var i = 0; i < 30; i++) {
        drawDot(canvas, context);
    }
    convertCanvasToImage(canvas);
    return str;
}

// 随机线
function drawline(canvas, context) {
    context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
    context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)); //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
    context.lineWidth = 0.5; //随机线宽
    context.strokeStyle = 'rgba(50,50,50,0.3)'; //随机线描边属性
    context.stroke(); //描边，即起点描到终点
}
// 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
function drawDot(canvas, context) {
    var px = Math.floor(Math.random() * canvas.width);
    var py = Math.floor(Math.random() * canvas.height);
    context.moveTo(px, py);
    context.lineTo(px + 1, py + 1);
    context.lineWidth = 0.2;
    context.stroke();

}
// 绘制图片
function convertCanvasToImage(canvas) {
    document.getElementById("verifyCanvas").style.display = "none";
    var image = document.getElementById("code_img");
    image.src = canvas.toDataURL("image/png");
    return image;
}



function resetCode() {
    $('#verifyCanvas').remove();
    $('#code_img').before('<canvas width="100" height="40" id="verifyCanvas"></canvas>')
    verVal = drawCode();
}


//检查验证码是否正确
function validateCode() {
    //获取显示区生成的验证码
    console.log(verVal);
    //获取输入的验证码
    var yanzhengma = document.getElementById("yanzhengma").value;
    console.log(verVal.toUpperCase());
    console.log(yanzhengma.toUpperCase());
    if (yanzhengma.length <= 0) {
        // alert("请输入验证码！");
        return false;
    } else if (yanzhengma.toUpperCase() != verVal.toUpperCase()) {
        alert("验证码输入有误！");
        resetCode();
        return false;
    }
}
/**设置验证码--end */