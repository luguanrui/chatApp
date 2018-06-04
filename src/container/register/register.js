import React from 'react'
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../component/logo/logo'
import {register} from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: "",
            type: 'genius' //默认牛人
        };
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleRegister() {
        // 将this.state传入register()函数中
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {/*路由跳转*/}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                {/*注册失败信息提示*/}
                {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                <List>
                    <InputItem
                        clear
                        placeholder="请输入用户名"
                        onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem
                        clear
                        type='password'
                        placeholder="请输入密码"
                        onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <InputItem
                        clear
                        type='password'
                        placeholder="请确认密码"
                        onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <RadioItem
                        checked={this.state.type === 'genius'}
                        onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem
                        checked={this.state.type === 'boss'}
                        onChange={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>
                </List>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
            </div>
        )
    }
}

export default Register