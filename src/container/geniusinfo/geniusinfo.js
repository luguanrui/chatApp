import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'

import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            desc: '',
        };
        this.handleSelect = this.handleSelect.bind(this)
    }

    // input改变时state数据变化
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    // 将选中的img的name传入state中的avatar字段中，handleSelect需要绑定this
    handleSelect(imgName) {
        this.setState({
            avatar: imgName
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {/*路由跳转*/}
                {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}

                <NavBar mode="dark">牛人完善信息页面</NavBar>
                {/*头像选择*/}
                <AvatarSelector
                    selectAvatar={this.handleSelect}
                />

                <InputItem
                    onChange={v => this.onChange('title', v)}
                >
                    求职岗位
                </InputItem>

                <TextareaItem
                    onChange={v => this.onChange('desc', v)}
                    title="个人简介"
                    rows={3}
                    autoHeight
                />
                <Button
                    type='primary'
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >
                    保存
                </Button>

            </div>
        )
    }
}

export default GeniusInfo;