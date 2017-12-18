import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'

import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar:'',
            title: '',
            company: '',
            money: '',
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
    handleSelect(imgName){
        this.setState({
            avatar:imgName
        })
    }
    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS完善信息页面</NavBar>
                {/*头像选择*/}
                <AvatarSelector
                    selectAvatar={this.handleSelect}
                />

                <InputItem
                    onChange={v => this.onChange('title', v)}
                >
                    招聘职位
                </InputItem>

                <InputItem
                    onChange={v => this.onChange('company', v)}
                >
                    公司名称
                </InputItem>

                <InputItem
                    onChange={v => this.onChange('money', v)}
                >
                    职位薪资
                </InputItem>

                <TextareaItem
                    onChange={v => this.onChange('desc', v)}
                    title="职位要求"
                    rows={3}
                    autoHeight
                />
                <Button type='primary'>保存</Button>

            </div>
        )
    }
}

export default BossInfo;