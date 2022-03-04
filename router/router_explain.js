const db = require('../db/db.js')
const app = require('express');
const { json } = require('body-parser');
const router = app.Router();

//热词查询
router.post('/selectIdiomhot',function(req,rep){
    db.query("select * from idiom ORDER BY count DESC limit 0,9", function(err, data) {
        rep.send(data);
    })
})

//单个成语解释查询
router.post('/selectIdiomOne', function(req, rep) {
    var idiom = req.body.idiom;
    db.query("select * from idiom where idiom='" + idiom + "'", function(err, data) {
        rep.send(data);
    })
    db.query("update idiom set count = count+1 where idiom='" + idiom + "'",function(err,data){
        console.log(data);
    })
})

var cardArr = [{
        "id": "01",
        "name": "一、二、三、四、五、六、七、八、九、十、百、千、万、亿、数",
        type: "数字",
    },
    {
        "id": "02",
        "name": "春、夏、秋、冬",
        type: "四季",
    },
    {
        "id": "03",
        "name": "鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪",
        type: "生肖",
    },
    {
        "id": "04",
        "name": "红、橙、黄、绿、青、蓝、紫、黑、白、灰、粉",
        type: "颜色",
    },
    {
        "id": "05",
        "name": "大学、中庸、论语、孟子、诗经、尚书、礼记、周易、春秋",
        type: "四书五经",

    },
    {
        "id": "06",
        "name": "孔子、老子、庄子、孟子、墨子、荀子、韩非子、管子、列子、孙子、文子、吴子、尸子、鬼谷子、鹖冠子、关尹子、文中子、邓析子",
        type: "诸子百家",
    },
    {
        "id": "07",
        "name": "金瓶梅、醒世恒言、警世通言、喻世明言、东周列国志、初刻拍案惊奇、二刻拍案惊奇、禅真逸史、杨家将演义、封神演义、镜花缘、聊斋志异、三侠五义、小五义、济公全传、说岳全传、绿野仙踪、隋唐演义、孽海花、老残游记、儒林外史、官场现形记",
        type: "明清小说",
    },
]


//分页成语查询
router.post('/selectIdiomPage', function(req, rep) {
    //从前端拿到页数
    let page = req.body.page;
    console.log(page);
    db.query("select * from idiom limit " + page +",6", function(err, data) {
        rep.send({ data: data });
    })
})

//模糊查询+分页查询
router.post('/selectIdiomVague', function(req, rep) {
    //从前端js拿到页数和类型
    let page = req.body.page;
    var type = req.body.type;
    console.log(type);
    type = type.trim();
    page = page * 6;
    //将匹配到的name数组分割
    var text = new Array();
    var a;
    for (a = 0; a < cardArr.length; a++) {
        if (cardArr[a].type == type) {
            text = cardArr[a].name.split("、");
            break;
        }
    }
    if(a<4){
        console.log(text);
        let sql = "select * from idiom where idiom like ";
        text.forEach(function(value, index){
            sql +="'%"+value+"%'";
            if(index<text.length-1)
                sql +=" or ";
        })
        sql += " limit "+ page + ",6";

        console.log(sql);
        db.query(sql, function(err, data) {
            rep.send({ data: data });
        })
    }else{
        console.log(text);
        let sql = "select * from idiom where derivation like ";
        text.forEach(function(value, index){
            sql +="'%"+value+"%'";
            if(index<text.length-1)
                sql +=" or ";
        })
        sql += " limit "+ page + ",6";

        console.log(sql);
        db.query(sql, function(err, data) {
        rep.send({ data: data });
    })
    }
    
})

module.exports = router;