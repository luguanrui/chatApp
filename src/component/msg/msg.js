import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.Component {

    // 获取数组最后一个
    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
        // console.log(this.props)
        // 根据聊天信息，不同的用户来分组
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users

        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        // 聊天列表
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        }) // 数组排序
        // console.log(chatList)

        return (
            <div>
                {chatList.map(v => {
                    // 取数组最后一个值
                    const lastItem = this.getLast(v)
                    // 获取当前的id
                    const targetId = v[0].from === userid ? v[0].to : v[0].from
                    // 获取未读的信息的条数
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length
                    if (!userinfo[targetId]) {
                        return null
                    }
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../../img/${userinfo[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                                style={{zIndex: 1}}
                            >
                                {lastItem.content}
                                <Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )

    }
}

export default Msg