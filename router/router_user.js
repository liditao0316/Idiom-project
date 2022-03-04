const db = require('../db/db');
const express = require('express');

const router = express.Router();

//获取用户信息,判断用户是否存在
//传入用户名id
router.post('/getUser',function(req,res){
    let{id} = req.body;
    db.query("select * from user where id ="+id+"'",function(err,data){
        res.send(data);
    })

})
//登陆验证
//传入用户名username,password
router.post('/login',function(req,res){
    let {username,password} = req.body;
    db.query("select * from user where username ='"+username+"'",function(err,data){
        console.log(data[0]);
        if(data == ''){
            res.send({status:400})
        }else if(data[0].password === password){
            console.log(data);
            res.send({status:200,msg:"登陆成功",id:data[0].id});
        }else{
            res.send({status:401,msg:"密码错误",id:data[0].id});
        }
        
    })
})

//插入用户数据
//传入username，password参数
router.post('/insertUser',function(req,res){
    let {username,password} = req.body;
    db.query("select * from user where username ='"+username+"'",function(err,data){
        if(data == ''){
            db.query("insert into user(username,password) values('"+username+"','"+password+"')",function(err,data){
                res.send({status:200,msg:"插入成功"})
            })
        }else{
            res.send({status:401,msg:"用户名已经存在，请重试"});
        }
        
    })
})

module.exports = router;