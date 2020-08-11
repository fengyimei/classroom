// pages/t_discuss/t_discuss.js
Page({
  data: {
      discuss:[],
      curindex:-1
  },
  
  changetoanswer:function(e){
      this.setData({
        curindex:e.currentTarget.dataset.index
      })
      const index=this.data.curindex
      const id=this.data.discuss[index]._id
      wx.navigateTo({
        url: '/pages/discuss_details/discuss_details?id='+id,
      })
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'get_discuss'
    }).then(res=>{
      var templist=res.result.data.slice()
      console.log(templist)
      templist.sort(function(a,b){
           return a.time_str-b.time_str
      })
      this.setData({
          discuss:templist
      })
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: "获取讨论失败",
        icon:"none"
      })
    })
  },
    // const db = wx.cloud.database()
    // db.collection('discuss').get().then(res => {  
    //   var templist=res.data.slice()
    //   templist.sort(function(a,b){
    //        return a.time_str-b.time_str
    //   })
    //   this.setData({
    //       discuss:templist
    //   })
    // }).catch(res=>{
    //   console.log(res)
    //   wx.showToast({
    //     title: "获取询问失败",
    //     icon:"none"
    //   })
    // })

  addnew:function(e){
    wx.navigateTo({
      url: '/pages/add_discuss/add_discuss',
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