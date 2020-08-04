// pages/register/register.js
Page({

  data: {
          account:"",
          password:"",
          passwordagain:"",
          phonenumber:""
  },

  accountchange:function(e){
    this.setData({
      account:e.detail.value
    })
 },

 passwordchange:function(e){
   this.setData({
    password:e.detail.value
     })
 },

 passwordagainchange:function(e){
  this.setData({
   passwordagain:e.detail.value
    })
},

 phonenumberchange:function(e){
  this.setData({
   phonenumber:e.detail.value
    })
},

 formSubmit:function(e){
    if(this.data.password==''||this.data.passwordagain==''||this.data.account==''||this.data.phonenumber==''){
      wx.showToast({
        title: '有信息未填写',
        icon:'none'
      })
    }
    else if(this.data.password!=this.data.passwordagain){
      wx.showToast({
        title: '两次输入密码不一致',
        icon:'none'
      })
    }
    else{
      const db=wx.cloud.database()
      const cont = db.collection('account_information')
      var curid=this.data.account
      var curpass=this.data.password
      var curphone=this.data.phonenumber
      cont.where({
        id: curid,
      }).get().then(res=>{
        if(res.data.length!=0){
          wx.showToast({
            title: '该用户已注册',
            icon:'none'
          })
        }
        else{
          cont.add({
            data:{
              id: curid,
              password: curpass,
              phonenumber: curphone,
              identity:'teacher'
            }
          }).then(res2=>{
            wx.showToast({
              title: '注册成功',
            })
            setTimeout(function(){
              wx.navigateBack({
                delta:1
              })},2000)
          }).catch(res2=>{
            wx.showToast({
              title: '注册失败',
              icon:'none'
            })
          })
        }
      })
    }
 },

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