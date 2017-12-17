const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const app = express();

// 解析cookie
app.use(cookieParser());

// 解析post提交的json数据
app.use(bodyParser.json());

//前缀 /user,后缀 /info。即子路由是/info
app.use('/user',userRouter);

app.listen(9093, function () {
    console.log('Node app start at port 9093')
});