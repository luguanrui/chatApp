const express = require('express')
const userRouter = require('./user')

const app = express()

//前缀 /user,后缀 /info。即子路由是/info
app.use('/user',userRouter)

app.listen(9093, function () {
    console.log('Node app start at port 9093')
})