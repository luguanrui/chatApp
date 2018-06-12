import React from 'react'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import {NavBar} from 'antd-mobile'

import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import {getMsgList, recvMsg} from '../../redux/chat.redux'

// 获取用户信息getMsgList
@connect(
    state => state,
    {getMsgList, recvMsg}
)
class Dashboard extends React.Component {

    // 获取聊天信息和接收聊天信息
    componentDidMount() {
        // 防止页面切换多次绑定socket，数据被污染
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render() {
        const user = this.props.user;
        const {pathname} = this.props.location;
        // 该数组包含页面的名字，跳转的连接，显示的文字
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
        return (
            <div>
                {/*导航头部*/}
                <NavBar className='fixed-header' mode='dard'>
                    {navList.find(v => v.path === pathname).title}
                </NavBar>
                <div>
                    {/*页面跳转，渲染四个路由组件*/}
                    <Switch>
                        {
                            navList.map(
                                v => (<Route key={v.path} path={v.path} component={v.component}></Route>)
                            )
                        }
                    </Switch>
                </div>
                {/*导航尾部*/}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard;