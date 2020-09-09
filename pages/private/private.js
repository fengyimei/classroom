// pages/private/private.js
var app=getApp() 
Page({ 
 
  /** 
   * 页面的初始数据 
   */ 
  data: { 
    identity:'', 
   studentname:[], 
   t_name:'', 
   s_name:'' 
  }, 
 
  t_caontact:function(e) 
  { 
    const t_name1=this.data.t_name 
    const s_name1=e.target.dataset.name 
    wx.navigateTo({ 
      url: '../contact/contact?t_name='+t_name1+'&s_name='+s_name1+'&speaker=server' 
    }) 
    console.log(e) 
  }, 
  s_caontact:function(e) 
  { 
    const s_name1=this.data.s_name 
    const t_name1=e.target.dataset.name 
    wx.navigateTo({ 
      url: '../contact/contact?t_name='+t_name1+'&s_name='+s_name1+'&speaker=student' 
    }) 
    console.log(e) 
  }, 
  /** 
   * 生命周期函数--监听页面加载 
   */ 
  onLoad: function (options) { 
    if(app.globalData.identity=='student'){ 
      this.setData({ 
        identity: false, 
        s_name:app.globalData.username 
      } 
     ) 
    } 
    else{ 
      this.setData({ 
        identity:true, 
        t_name:app.globalData.username 
      }) 
    } 
    const db = wx.cloud.database() 
    db.collection('account_information').get().then(res => { console.log(res.data)  
      this.setData({ 
        studentname:res.data 
      }) 
    }).catch(res=>{ 
      console.log(res) 
      wx.showToast({ 
        title: "学生姓名获取失败", 
        icon:"none" 
      }) 
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