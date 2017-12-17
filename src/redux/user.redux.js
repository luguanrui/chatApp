/**
 * 用户信息redux
 */
import axios from 'axios';

import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

/**
 * 用户初始化信息
 * 登录，注册之后，页面的跳转也由redux来实现
 */
const initState = {
    redirectTo: '',//路由跳转
    isAuth: '',// 是否登录
    msg: '',// 有没有报错信息
    user: '',// 用户名
    pwd: '',// 密码
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
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
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
 * action：错误信息
 * @param msg
 * @returns {{type: string, msg: *}}
 */
function errorMsg(msg) {
    return {type: ERROR_MSG, msg: msg};
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