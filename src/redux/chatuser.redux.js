import axios from 'axios'

const USER_LIST = 'USER_LIST'
const initState = {
    userList: []
}

/**
 * reducer chatUser
 * @param state
 * @param action
 * @returns {*}
 */
export function chatUser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList: action.payload}
        default:
            return state
    }
}

function userList(data) {
    return {type: USER_LIST, payload: data};
}

export function getUserList(type) {
    return dispatch => {
        // 获取数据
        axios.get('/user/list?type=' + type)
            .then(res => {
                if (res.data.code === 0) {
                    dispatch(userList(res.data.data))
                }
            })
    }
}