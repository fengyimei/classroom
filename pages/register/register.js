// pages/register/register.js
Page({

  data: {
          account:"",
          password:"",
          passwordagain:"",
          phonenumber:"",
          kind:"",
          kindtrue:false,
          code:''
  },
   
  invitationchange:function(e){
       this.setData({
          code:e.detail.value
       })
  },

  changekind:function(e){
    var temp=false
    if(e.detail.value=='1'){
      temp=true
    }
    this.setData({
      kind: e.detail.value,
      kindtrue: temp
    })
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
    else if(this.data.kind==""){
      wx.showToast({
        title: '未选择账号类型',
        icon:'none'
      })
    }
    else if(this.data.kind=="1" && this.data.code==""){
      wx.showToast({
        title: '未输入邀请码',
        icon:'none'
      })
    }
    else{
      const db=wx.cloud.database()
      const cont = db.collection('account_information')
      var curid=this.data.account
      var curpass=this.data.password
      var curphone=this.data.phonenumber
      var curkind=this.data.kind
      var curcode=this.data.code
      cont.where({
        id: curid,
      }).get().then(res=>{
        if(res.data.length!=0){
          wx.showToast({
            title: '该用户名已注册',
            icon:'none'
          })
        }
        else{
         if(curkind=="0")
          {
            cont.add({
            data:{
              id: curid,
              password: curpass,
              phonenumber: curphone,
              identity:'student'
            }
          }).then(res2=>{
              wx.showToast({
                title: '注册成功',
              })
              setTimeout(function(){
                wx.navigateBack({
                  delta:1
                })},2000)
            }).catch(res5=>{
                wx.showToast({
                  title: '注册失败',
                  icon:'none'
              })
            })
          }
            else{
               const cont2 = db.collection('invite')
               cont2.get().then(res2=>{
                    console.log(res2)
               })
               console.log(curcode)
               cont2.where({
                 code:curcode
               }).get().then(res11=>{
                    console.log(res11)
                    if(res11.data.length==0){
                      wx.showToast({
                        title: '邀请码错误',
                        icon:'none'
                      })
                    }
                    else{
                      if(res11.data[0].is_Occupied){
                        wx.showToast({
                          title: '邀请码被占用',
                          icon:'none'
                        })
                      }
                      else{
                        cont2.where({
                          code:curcode
                        }).update({
                          data:{
                            is_Occupied: true
                          }
                        })
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
                          })
                      }
                    }
               })
            }
        }
      }).catch(res=>{
        wx.showToast({
          title: '注册失败',
          icon:'none'
        })
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