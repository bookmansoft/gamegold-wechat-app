const app = getApp()

//登陆页面
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {
    
  },
  
  //申请令牌
  userToken: function (e) {

  }

})