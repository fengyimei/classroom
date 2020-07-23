// pages/t_expandziliao/t_expandziliao.js
const app=getApp()

Page({

  data: {
        identity:'',
        ziliao:[],
       // actionSheetHidden:true,
        currentindex:-1
  },

  action_sheet: function(e){
    this.setData({
      //actionSheetHidden: !this.data.actionSheetHidden,
      currentindex:e.currentTarget.dataset.index
    })
    const delindex=this.data.currentindex
    const delid=this.data.ziliao[delindex]._id
    const that=this
    console.log(delid)
    wx.showActionSheet({
      itemList: ['删除'],
      success(res){
        const newlist=that.data.ziliao.filter(
          (v,i)=> {
           return  i != delindex;
          }
        )
        const db = wx.cloud.database()
        db.collection('expandziliao').where({
              _id:delid
        }).remove()
        .then(res => { console.log(res) 
          console.log(newlist)
        that.setData({
          ziliao: newlist,
          currentindex:-1,
         // actionSheetHidden: !this.data.actionSheetHidden, // 隐藏底部菜单
          //toast1Hidden: false   // 弹出消息提示框
        })
          wx.showToast({
            title: "删除成功",
            icon:"success"
          })
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: "删除失败",
        icon:"none"
      })
    })
        },
        fail(res){
          console.log(res.errMsg)
        }
      })
        
    // this.setData({
    //   actionSheetHidden: !this.data.actionSheetHidden,
    //   currentindex:e.currentTarget.dataset.index
    // })
  }, 

  formSubmit:function(){
       wx.navigateTo({
         url: '/pages/t_addexpandziliao/t_addexpandziliao',
       })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      identity: app.globalData.identity
    })
    const db = wx.cloud.database()
    db.collection('expandziliao').get().then(res => {  
      this.setData({
          ziliao:res.data
      })
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: "获取资料失败",
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