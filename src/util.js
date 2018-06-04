// 工具类函数

/**
 * 获取路由地址
 * 传入注册的信息，根据用户的类型，是boss，就跳转到bossinfo，是genius就跳转到geniusinfo
 * @param type
 * @param avatar
 * @returns {string}
 */
export function getRedirectPath({type, avatar}) {
    // 根据用户信息，返回跳转地址
    // user.type:  /boss, /genius
    // user.avatar: /bossinfo, /geniusinfo
    let url = (type === 'boss') ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url;
}