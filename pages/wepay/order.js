const app = getApp()

//订单支付
Page({
  data: {
    uid: '',
    price: '',
    returl: '',
    productInfo: '',
    tradeId: '',
    isPay: false,
    paying: false,
    payMsg: '已支付成功',
    canIPay: true
  },
  
  //初始化参数
  onLoad: function (options) {
    if (options.hasOwnProperty('price') && options.hasOwnProperty('uid') && options.hasOwnProperty('tradeId') 
    && options.hasOwnProperty('returl') && options.hasOwnProperty('productInfo') ) {
      this.setData({
        uid: options.uid,
        productInfo: options.productInfo,
        price: options.price,
        returl: options.returl,
        tradeId: options.tradeId
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
        func: 'UnifiedOrder',         //action
        productInfo: that.data.productInfo,
        uid: that.data.uid,
        price: that.data.price,
        tradeId: that.data.tradeId,
        openid: app.globalData.openid,
        control: 'wechat',               //控制器
        oemInfo: { token: app.globalData.token }
      },
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        //返回信息
        console.log(res.data)
        if(res.data.errcode == 'success') {
          let unifiedOrder = res.data.unifiedOrder
          wx.requestPayment({
            'timeStamp': unifiedOrder.timeStamp,
            'nonceStr': unifiedOrder.nonceStr,
            'package': unifiedOrder.package,
            'signType': unifiedOrder.signType,
            'paySign': unifiedOrder.paySign,
            'success': function (res) {
              console.log('pay success', res)
              that.setData({ isPay: true });
              that.setData({ paying: false });
              that.orderNotify(app.globalData.walletServerPath);
              let path = that.data.returl
              setTimeout(function () {
                /*
                wx.navigateTo({
                  url: '/pages/index/index?path=' + path
                })
                */
                wx.navigateBack()
              }, 1500);
            },
            'fail': function (res) {
              console.log('pay fail', res)
              that.setData({ paying: false });
            }
          })
        }
      }
    })
  },

  orderNotify: function(notifyurl) {
    let that = this;
    console.log('notifyurl', notifyurl);
    wx.request({
      url: notifyurl,
      data: {
        func: 'OrderPayResutl',         //action
        uid: that.data.uid,
        tradeId: that.data.tradeId,
        status: 1,
        msg: 'success',
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
      }
    })
  }

})