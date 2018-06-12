import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'


@connect(
    state => state
)
class Msg extends React.Component {

    // 获取数组最后一个
    getLast(arr) {
        return arr[arr.length - 1]
    }

    render() {
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
        const chatList = Object.values(msgGroup) // 数组
        // console.log(chatList)
        return (
            <div>

                {chatList.map(v => {
                    const lastItem = this.getLast(v)
                    const targetId = v[0].from == userid ? v[0].to : v[0].from
                    if (!userinfo[targetId]) {
                        return null
                    }
                    return (
                        <List key={lastItem._id}>
                            <Item
                                thumb={require(`../../img/${userinfo[targetId].avatar}.png`)}
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