# 聊天详情

## socket.io

socket.io是什么？

基于事件的实时双向通信库

* 基于websocket协议
* 前后端通过事件进行双向通信
* 配合express快速开发实时应用

socket.io与ajax的区别（socket.io是基于websocket协议的一个库）

* ajax基于HTTP协议，单向，实时获取数据只能轮询
* socket.io基于websocket双向通信协议，后端可以主动推送数据
* 现代浏览器均支持websocket协议

socket.io后台api

* io = require('socket.io')(http)
* io.on() 监听事件
* io.emit() 触发事件

前端配合express

* import io from 'socket.io-client'
* io.on() 监听事件
* io.emit() 触发事件 

## 简单实现

### 安装

安装：socket.io，socket.io-client

	npm i socket.io socket.io-client  -S
	
### 简单实现

src/index.js

	   <Provider store={store}>
	        <BrowserRouter>
	            <div>
	                <AuthRoute></AuthRoute>
	                <Switch>
	                    <Route path='/bossinfo' component={BossInfo}></Route>
	                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
	                    <Route path='/login' component={Login}></Route>
	                    <Route path='/register' component={Register}></Route>
	                    <Route path='/chat/:user' component={Chat}></Route>
	                    <Route component={Dashboard}></Route>
	                </Switch>
	            </div>
	        </BrowserRouter>
	    </Provider>	
	    
> 配置路由，传递参数为user

src/component/chat/chat.js

	import React from 'react'
	import io from 'socket.io-client'
	
	class Chat extends React.Component {
	
		 componentDidMount(){
	 		 // 连接socket 	
	        const socket = io('ws://localhost:9093')
		 }	
		 
	    render() {
	        console.log(this.props)
	        return (
	            <div>chat with user：{this.props.match.params.user}</div>
	        )
	    }
	}
	
	export default Chat
	
src/component/usercard/usercard.js

	import {withRouter} from 'react-router-dom'
	
	@withRouter
	...

	handleClick(v) {
	   this.props.history.push(`/chat/${v.user}`)
	}
	...
	// 传递参数v
	<Card onClick={()=>{this.handleClick(v)}} style={{zIndex: 20}}>...</Card>
	
server/server.js

	// work with express
	const server = require('http').Server(app)
	const io = require('socket.io')(server)
	
	io.on('connection',function (socket) {
	    console.log('user login')
	})
	server.listen(9093, function () {
	    console.log('Node app start at port 9093')
	})		
	
### 前后端实现显示消息

server/server.js

	...
	// work with express
	const server = require('http').Server(app)
	const io = require('socket.io')(server)
	
	io.on('connection',function (socket) {
	    console.log('user login')
	    // 监听sendmsg，socket是当前连接的请求
	    socket.on('sendmsg',function (data) {
	        console.log(data)
	        // 发送给全局
	        io.emit('recvmsg',data)
	    })
	})
	
	server.listen(9093, function () {
	    console.log('Node app start at port 9093')
	})

src/component/chat/chat.js
	
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
			    
	

	