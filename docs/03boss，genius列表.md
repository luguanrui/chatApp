# boss和genius列表

底部tab有四个页面：boss，genius，me，msg

4个页面有共同的结构header，导航，

因此用一个组件 Dashboard 将这四个页面包裹起来

在index.js中，引用组件Dashboard：

	  <Provider store={store}>
	        <BrowserRouter>
	            <div>
	                <AuthRoute></AuthRoute>
	                <Switch>
	                    <Route path='/bossinfo' component={BossInfo}></Route>
	                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
	                    <Route path='/login' component={Login}></Route>
	                    <Route path='/register' component={Register}></Route>
	                    <Route component={Dashboard}></Route>
	                </Switch>
	            </div>
	        </BrowserRouter>
	    </Provider>
	    
> 使用switch包裹起来，路由只会匹配到第一个，否则每个页面都会匹配到Dashboard这个组件

	    
### dashboard.js

src/component/dashboard/dashboard.js：登录成功之后所有的页面都归dashboard管理

数据结构：

	const navList = [
	    {
	        path: '/boss', // boss看到的是牛人的列表
	        text: '牛人',
	        icon: 'boss',
	        title: '牛人列表',
	        component: Boss,
	        hide: user.type === 'genius' // 隐藏导航栏，需要根据redux中的数据进行判断
	    },
	    {
	        path: '/genius', // 牛人看到是boss的列表
	        text: 'boss',
	        icon: 'job',
	        title: 'BOSS列表',
	        component: Genius,
	        hide: user.type === 'boss'
	    },
	    {
	        path: '/msg',
	        text: '消息',
	        icon: 'msg',
	        title: '消息列表',
	        component: Msg,
	    },
	    {
	        path: '/me',
	        text: '我',
	        icon: 'user',
	        title: '个人中心',
	        component: User,
	    }
	];
	
1、导航头部

	const {pathname} = this.props.location;
	
	<NavBar className='fixed-header' mode='dard'>
	    {navList.find(v => v.path === pathname).title}
	</NavBar>	

2、路由

	<Switch>
	    {navList.map(v => (
	        <Route key={v.path} path={v.path} component={v.component}></Route>
	    ))}
	</Switch>
	
	
3、导航尾部		
	
	<NavLinkBar data={navList}></NavLinkBar>

抽象组件TabBar封装为NavLinkBar：src/component/navlink/navlink.js

	// 底部导航
	import React from 'react'
	import PropTypes from 'prop-types'
	import {withRouter} from 'react-router-dom'
	import {TabBar} from 'antd-mobile'
	
	// 因为该组件不是路由组件，所以使用@witchRouter将location，history，match三个对象传入
	@withRouter
	class NavLinkBar extends React.Component {
	
	    // 组件传递参数校验，使用static关键字创建属于该类的属性和方法
	    static propTypes = {
	        data: PropTypes.array.isRequired
	    };
	
	    render() {
	        // 过滤掉hide为true的数据，保留已经隐藏的数据
	        const navList = this.props.data.filter(v => !v.hide);
	        // 获取pathname
	        const {pathname} = this.props.location;
	        return (
	            <TabBar>
	                {navList.map(v => (
	                    <TabBar.Item
	                        key={v.path}
	                        title={v.text}
	                        icon={{uri: require(`./img/${v.icon}.png`)}}
	                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
	                        selected={pathname === v.path}
	                        onPress={() => {
	                            this.props.history.push(v.path)
	                        }}
	                    >
	
	                    </TabBar.Item>
	                ))}
	            </TabBar>
	        )
	    }
	}
	
	export default NavLinkBar;

> TabBar中本该有boss genius me msg 这个四个页面，但是由于boss和genius只能显示其中之一，只显示三个tabbar，故而需要添加字段hide


## redux

创建：

1. 定义常量：const USER_LIST = 'USER_LIST'
2. 创建action createor函数：
		
		function userList(data) {
		    return {type: USER_LIST, payload: data};
		}

3. 定义异步获取数据函数，由boss.js中的@connect()传入
		
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


