const app = getApp()

//登陆页面
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {
    
  },

  //发送后台，注册用户个人信息
  regUserProfile: function (userInfo) {
    if (app.globalData.openid=='') {
      wx.showModal({title: '警告',content: '网络未准备好，请稍后再试',showCancel: false,confirmText: '返回'});
      return;
    }

    wx.request({
      url: app.globalData.walletServerPath,
      data: {
        func: 'RegUserProfile',         //action
        openid: app.globalData.openid,
        nickName: userInfo.nickName,     //用户昵称,
        avatarUrl: userInfo.avatarUrl,   //用户头像地址,
        gender: userInfo.gender,         //用户性别,
        province: userInfo.province,     //所在省,
        city: userInfo.city,             //所在市,
        country: userInfo.country,       //所在国家,
        control: 'wechat',               //控制器
        oemInfo: { token: app.globalData.token }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        //从数据库获取用户信息
        console.log(res.data)
        if (res.data.errcode == 'success') {
          let path = app.globalData.walletClientPath + '/#/mine?openid=' + app.globalData.openid + '&t=' + (new Date().getTime())
          wx.navigateTo({
            url: '/pages/index/index?path=' + path
          })
        }
      }
    })
    
  },
  
  //获取用户信息接口
  getUserInfo: function (e) {
    console.log(e.detail.errMsg);
    if (e.detail.errMsg !== "getUserInfo:ok") {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    } else {
      app.globalData.userInfo = e.detail.userInfo
      //开始注册用户个人信息
      this.regUserProfile(app.globalData.userInfo);
    }
  }

})