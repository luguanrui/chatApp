import React from 'react'
import {List, InputItem, NavBar, Icon, Toast, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        // 在dashboard获取getMsgList，recvMsg
        // 解决刷新没有调用接口的问题
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        this.fixCarousel()

    }

    // 修正Emoji的轮播bug
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleSubmit() {
        // 发送数据给后台
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        if (!msg) {
            Toast.info('发送的内容不能为空！', 1);
        } else {
            this.props.sendMsg(from, to, msg)
            // 清空text
            this.setState({text: '', showEmoji: false})
        }
    }

    render() {
        const emoji = '😄 😃 😀 😊 ☺ 😉 😍 😘 😚 😗 😙 😜 😝 😛 😳 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😓 😩 😫 😨 😱 😠 😡 😤 😖 😆 😋 😷 😎 😴 😵 😲 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌ 👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝ 👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎'
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}))

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) {
            // 获取不到用户信息，当前组件不渲染
            return null
        }
        // 区分聊天记录，数据过滤
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id="chat-page">
                {/* 聊天记录 */}
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>

                {chatmsg.map(v => {
                    // 定义头像
                    const avatar = require(`../../img/${users[v.from].avatar}.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>

                    ) : (
                        <List key={v._id}>
                            <Item className="chat-me" extra={<img src={avatar} alt=""/>}>{v.content}</Item>
                        </List>
                    )
                })}

                {/* 底部footer 输入框*/}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入...'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span style={{marginRight: 10}} onClick={() => {
                                        this.setState({showEmoji: !this.state.showEmoji});
                                        this.fixCarousel()
                                    }}>😀</span>
                                    <span onClick={() => {
                                        this.handleSubmit()
                                    }}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {
                        this.state.showEmoji ? (
                            <Grid
                                data={emoji}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={el => {
                                    // console.log(el)
                                    this.setState({
                                        text: this.state.text + el.text
                                    })
                                }}
                            />
                        ) : null
                    }

                </div>
            </div>
        )
    }
}

export default Chat