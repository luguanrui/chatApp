import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux'
import chatForm from '../../component/chat-form/chat-form' // 高阶组件

@connect(
    state => state.user,
    {login}
)
@chatForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        // 初始化状态
        // this.state = {
        //     user: '',
        //     pwd: ''
        // };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleRegister() {
        // 去注册
        this.props.history.push('/register')
    }

    handleLogin() {
        // 传输数据调用登录的接口
        // this.props.login(this.state);
        this.props.login(this.props.state);
    }

    /**
     * 输入框内容改变监控函数
     * @param key
     * @param val
     */
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     });
    // }

    render() {
        return (
            <div>
                {/*路由跳转*/}
                {this.props.redirectTo && this.props.redirectTo !== '/login' ?
                    <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                    {/*登录失败信息提示*/}
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            placeholder="请输入用户名"
                            clear
                            onChange={v => {
                                this.props.handleChange('user', v)
                            }}>用户名</InputItem>

                        <InputItem
                            type='password'
                            placeholder="请输入您的密码"
                            clear
                            onChange={v => {
                                this.props.handleChange('pwd', v)
                            }}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login