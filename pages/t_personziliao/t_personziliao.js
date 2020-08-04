// pages/t_personziliao/t_personziliao.js
const app=getApp()

Page({

  data: {
         t_name:"多林",
         name:"",
         identity:"",
         t_ziliao:"",
         t_xiugai:""
  },

  contentChange:function(e){
    this.setData({
      t_xiugai:e.detail.value
    })
  },
  
  formSubmit:function(e){
    if (this.data.t_xiugai== ""){
      wx.showToast({
        title: '未输入修改内容',
        icon:'none'
      })
    }
    else{
      const db=wx.cloud.database()
      const cont = db.collection('t_ziliao')
      const curname=this.data.t_name
      const curziliao=this.data.t_xiugai
    cont.where({
      t_name: curname}).get().then(res=>{
        if(res.data.length==0){
          console.log(res.data)
          cont.add({
            data:{
                 t_name: curname,
                 t_ziliao:curziliao
            }
  
          }).then(res2=>{
              console.log(res2)
              wx.showToast({
                title: '成功修改信息',
                icon:'success'
              })  
              setTimeout(function(){
              wx.redirectTo({
                url: '../t_personziliao/t_personziliao'
              })
            },3000) 
            }).catch(res2=>{
              console.log(res2)
              wx.showToast({
                title: '修改信息失败',
                icon:'none'
              }) 
              return
            })  
        }
        else{
          const curid=res.data[0]._id
          console.log(curid)
          cont.doc(curid).update({
            data:{
              t_ziliao:curziliao
            }
          }).then(res3=>{
            console.log(res3)
            wx.showToast({
              title: '成功修改信息',
              icon:'success'
            }) 
            setTimeout(function(){
              wx.redirectTo({
                url: '../t_personziliao/t_personziliao'
              })
            },3000) 
          }).catch(res3=>{
            console.log(res3)
            wx.showToast({
              title: '修改信息失败',
              icon:'none'
            }) 
          })
        }
      })  
    }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      identity:app.globalData.identity
    })
    const db = wx.cloud.database()
    db.collection('t_ziliao').where({
      t_name:this.data.t_name
    }).get().then(res => { 
      console.log(res.data) 
      this.setData({
          t_ziliao: res.data[0].t_ziliao
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