import flag from '../cloud/flag';
const { success, fail } = flag;
export default class {
    static showActionSheet(itemList = ['确认']) {
        return new Promise((resole, reject) => {
            wx.showActionSheet({
                itemList:[...itemList,'取消'],
                success(e) {
                    console.info('showActionSheet success', e)
                    resole(e.tapIndex);
                },
                fail(e) {
                    console.info('showActionSheet fail', e)
                },
            });
        })
    }
    static navi(url) {
        wx.navigateTo({
            url
        })
    }
    static goback(delta = 1) {
        wx.navigateBack({
            delta
        })
    }
    static toastError(title = '添加失败') {
        wx.showToast({
            icon: 'none',
            mask: true,
            title
        })
    }
    static gobackWhenSuccess(res) {
        if (res === fail) {
            Utils.toastError();
            return;
        }
        this.goback();
    }
    static arr_splice(arr, idx) {
        arr.splice(idx, 1);
    }
    static getOpenid() {
        return new Promise((res, rej) => {
            wx.cloud.callFunction({
                // 云函数名称
                name: 'getOpenid',
                // 传给云函数的参数
                success(d) {
                    res(d.result.openId);
                },
                fail(e) {
                    rej(e)
                }
            });
        })

    }
    static loading(){
        wx.showLoading({
            title:'加载中',
            mask:true,
        })
    }
    static loaded(){
        wx.hideLoading()
    }
} 