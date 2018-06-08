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
    unread: 0
}

// reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length}
        case MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload]}
        case MSG_READ:
            return state
        default:
            return state
    }
}

// action creator
function msgList(msgs) {
    return {type: MSG_LIST, payload: msgs}
}

function msgRecv(msg) {
    return {type: MSG_RECV, payload: msg}
}

function msgRead(data) {
    return {type: MSG_READ, payload: data}
}

// dispatch action
export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist').then(res => {
            if (res.state === 200 && res.code === 0) {
                dispatch(msgList(res.data.msgs))
            }
        })
    }
}

// sendmsg to admin
export function sendMsg(from, to, msg) {
    return () => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

// dispatch action
export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function (data) {
            console.log('recvmsg')
            dispatch(msgRecv(data))
        })
    }
}