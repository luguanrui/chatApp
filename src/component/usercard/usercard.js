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