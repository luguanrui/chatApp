/**
 * mongoose的工具函数库
 */

const mongoose = require('mongoose');

// 连接mongo,并且使用imooc-chat这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
mongoose.connect(DB_URL);

// 定义模型models，用户批量生成模型
const models = {
    // 用户
    user: {
        'user': {type: String, require: true},
        "pwd": {type: String, require: true},
        'type': {type: String, require: true},
        // 头像
        'avatar': {type: String},
        // 个人简介或者职位简介
        'desc': {type: String},
        // 职位
        'title': {type: String},
        // 如果是boss还有两个字段
        // 所属公司
        'company': {type: String},
        // 开出的工资
        'money': {type: String}
    },
    // 聊天信息
    chat: {}
};

// 循环models，批量生成模型
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
};