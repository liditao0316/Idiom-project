const express = require('express');
//const http = require('http');
const app = express();

//引入中间件，获取请求中body的数据
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// const Router = require('./router/router_story.js');
const Router1 = require('./router/router_explain.js');
const Router2 = require('./router/router_favarite.js');
const Router3 = require('./router/router_story.js');
const Router4 = require('./router/router_user.js');
// app.use(Router);
app.use(Router1);
app.use(Router2);
app.use(Router3);
app.use(Router4);
app.use(express.static('static'));
app.listen(8080, () => {
    console.log("服务器已启动");
})