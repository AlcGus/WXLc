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
    messagedata: {},
    cardmessagedata: {}
  },
  newsmessage: function() {
    var data = {
      type: 'top',
      key: '0138e3dbc1197ec65b5842a165e01506'
    }
    this.Commonfun("https://v.juhe.cn/toutiao/index", data, 1)
  },
  jokemessage: function() {
    var data = {
      sort: 'desc',
      time: Date.parse(new Date()) / 1000 + '',
      key: '58778b99fca51638ac0479d86af0fcdb'
    }
    this.Commonfun('https://v.juhe.cn/joke/content/list.php', data, 2)
  },
  weathermessage: function(longitude, latitude) {
    var data = {
      // cityname: '武汉',
      lon: longitude,
      lat: latitude,
      key: '7d0541ca2efa009788735b28040b4026'
    }
    this.Commonfun('https://v.juhe.cn/weather/geo', data, 3)
  },
  almanacmessage: function() {
    var data = {
      date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      key: 'd87bd1c31b940eeaca302281659f7f7d'
    }
    this.Commonfun('https://v.juhe.cn/laohuangli/d', data, 4)
  },
  onSearch: function(e) {
    var data = {
      cardno: e.detail,
      key: '83899761e35dd8ff0f5998ec35d9b3fc'
    }
    this.Commonfun('https://apis.juhe.cn/idcard/index', data, 5)
  },
  loadInfo: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: res => {
        var latitude = res.latitude //维度
        var longitude = res.longitude //经度
        this.weathermessage(longitude, latitude)
      }
    })
  },
  onClick: function(event) {
    // console.log(event.detail.title)
    if (event.detail.title == "新闻") {
      this.newsmessage();
    } else if (event.detail.title == "笑话") {
      this.jokemessage();
    } else if (event.detail.title == "天气") {
      this.loadInfo();
      // this.weathermessage();
    } else if (event.detail.title == "老黄历") {
      this.almanacmessage();
    } else if (event.detail.title == "身份证查询") {
      this.onSearch();
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
        console.log(res.data.result)
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
        } else if (type == 4) {
          this.setData({
            almanacmessagedata: res.data.result
          })
        } else if (type == 5) {
          this.setData({
            cardmessagedata: res.data.result
          })
        }
      }
    })
  },
  openurl: function(event) {
    wx.navigateTo({
      // url: event.currentTarget.dataset['index']
      url: '../webshow/webshow?url=' + event.currentTarget.dataset['index'].replace('http', 'https')
    })
    console.log(event)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 新闻每日只有100次的次数限制，开发期间暂时屏蔽
    // 个人版目前不支持新闻类信息，更改为笑话
    this.jokemessage();
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
    wx.stopPullDownRefresh(); //停止下拉刷新
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