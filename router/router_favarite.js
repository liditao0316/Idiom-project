const db = require('../db/db');
const express = require('express');

const router = express.Router();

//插入收藏的成语 
//接收id，idiom参数
router.post("/insertFavariteIdiom",function(req,res){
    let {id,idiom} = req.body;
    //插入之前判断数据库是否存在该数据
    db.query("select * from idiom where idiom='" + idiom + "'", function(err, data) {
        let explanation = data[0].explanation;
        db.query("select * from favarite_idiom where id="+id+" and idiom='"+idiom+"'",function(err,data2){
            if (data2 == '') {
                db.query("insert into favarite_idiom(id,idiom,explanation) values("+id+",'"+idiom+"','"+explanation+"')",function(err,data3){
                    if (data3 != '') {
                        res.send({status:200});
                    } else {
                        res.send({status:500});
                    } 
                })
            } else {
                res.send({status:200,"err":"数据库已经存在该数据"});
            } 
        })
    })
    
})

//分页查询
//传入用户id,start参数
router.post('/selectFavariteIdiomPage',function(req,res){
    let {id,start} = req.body;
    start = 6*start;
    console.log(start);
    db.query("select idiom,explanation from favarite_idiom where id="+id+" limit "+start+",6",function(err,data){
        console.log(data);
        res.send({data});
    })
})
//删除收藏的成语 
//接收用户id，idiom参数
router.post("/deleteFavariteIdiom",function(req,res){
    let {id,idiom}=req.body;
    db.query("delete from favarite_idiom where id="+id+" and idiom='"+idiom+"'",function(err,data){
        if (data != '') {
            res.send({status:200});
        } else {
            res.send({status:500});
        }
    })
})


//成语故事表接口

//插入收藏的成语故事
//接收用户的id，idiom
router.post("/insertFavariteStory",function(req,res){
    let {id,idiom} = req.body;
    //插入之前判断数据库是否存在该数据
    db.query("select * from story where idiom='"+idiom+"'",function(err,data1){
        let story = data1[0].story;
        console.log(story);
        db.query("select * from favarite_story where id="+id+" and idiom='"+idiom+"'",function(err,data2){
            try {
                console.log(data2);
                if (data2 == '') {
                    db.query("insert into favarite_story(id,idiom,story) values("+id+",'"+idiom+"','"+story+"')",function(err,data3){
                        console.log(data3);
                        if (data3 != '') {
                            res.send({status:200});
                        } else {
                            res.send({status:500});
                        } 
                    })
                } else {
                    res.send({status:200,"err":"数据库已经存在该数据"});
                } 
            } catch (error) {
                console.log(error);
            }
            
        })
    })
    
})

//删除收藏的成语故事
//接收用户id，idiom
router.post("/deleteFavariteStory",function(req,res){
    let {id,idiom}=req.body;
    db.query("delete from favarite_story where id="+id+" and idiom='"+idiom+"'",function(err,data){
        console.log(data);
        if (data != '') {
            res.send({status:200});
        } else {
            res.send({status:500});
        }
    })
})

//分页查询
//传入用户id，start参数
router.post('/selectFavariteStoryPage',function(req,res){
    let {id,start} = req.body;
    start = 6*start;
    console.log(req.body);
    db.query("select idiom,story from favarite_story where id="+id+" limit "+start+",6",function(err,data){
        res.send({data});
    })
})

module.exports = router;
