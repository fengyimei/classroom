// pages/t_leisure/t_leisure.js
const app=getApp()
Page({

  data: {
    t_name:"",
    identity:"",
    t_freetime:"",
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
    const cont = db.collection('t_free')
    const curname=this.data.t_name
    const curtime=this.data.t_xiugai
  cont.where({
    t_name: curname}).get().then(res=>{
      if(res.data.length==0){
        console.log(res.data)
        cont.add({
          data:{
               t_name: curname,
               t_freetime:curtime
          }

        }).then(res2=>{
            console.log(res2)
            wx.showToast({
              title: '成功添加信息',
              icon:'success'
            })  
            setTimeout(function(){
            wx.redirectTo({
              url: '../t_leisure/t_leisure'
            })
          },2000) 
          }).catch(res2=>{
            console.log(res2)
            wx.showToast({
              title: '添加失败',
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
            t_freetime:curtime
          }
        }).then(res3=>{
          console.log(res3)
          wx.showToast({
            title: '成功修改信息',
            icon:'success'
          }) 
          setTimeout(function(){
            wx.redirectTo({
              url: '../t_leisure/t_leisure'
            })
          },2000) 
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
  onLoad: function (options) {
    this.setData({
      t_name:app.globalData.username,
      identity:app.globalData.identity
    })
    const db=wx.cloud.database()
    const cont = db.collection('t_free')
    var curname
    var curziliao
    cont.where({
      t_name:app.globalData.username
    }).get().then(res=>{
       if(res.data.length==0){
         this.setData({
           t_freetime: '教师未设置空闲时间'
         })
       }
      else{
        this.setData({
          t_freetime:res.data[0].t_freetime
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