import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux'


@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        // 设置一个状态
        this.state = {
            user: '',
            pwd: ''
        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    register() {
        this.props.history.push('/register')
    }

    /**
     * 输入框内容改变监控函数
     * @param key
     * @param val
     */
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    /**
     * 登录点击事件
     */
    handleLogin() {
        // login是redux给的
        this.props.login(this.state);
    }

    render() {
        return (
            <div>
                {/*路由跳转*/}
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <h2>登录页面</h2>
                <WingBlank>
                    <List>
                        {/*登录失败信息提示*/}
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => {
                                this.handleChange('user', v)
                            }}
                        >
                            用户
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => {
                                this.handleChange('pwd', v)
                            }}
                            type='password'
                        >
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login