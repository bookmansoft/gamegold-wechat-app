const app = getApp()

//道具分享和接收
Page({
  data: {
    prop_name: '屠龙刀',
    prop_icon: 'https://mini.gamegold.xin/cp/hwgl/prop/images/tulongdao.png',
    raw: '',
    act: 'send',
    receiveing: false,
    isReceive: false,
    retMsg: '道具已接收'
  },
  
  //初始化参数
  onLoad: function (options) {
    console.log(options);
    if (options.hasOwnProperty('act') && options.hasOwnProperty('prop_name') && options.hasOwnProperty('prop_icon')
      && options.hasOwnProperty('raw') ) {
      this.setData({
        prop_name: options.prop_name,
        prop_icon: options.prop_icon,
        raw: options.raw,
        act: options.act
      });
    } else {
      this.setData({
        act: ''
      });
    }
  },

  //道具接收
  proPreceive: function() {
    if (app.globalData.openid == '') {
      wx.showModal({ title: '警告', content: '网络未准备好，请稍后再试', showCancel: false, confirmText: '返回' });
      return;
    }
    var that = this;
    that.setData({receiveing: true});

    wx.request({
      url: app.globalData.walletServerPath,
      data: {
        func: 'PropReceive',         //action
        openid: app.globalData.openid,
        raw: that.data.raw,
        control: 'prop',               //控制器
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
          that.setData({isReceive: true});
        }
        that.setData({ receiveing: false});
        that.goBackMyProps();
      }
    })
  },

  //道具分享
  onShareAppMessage: function (options) {
    console.log('onShareAppMessage')
    let that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    let path = '/pages/prop/index?act=rec&prop_name=' + that.data.prop_name + '&prop_icon=' + that.data.prop_icon 
    + '&raw=' + that.data.raw;
    let shareObj = {
      title: '游戏道具分享',          // 默认是小程序的名称(可以写slogan等)
      path: path,     // 默认是当前页面，必须是以‘/’开头的完整路径
      //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      imgUrl: that.data.prop_icon,     
      success: function (res) {
        // 转发成功之后的回调
        console.log(res.errMsg);
        if (res.errMsg == 'shareAppMessage:ok') {
          that.goBackMyProps();
        }
      }
    };
    // 返回shareObj
    return shareObj;
  },

  //返回我的道具
  goBackMyProps: function() {
    let path = app.globalData.walletClientPath + '/#/mine/myProps?openid=' + app.globalData.openid + '&t=' + (new Date().getTime())
    wx.navigateTo({
      url: '/pages/index/index?path=' + path
    })
  }

})