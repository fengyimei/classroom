// pages/t_addexpandziliao/t_addexpandziliao.js
Page({
  data: {
          hTitle:"",
          content:""
  },
  titleChange:function(e){
    this.setData({
      hTitle: e.detail.value
    })
  },
  contentChange :function(e){
    this.setData({
      content:e.detail.value
    })
  },
  formSubmit: function(e) {
    if (this.data.hTitle== ""){
        wx.showToast({
          title: '未输入资料标题',
          icon:'none'
        })
    }
    else if (e.detail.value.textarea == ""){
      wx.showToast({
        title: '未输入资料内容',
        icon:'none'
      })
    }
    else{
      const db=wx.cloud.database()
      const cont = db.collection('expandziliao')

      cont.add({

    data: this.data}).then(res=>{
      console.log(res)
      wx.showToast({
        title: '成功发布资料',
        icon:'success'
      })  
      
      setTimeout(function(){
        wx.redirectTo({
          url: '../t_expandziliao/t_expandziliao'
        })
      },3000) 
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: '发布资料失败',
        icon:'none'
      }) 
      return
     })  
    }
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