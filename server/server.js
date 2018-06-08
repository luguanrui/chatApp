const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const model = require('./model');
// 获取模型
const Chat = model.getModel('chat');

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
    // console.log('user login')
    // 监听sendmsg，socket是当前连接的请求
    socket.on('sendmsg', function (data) {
        // console.log(data)
        // 发送给全局
        // io.emit('recvmsg', data)
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            // console.log(doc)
            // 发送给全局，客户端的redux中监听recvmsg函数，接收数据
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})

const userRouter = require('./user')

// 解析cookie
app.use(cookieParser())

// 解析post提交的json数据
app.use(bodyParser.json())

//前缀 /user,后缀 /info。即子路由是/info
app.use('/user', userRouter)

server.listen(9093, function () {
    console.log('Node app start at port 9093')
})

// app.listen(9093, function () {
//     console.log('Node app start at port 9093')
// })