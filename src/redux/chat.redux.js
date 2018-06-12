/**
 * 聊天redux
 *
 * 1、获取聊天记录，
 * 2、读取聊天信息，
 * 3、标记消息是否已读
 */
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标记已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

// reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                users: action.payload.users,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
            }
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1 : 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread + n
            }
        case MSG_READ:
            return state
        default:
            return state
    }
}

// action creator
function msgList(msgs, users, userid) {
    return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv(msg, userid) {
    return {userid, type: MSG_RECV, payload: msg}
}

function msgRead(data) {
    return {type: MSG_READ, payload: data}
}

/**
 * dispatch action
 * 参数dispatch,getState都是函数
 * @returns {function(*, *)}
 */
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                // 获取当前登录用户的id
                const userid = getState().user._id
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
    }
}

// sendmsg，将数据发送给后台
export function sendMsg(from, to, msg) {
    return () => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

// recvmsg，接受后台的数据
export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            // console.log('recvmsg')
            // 获取当前登录用户的id
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}