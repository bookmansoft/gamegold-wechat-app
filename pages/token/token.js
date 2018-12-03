const app = getApp()

//登陆页面
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canToken: true,
    cid: '',
    returl: '',
    notifyurl: '',
    uid: '',
    tokening: false,
    isToken: false
  },
  
  onLoad: function (options) {
    if (options.hasOwnProperty('cid') && options.hasOwnProperty('uid') && options.hasOwnProperty('notifyurl')
      && options.hasOwnProperty('returl')) {
      this.setData({
        canToken: true,
        cid: options.cid,
        uid: options.uid,
        notifyurl: options.notifyurl,
        returl: options.returl
      });
    }
  },
  
  //申请令牌
  userToken: function (e) {
    if (app.globalData.openid == '') {
      wx.showModal({ title: '警告', content: '网络未准备好，请稍后再试', showCancel: false, confirmText: '返回' });
      return;
    }
    var that = this;
    that.setData({ tokening: true });
    wx.request({
      url: app.globalData.walletServerPath,
      data: {
        func: 'UserToken',         //action
        openid: app.globalData.openid,
        uid: that.data.uid,
        cid: that.data.cid,
        control: 'cp',               //控制器
        oemInfo: { token: app.globalData.token }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        //返回信息
        console.log(res.data)
        that.setData({ tokening: false, isToken: true });
        let path = that.data.returl
        console.log('returl', path)
        that.orderNotify(that.data.notifyurl, res.data.ret);
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/cp/index?path=' + path
          })
        }, 1500);
      }
    })
  },

  orderNotify: function (notifyurl, tokenRet) {
    let that = this;
    console.log('notifyurl', notifyurl);
    wx.request({
      url: notifyurl,
      data: {
        func: 'UserTokenNotify',         //action
        token: tokenRet,
        cid: that.data.cid,
        uid: that.data.uid,
        control: 'cpuser',               //控制器
        oemInfo: { token: app.globalData.token }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        //返回信息
        console.log(res.data)
      }
    })
  }

})