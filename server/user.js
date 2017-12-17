const express = require('express');
// md5加密
const utils = require('utility');
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
    const {user, pwd, type} = req.body;
    // 查询一条user信息（因为user唯一）
    User.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        // pwd加密
        User.create({user, type, pwd: md5Pwd(pwd)}, function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
    })
})

// md5加盐
function md5Pwd(pwd) {
    const salt = 'imooc_is_good_2432342342!@#$%^fsddJJKK';
    return utils.md5(utils.md5(pwd + salt));

}

module.exports = Router;