// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsmessagedata:{},
    showtest:123
  },
  newsmessage:function(){
    wx.showToast({
      title: '数据加载中',
      icon:'loading'
    })
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index',
      method:'GET',
      data:{
        type:'top',
        key:'0138e3dbc1197ec65b5842a165e01506'
      },
      header:{
        'content-type':'application/json'
      },
      complete(){
        wx.hideLoading()
      },
      success:res => {
        console.log(res.data.result.data)
        this.setData({
          newsmessagedata : res.data.result.data
        })
      }
    })
  },
  onClick:function(event){
    console.log(event.detail.title)
    if (event.detail.title == "新闻"){
      this.newsmessage();
    }
  },
  test:function(){
    this.showtest = 1
    console.log(this.showtest)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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