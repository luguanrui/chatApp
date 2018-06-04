/**
 * 用户信息redux
 */
import axios from 'axios';

import {getRedirectPath} from '../util'

// 状态码
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'Auth_SUCCESS';

/**
 * 用户初始化信息
 * 登录，注册之后，页面的跳转也由redux来实现
 */
const initState = {
    redirectTo: '',//用户注册，登录之后跳转到哪个页面
    isAuth: '',// 是否登录
    msg: '',// 有无报错信息
    user: '',// 用户名
    type: '',// 身份
    pwd: '' // 密码
};

/**
 * user reducer
 * @param state
 * @param action
 * @returns {*}
 */
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', ...action.payload, redirectTo: getRedirectPath(action.payload)};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
        case LOAD_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

function authSuccess(obj) {
    // 过滤掉pwd字段
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESS, payload: data}
}

/**
 * action：错误信息
 * @param msg
 * @returns {{type: string, msg: *}}
 */
function errorMsg(msg) {
    return {msg, type: ERROR_MSG,};
}

/**
 * loadData保存用户信息到redux中，将数据给下一个页面使用
 * @param userinfo
 * @returns {{type: string, payload: *}}
 */
export function loadData(userinfo) {
    return {type: 'LOAD_DATA', payload: userinfo};
}

/**
 * register reducer
 * @param user
 * @param pwd
 * @param repeatpwd
 * @param type
 * @returns {*}
 */
export function register({user, pwd, repeatpwd, type}) {
    // 注册校验
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同');
    }
    // 异步函数,因为需要异步获取数据，参数是dispatch
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

/**
 * 登录函数，发送ajax请求
 * @param user
 * @param pwd
 * @returns {*}
 */
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('输入用户名或者密码');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

/**
 * 从bossinfo.js传入的参数state
 * @param data
 */
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}