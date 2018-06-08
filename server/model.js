/**
 * mongoose的工具函数库
 */

const mongoose = require('mongoose');

// 连接mongodb,并且使用chat这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/chat';
mongoose.connect(DB_URL);

// 定义模型models，用户批量生成模型
const models = {
    // 用户
    user: {
        'user': {type: String, require: true},
        "pwd": {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},     // 头像
        'desc': {type: String},   // 个人简介或者职位简介
        'title': {type: String}, // 职位

        // 如果是boss还有两个字段
        'company': {type: String}, // 所属公司
        'money': {type: String} // 开出的工资
    },
    // 聊天信息
    chat: {
        'chatid': {type: String, require: true},// 每条信息的id
        'from': {type: String, require: true}, // 每条信息来源
        'read': {type: Boolean, default: false}, // 信息是否已读
        'to': {type: String, require: true}, // 每条信息去向
        'content': {type: String, require: true, default: ''}, // 每条信息的内容
        'create_time': {type: Number, default: new Date().getTime()}// 每条信息创建的时间
    }
};

// 循环models，批量生成模型，实例化document对象
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    // 读取模块名
    getModel: function (name) {
        return mongoose.model(name)
    }
};