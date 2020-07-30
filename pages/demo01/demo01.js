// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '这次完成的不错' },
      { name: '2', value: '概念理解不清晰' },
    ]  ,
    pingyu:'',/*快捷评语部分*/ 
    pingyuziding:'',/*自定评语部分*/ 
    pingyutotal:'',/*总评语 提交后的 */
    input1:false
    },
    checkboxChange: function (e) {
      console.log('老师的评语模板是：', e.detail.value)
      this.setData({
        pingyu:e.detail.value.join(',')
      })
    },
    inputs:function()
    {
     this.setData({
     input1:true
     })
    },
    newitem:function(e)
    { const newitems1=this.data.items
      newitems1.push({name:'',value:e.detail.value})
      console.log(e)
      this.setData({
        items:newitems1
        })

    },
    zidingpingyu:function(e)
    {
     this.setData({
       pingyuziding:e.detail.value
     })
    } ,
    tijiao:function()
    {
      this.setData({
        pingyutotal:this.data.pingyu+","+this.data.pingyuziding
      })
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