4. 创建reducer函数，传入state，action,合并reducer之后，在@connect(state=>state. chatUser)

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

5. 在reducer.js中合并reducer：
	
		// 合并所有的reducer，并且返回
		import {combineReducers} from 'redux'
		import {user} from './redux/user.redux'
		import {chatUser} from './redux/chatuser.redux'
		export default combineReducers({user, chatUser})
	
6. 在boss.js中使用connect：

		import {connect} from 'react-redux'
		import {getUserList} from '../../redux/chatuser.redux'
		@connect(
		    state => state.chatUser,
		    {getUserList}
		)
		class Boss extends React.Component{
		 componentDidMount() {
		        this.props.getUserList('genius');
		 }
		 ...
		 	this.props.userList.map()
		 ...
		}


redux/chatuser.redux.js
	
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
	
	
## 优化

由于boss和列表和genius列表内容差不多，所以会出现代码重复的情况，因此需要抽离组件usercard

### usercard	

可能会出现的重复代码
	
	<WingBlank>
	    {this.props.userList.map(v => (
	        // 如果用户没有头像就不显示
	        v.avatar ?
	            <div key={v._id}>
	                <WhiteSpace></WhiteSpace>
	                <Card>
	                    <Header
	                        title={v.user}
	                        thumb={require(`../../img/${v.avatar}.png`)}
	                        extra={<span>{v.title}</span>}
	                    >
	                    </Header>
	                    <Body>
	                    {
	                        // 换行
	                        v.desc.split('\n').map(v => (
	                            <div key={v}>{v}</div>
	                        ))
	                    }
	                    </Body>
	                </Card>
	            </div>
	            : null
	    ))}
	</WingBlank>

component/usercard/usercard.js

	import React from 'react'
	import PropTypes from 'prop-types'
	import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
	
	class UserCard extends React.Component {
	
	    static propTypes = {
	        userList: PropTypes.array.isRequired
	    }
	
	    render() {
	        const Header = Card.Header;
	        const Body = Card.Body;
	        return (
	            <WingBlank>
	                {this.props.userList.map(v => (
	                    // 如果用户没有头像就不显示
	                    v.avatar ?
	                        <div key={v._id}>
	                            <WhiteSpace></WhiteSpace>
	                            <Card>
	                                <Header
	                                    title={v.user}
	                                    thumb={require(`../../img/${v.avatar}.png`)}
	                                    extra={<span>{v.title}</span>}
	                                >
	                                </Header>
	                                <Body>
	                                {
	                                    // 企业登录显示招聘的公司名
	                                    v.type === 'boss' ? <div>公司：{v.company}</div> : null
	                                }
	                                {
	                                    // 换行
	                                    v.desc.split('\n').map(d => (<div key={d}>{d}</div>))
	                                }
	                                {
	                                    // 企业登录显示招聘的薪资
	                                    v.type === 'boss' ? <div>薪资：{v.money}</div> : null
	                                }
	                                </Body>
	                            </Card>
	                        </div>
	                        : null
	                ))}
	            </WingBlank>
	        )
	    }
	}
	
	export default UserCard
	
	
component/boss/boss.js

	import React from 'react'
	import {connect} from 'react-redux'
	import {getUserList} from '../../redux/chatuser.redux'
	import UserCard from '../usercard/usercard'
	
	@connect(
	    state => state.chatUser,
	    {getUserList}
	)
	class Boss extends React.Component {
	    componentDidMount() {
	        this.props.getUserList('genius');
	    }
	
	    render() {
	        return <UserCard userList={this.props.userList}/>
	    }
	}
	
	export default Boss

component/genius/genius.js

	import React from 'react'
	import {connect} from 'react-redux'
	import {getUserList} from '../../redux/chatuser.redux'
	import UserCard from '../usercard/usercard'
	
	@connect(
	    state => state.chatUser,
	    {getUserList}
	)
	class Genius extends React.Component {
	    componentDidMount() {
	        this.props.getUserList('boss');
	    }
	
	    render() {
	
	        return <UserCard userList={this.props.userList}/>
	    }
	
	}
	
	export default Genius
		



	







