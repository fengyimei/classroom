// pages/s_transition/s_transition.js
const app=getApp()
Page({

  data: {
         curid:'',
         hTitle:'', 
         homework:'',
         answer:'',
         filename:'',
         endDate:'',
         score:-1,
         markword:'',
         condition:'',
         overtime:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        curid: options.id
      })
      const db=wx.cloud.database()
      const cont = db.collection('assignment')
      cont.where({
        _id:this.data.curid
      }).get().then(res=>{
        console.log(res.data)
        if(res.data[0].length==0){
          wx.showToast({
            title: '作业已被删除',
            icon:'none'
          })
        }
        else{
          this.setData({
            hTitle: res.data[0].hTitle,
            homework: res.data[0].content,
            endDate:res.data[0].endDate
          })
          console.log(app.globalData.time_rough)
          console.log(this.data.endDate)
          if (app.globalData.time_rough>this.data.endDate){
            this.setData({
              overdate:false
            })
          }
          else{
            this.setData({
              overdate:true
            })
          }
          const cur_list=res.data[0].complete_list
          for(let i in cur_list){
              if(cur_list[i].name==app.globalData.username){
                this.setData({
                  answer: cur_list[i].answer,
                  score:cur_list[i].score,
                  filename:cur_list[i].filename,
                  filepath:cur_list[i].filepath,
                  markword:cur_list[i].markword,
                  endDate:cur_list[i].endDate
                })
              }
          }
          if(this.data.answer && this.data.filepath==''){
            this.setData({
              condition:"未提交"
            })
          }
          else if(this.data.score==''){
            this.setData({
              condition:"已提交"
            })
          }
          else{
            this.setData({
              condition:'老师已批改反馈'
            })
          }
      }
    })         
  },

  buttontap:function(e){
    const that=this
    wx.navigateTo({
      url: '/pages/s_completetask/s_completetask?id='+that.data.curid,
    })
  },

  checkfile:function(e){
    const that=this
    wx.cloud.downloadFile({

      fileID: 'cloud://cloudclassroom-3tovs.636c-cloudclassroom-3tovs-1302479370/files/'+app.globalData.username+'作业文件.pdf',
      success: function (res) {
              const filePath = res.tempFilePath
              wx.openDocument({
              filePath: filePath,
              success: function (res) {
                  console.log('打开文档成功')
              }
          })
       },
       fail:function(res){
         wx.showToast({
           title: '文件下载失败',
           icon:'none'
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