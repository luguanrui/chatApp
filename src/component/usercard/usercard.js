// 由boss,genius组件抽离出来的组件，显示boss个genius列表
import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    handleClick(v) {
        // 主要实现点击Card路由跳转，带参数
        this.props.history.push(`/chat/${v._id}`)
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
                            <Card onClick={()=>{this.handleClick(v)}} style={{zIndex: 20}}>
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