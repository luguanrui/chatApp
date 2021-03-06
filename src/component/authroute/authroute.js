/**
 * 只负责获取用户的信息，并且进行简单的跳转
 */
import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {
    componentDidMount() {
        // 如果是路由地址是login，register的话，则不需要获取用户信息
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }

        // 获取用户信息
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // 有登录信息
                        this.props.loadData(res.data.data);
                    } else {
                        // undefined,使用withRouter包裹外层的class组件
                        // console.log(this.props.history)
                        this.props.history.push('/login');
                    }
                }
            })

        // 是否登录
        // 现在的url地址，login是不需要跳转的
        // 用户的type，身份是boss还是牛人
        // 用户是否完善信息（选择头像，个人简介）
    }

    render() {
        return null;
    }
}

export default AuthRoute