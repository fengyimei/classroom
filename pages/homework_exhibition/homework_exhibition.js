// pages/homework_exhibition/homework_exhibition.js
Page({
  data: {
          curid:'',
          curindex:'',
          name:'',
          answer:'',
          markword:'',
          filename:'',
          filepath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curid:options.id,
      curindex:options.index
    })
    const db=wx.cloud.database()
    const cont=db.collection('assignment')
    cont.doc(this.data.curid).get().then(res=>{
      console.log(res)
        if(res.data.length==0){
          wx.showToast({
            title: '后台数据出错',
            icon:'none'
          })
          return
        }
        this.setData({
          name:res.data.e_list[options.index].name,
          answer:res.data.e_list[options.index].answer,
          markword:res.data.e_list[options.index].markword,
          filename:res.data.e_list[options.index].filename,
          filepath:res.data.e_list[options.index].filepath
        })
    })
  },
  
  openfile:function(){
    const that=this
    wx.cloud.downloadFile({
        // 示例 url，并非真实存在
        fileID: that.data.filepath,
        success: function (res) {
                const filePath = res.tempFilePath
                wx.openDocument({
                filePath: filePath,
                success: function (res) {
                    console.log('打开文档成功')
                }
            })
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