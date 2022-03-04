const db = require('../db/db.js')
const app = require('express');
const url = require("url");
const http = require("http");
const router = app.Router();

//分页故事查询
router.post('/selectStoryPage',function(req,res){
    let start = req.body.start;
    console.log(req.body);
    db.query("select * from story limit "+start+",6",function(err,data){
        res.send(data);
    })
})

//模糊查询 //前端发送 word数据
router.post('/selectStoryByword',function(req,res){
    let start = req.body.word;
    db.query("select * from story where idiom='%"+word+"%'",function(err,data){
        res.send(data);
    })
})

//单一成语故事查询
router.post('/selectStoryOne',function(req,res){
    let idiom = req.body.idiom;
    db.query("select * from story where idiom='"+idiom+"'",function(err,data){
        res.send(data);
    })
})

//插入
router.post('/insertStory',function(req,res){
    let {idiom,story} = req.body;
    db.query("insert into story values(,"+idiom+","+story+")",function(err,data){
        if (data.affectedRows == 1) {
            res.send({});
        } else {
            res.send({});
        }
    })
})

//删除
router.post('/deleteStory',function(req,res){
    let id = req.body.id;
    db.query("delete from story where id="+id,function(err,data){
        if (data.affectedRows == 1) {
            res.send({});
        } else {
            res.send({});
        }
    })
})

//更新



router.get('username',function(req,rep){
    console.log(3456);
})

module.exports = router;



