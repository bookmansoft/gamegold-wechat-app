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
    if (options.hasOwnProperty('path') && app.globalData.openid != '') {
      this.setData({ 
        hasOpenId: true, 
        path: options.path + '/?openid=' + app.globalData.openid
      })
    }
  }
})
