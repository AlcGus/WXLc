// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsmessagedata: {},
    jokemessagedata: {},
    weathermessagedata: {},
    almanacmessagedata: {},
    messagedata: {}
  },
  newsmessage: function() {
    var data = {
      type: 'top',
      key: '0138e3dbc1197ec65b5842a165e01506'
    }
    this.Commonfun("http://v.juhe.cn/toutiao/index", data, 1)
  },
  jokemessage: function() {
    var data = {
      sort: 'desc',
      time: Date.parse(new Date()) / 1000 + '',
      key: '58778b99fca51638ac0479d86af0fcdb'
    }
    this.Commonfun('http://v.juhe.cn/joke/content/list.php', data, 2)
  },
  weathermessage: function() {
    var data = {
      cityname: '武汉',
      key: '7d0541ca2efa009788735b28040b4026'
    }
    this.Commonfun('http://v.juhe.cn/weather/index', data, 3)
  },
  almanacmessage: function() {
    var data = {
      date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      key: 'd87bd1c31b940eeaca302281659f7f7d'
    }
    this.Commonfun('http://v.juhe.cn/laohuangli/d', data, 4)
  },
  onClick: function(event) {
    // console.log(event.detail.title)
    if (event.detail.title == "新闻") {
      this.newsmessage();
    } else if (event.detail.title == "笑话") {
      this.jokemessage();
    } else if (event.detail.title == "天气") {
      this.weathermessage();
    } else {
      this.almanacmessage();
    }
  },
  Commonfun: function(url, path, type) {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    })
    wx.request({
      url: url,
      method: 'GET',
      data: path,
      header: {
        'content-type': 'application/json'
      },
      complete() {
        wx.hideLoading()
      },
      success: res => {
        // console.log(res.data.result)
        if (type == 1) {
          this.setData({
            newsmessagedata: res.data.result.data
          })
        } else if (type == 2) {
          this.setData({
            jokemessagedata: res.data.result.data
          })
        } else if (type == 3) {
          this.setData({
            weathermessagedata: res.data.result
          })
        } else {
          this.setData({
            almanacmessagedata: res.data.result
          })
        }
      }
    })
  },
  openurl: function(url) {
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.newsmessage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})