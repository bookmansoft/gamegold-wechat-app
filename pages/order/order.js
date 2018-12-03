const app = getApp()

//订单支付
Page({
  data: {
    cid: '',
    uid: '',
    sn: '',
    price: '',
    returl: '',
    notifyurl: '',
    isPay: false,
    paying: false,
    payMsg: '已支付成功',
    canIPay: true
  },
  
  //初始化参数
  onLoad: function (options) {
    if (options.hasOwnProperty('sn') && options.hasOwnProperty('cid') && options.hasOwnProperty('price')
      && options.hasOwnProperty('uid') && options.hasOwnProperty('returl') && options.hasOwnProperty('notifyurl') ) {
      this.setData({
        cid: options.cid,
        uid: options.uid,
        sn: options.sn,
        price: options.price,
        returl: options.returl,
        notifyurl: options.notifyurl
      });
    } else{
      this.setData({canIPay: false});
    }
    console.log('options', options);
  },

  //开始支付
  payNow: function() {
    if (app.globalData.openid == '') {
      wx.showModal({title: '警告',content: '网络未准备好，请稍后再试',showCancel: false, confirmText: '返回'});
      return;
    }

    let that = this;
    that.setData({paying: true});

    wx.request({
      url: app.globalData.walletServerPath,
      data: {
        func: 'OrderPay',         //action
        cid: that.data.cid,
        uid: that.data.uid,
        sn: that.data.sn,
        price: that.data.price,
        openid: app.globalData.openid,
        control: 'order',               //控制器
        oemInfo: { token: app.globalData.token }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        //返回信息
        console.log(res.data)
        if (res.data.errcode == 'success') {
          that.setData({isPay: true});
        }
        that.setData({paying: false});
        let path = that.data.returl
        console.log('returl', path)
        that.orderNotify(that.data.notifyurl);
        setTimeout(function (){
          wx.navigateTo({
            url: '/pages/cp/index?path=' + path
          })
        }, 1500);

      }
    })
  },

  orderNotify: function(notifyurl) {
    let that = this;
    console.log('notifyurl', notifyurl);
    wx.request({
      url: notifyurl,
      data: {
        func: 'OrderNotify',         //action
        cid: that.data.cid,
        sn: that.data.sn,
        status: 1,
        msg: 'success',
        control: 'cporder',               //控制器
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