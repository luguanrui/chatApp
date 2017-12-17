const express = require('express');
const Router = express.Router();
const model = require('./model');

// 获取模型
const User = model.getModel('user');

// 查询用户信息 /user/info
Router.get('/info', function (req, res) {
    // 用户有没有cookie
    return res.json({code: 1})
});

// 查询用户列表,/user/list
Router.get('/list', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
});

// 注册接口,需要引入插件body-parser，专门接受post参数
Router.post('/register', function (req, res) {
    console.log(res.body);
    const {user, pwd, type} = req.body;
    // 查询一条user信息（因为user唯一）
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        User.create({user, pwd, type}, function (e, d) {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
    })
})


module.exports = Router;