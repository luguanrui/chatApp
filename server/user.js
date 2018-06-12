const express = require('express');
// md5加密
const utils = require('utility');
const Router = express.Router();
const model = require('./model');

// 获取模型
const User = model.getModel('user');
const Chat = model.getModel('chat');
// 清空chat数据
// Chat.remove({},function (err,doc) {})

// 过滤掉返回的pwd
const _filter = {'pwd': 0, '__v': 0};

// 查询用户信息 /user/info
Router.get('/info', function (req, res) {
    // 用户有没有cookie,会导致跳转的info页面刷新的时候返回到原来的页面
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code: 1})
    }
    // findOne({查询条件},{返回},callback)
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })

});

// 查询用户列表,/user/list
Router.get('/list', function (req, res) {
    // 清空数据库list
    // User.remove({},function (err,doc) {});
    // const type = req.query.type,get参数就用query来获取
    const {type} = req.query;
    // 查找数据库所有内容
    User.find({type}, _filter, function (err, doc) {
        return res.json({code: 0, data: doc})
    });
});

/**
 * 注册接口,需要引入插件body-parser，专门接受post参数
 * 功能：
 * 1、查询，验证用户是否已存在
 * 2、将数据插入数据库
 */
Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body;
    // 查询一条user信息（因为user唯一）
    User.findOne({user: user}, function (err, doc) {
        // 检查用户是否已存在
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)});
        userModel.save(function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = doc;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
});

// 登录接口，查询数据库中是否有用户
// findOne的第二个参数是忽略查询的字段pwd,__v
Router.post('/login', function (req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或者密码错误'})
        }
        // 将数据保存到cookie
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc})
    })

})

// md5加盐
function md5Pwd(pwd) {
    const salt = 'chatApp_GG_55_2432342342!@#$%^fsddJJ~~KK';
    return utils.md5(utils.md5(pwd + salt));

}

// bossinfo数据提交的接口
Router.post('/update', function (req, res) {
    // 1、获取用户登录的cookies的userid
    const userid = req.cookies.userid;
    // 如果用户未登录，返回code：1
    if (!userid) {
        return res.json({code: 1})
    }
    // 提交的数据
    const body = req.body;
    // 查找userid是否存在，跟新body
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        // 合并数据
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({code: 0, data: data});
    })
})

// 获取用户聊天记录
Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid;
    // 查询用户信息，返回user和头像
    User.find({}, function (e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })

        // 查询聊天信息
        // {'$or': [{from: user}, {to: user}]}
        Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})

module.exports = Router;