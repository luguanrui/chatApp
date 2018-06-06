import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import BrowserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'


@connect(
    state => state.user,
    {logoutSubmit}
)

class User extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        console.log('退出');
        const alert = Modal.alert;
        alert('注销', '确定退出登录？', [
            {text: '否', onPress: () => console.log('取消退出登录')},
            {
                text: '是', onPress: () => {
                BrowserCookie.erase('userid');
                this.props.logoutSubmit();
            }
            }
        ])
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = List.Item.Brief;
        // console.log(props)
        return props.user ?
            (
                <div>
                    <Result
                        img={<img src={require(`../../img/${props.avatar}.png`)} style={{width: 50}} alt=''/>}
                        title={props.user}
                        message={props.type === 'boss' ? props.company : null}
                    />
                    <List renderHeader={() => '简介'}>
                        <Item multipleLine>
                            {props.title}
                            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                        </Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item onClick={this.handleLogout} style={{zIndex: 20}}>退出登录</Item>
                    </List>
                </div>
            )
            : <Redirect to={props.redirectTo}/>
    }
}

export default User