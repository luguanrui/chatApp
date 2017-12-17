/**
 * 用户信息redux
 */
import axios from 'axios';

import {getRedirectPath} from '../util'

// 状态码
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA'

/**
 * 用户初始化信息
 * 登录，注册之后，页面的跳转也由redux来实现
 */
const initState = {
    redirectTo: '',//路由跳转
    isAuth: '',// 是否登录
    msg: '',// 有没有报错信息
    user: '',// 用户名
    type: ''// 身份

};

/**
 * reducer
 * @param state
 * @param action
 * @returns {*}
 */
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload, redirectTo: getRedirectPath(action.payload)};
        case LOGIN_SUCCESS:
            return {...state, msg: '', isAuth: true, ...action.payload, redirectTo: getRedirectPath(action.payload)};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
        case LOAD_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

/**
 * action:注册成功
 * @param data
 * @returns {{type: string, payload: *}}
 */
function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data};
}

/**
 * aciton:登录成功
 * @param data
 * @returns {{type: string, payload: *}}
 */
function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}

/**
 * action：错误信息
 * @param msg
 * @returns {{type: string, msg: *}}
 */
function errorMsg(msg) {
    return {type: ERROR_MSG, msg: msg};
}

export function loadData(userinfo) {
    return {type: 'LOAD_DATA', payload: userinfo};
}

/**
 * 单机注册按钮的注册函数
 * @param user
 * @param pwd
 * @param repeatpwd
 * @param type
 * @returns {*}
 */
export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名密码必须输入');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同');
    }
    // 异步函数
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({user, pwd, type}));
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
                    dispatch(loginSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}