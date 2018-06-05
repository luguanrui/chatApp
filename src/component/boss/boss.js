import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

@connect(
    state => state.chatUser,
    {getUserList}
)
class Boss extends React.Component {
    componentDidMount() {
        this.props.getUserList('genius');
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
        )
    }
}

export default Boss