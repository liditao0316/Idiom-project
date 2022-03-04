$(function(){
    if(getCookie("id")!=null){
        $(".navigation_btn")[0].innerHTML = "欢迎您!";
    }
})

function getCookie(name) //取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}
