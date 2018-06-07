import React from 'react'
import io from 'socket.io-client'
import {List, InputItem} from 'antd-mobile'

const socket = io('ws://localhost:9093')
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        socket.on('recvmsg', (data) => {
            // console.log(data)
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
    }

    handleSubmit() {
        // console.log(this.state)
        // 发送数据给后台
        socket.emit('sendmsg', {text: this.state.text})
        // 清空text
        this.setState({text: ''})
    }

    render() {
        return (
            <div>
                {/* 聊天记录 */}
                {this.state.msg.map(v => {
                    return <p key={v}>{v}</p>
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
                            extra={<span onClick={() => {
                                this.handleSubmit()
                            }}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat