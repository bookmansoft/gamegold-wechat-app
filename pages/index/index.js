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
      console.log('app.globalData.openid');
      var path = '';
      if (options.hasOwnProperty('path')) {
        path = options.path;
      } else {
        path = app.globalData.walletClientPath + '/?openid=' + app.globalData.openid
      }
      this.setData({hasOpenId: true, path: path })

    } else {
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback', res.path);
        this.setData({hasOpenId: true, path: res.path });
      }
    }
  }
})
