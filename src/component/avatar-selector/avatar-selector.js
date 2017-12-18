import React from 'react'
import PropTypes from 'prop-types'
import {List, Grid} from 'antd-mobile'

class AvatarSelector extends React.Component {
    // 属性验证
    static propsTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // 定义所有头像的名称
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../../img/${v}.png`),
                text: v
            }));

        // 已经选择的表格，根据state是否存在text字段判断是否选择了头像
        const gridHeader = this.state.text ?
                                            <div>
                                                <span>已选择头像</span>
                                                <img src={this.state.icon} alt="" style={{width: 20,verticalAlign:'top',marginLeft:'10px'}}/>
                                            </div>
                                            : <div>请选择头像</div>;
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm => {
                            // 从父组件bossinfo传过来的参数selectAvatar()方法，传入参数elm.text，父元素拿到参数，将参数赋值给state
                            this.props.selectAvatar(elm.text);
                            // 将已选中的elm对象传递到state中
                            this.setState(elm);
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;