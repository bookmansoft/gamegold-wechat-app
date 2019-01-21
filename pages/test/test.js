// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: '',
    addr: '',
    game: '',
    gameUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.cid,
      addr: options.addr,
      game: options.game,
      gameUrl: options.gameUrl
    });
  },

  enterGame: function() {
    console.log("ok")
    wx.navigateToMiniProgram({
      appId: 'wxdb571c43fa1ff06b',
      path: 'pages/index/index?addr='+ this.data.addr + '&cid=' + this.data.cid,
      extraData: {

      },
      envVersion: 'trial',
      success(res) {
        // 打开成功
        console.log('success', res)
      },
      fail(res) {
        console.log('fail', res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})