//index.js
//获取应用实例
const app = getApp()

//首页
Page({
  data: {
    motto: '加载中...',
    path: '',
    hasOpenId: false,
  },
  onLoad: function (options) {
    if (app.globalData.openid != '') {
      let path = app.globalData.walletClientPath + '/?openid=' + app.globalData.openid + '&t=' + new Date().getTime()
      if (options.hasOwnProperty('path')) {
        path += '&path=' + options.path;
      } 
      console.log('path111', path)
      this.setData({ hasOpenId: true, path: path })

    } else {
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback', res.path);
        this.setData({hasOpenId: true, path: res.path });
      }
    }
  }
})
