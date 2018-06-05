# boss和genius列表

boss genius me msg 4个页面有共同的结构header，导航，因此用一个组件dashboard将这四个页面包裹起来

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

src/component/dashboard/dashboard.js：登录成功之后所有的页面都归dashboard管理


### antd-mobile组件

import {NavBar, TabBar} from 'antd-mobile'

[TabBar](https://mobile.ant.design/components/tab-bar-cn/)

抽象组件TabBar封装：src/component/navlink/navlink.js

	// 底部导航
	import React from 'react'
	import PropTypes from 'prop-types'
	import {withRouter} from 'react-router-dom'
	import {TabBar} from 'antd-mobile'
	
	// 因为该组件不是路由组件，所以使用@witchRouter将location，history，match三个对象传入
	@withRouter
	class NavLinkBar extends React.Component {
	
	    // 组件传递参数校验
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

创建redux/chatuser.redux.js









