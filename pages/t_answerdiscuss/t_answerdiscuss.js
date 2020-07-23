// pages/t_answerdiscuss/t_answerdiscuss.js
Page({

  data: {
       discuss:{},
       curid:"",
       t_reply:""
  },
  contentChange:function(e){
      console.log(e.detail)
      this.setData({
        t_reply: e.detail.value
      })
  },

  formSubmit:function(){
       if(this.data.t_reply==""){
         wx.showToast({
           title: '回复不能为空',
           icon: 'none'
         })
       }
       else{
        const db=wx.cloud.database()
        const cont = db.collection('discuss')
        console.log(this.data.curid)
        const id=this.data.curid
        cont.doc(id).update({
          data:{
            reply:this.data.t_reply,
            ischeck:true
          }
        }).then(res=>{
          console.log(res)
          wx.showToast({
            title: '回复成功',
            icon:'success'
          }) 
          setTimeout(function(){
            wx.navigateBack({
              delta: 1,
              success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
               }
         })
          },3000) 
        }).catch(res=>{
          console.log(res)
          wx.showToast({
            title: '回复失败',
            icon:'none'
          }) 
        })
       }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id)
      this.setData({
        curid: options.id
      })
      const db=wx.cloud.database()
      const cont = db.collection('discuss')
      cont.where({
        _id: options.id}).get().then(res=>{
            this.setData({
              discuss: res.data
            })
        }).catch(res=>{
          wx.showToast({
            title: '加载信息失败',
            icon: 'none'
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