//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('code', res.code);
        this.getOpenId(res.code);
      }
    })
    // 获取用户信息
    /*
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
    */
  },

  //后台获取 openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: that.globalData.walletServerPath,
      data: {
        func: 'GetOpenId',      //action
        code: code,
        control: 'wechat',      //控制器
        oemInfo: { token: that.globalData.token}
      },
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        //从数据库获取用户信息
        //console.log(res.data)
        if (res.data.errcode == 'success') {

          //保持全局变量openid
          that.globalData.openid = res.data.detail.openid;
          console.log('openid', that.globalData.openid);

          //判断是否有回调
          if (that.userInfoReadyCallback) {
            that.userInfoReadyCallback({ 
              path: that.globalData.walletClientPath + '/?openid=' + that.globalData.openid
            })
          }

        }
      }
    });
  },

  //定义全局变量
  globalData: {
    openid: '',
    userInfo: null,
    walletServerPath: 'http://192.168.1.9:9101/index.html',
    //walletClientPath: 'https://mini.gamegold.xin/wallet',
    walletClientPath: 'http://192.168.1.9:8080',
    token: '9bcf8939a9c96e14700b2209463af411'
  },

})