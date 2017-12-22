import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'

@withRouter
class NavLinkBar extends React.Component {

    // 组件传递参数校验
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    render() {
        // 过滤掉hide为true的数据
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