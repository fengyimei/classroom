//logs.js
const util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    account: "",
    password:"",
  },

  accountchange:function(e){
     this.setData({
       account:e.detail.value.replace(/(^\s*)|(\s*$)/g,'')
     })
  },

  passwordchange:function(e){
    this.setData({
     password:e.detail.value
      })
  },

  formSubmit:function(e){
    if(this.data.account==''){
      wx.showToast({
        title: '未输入账号',
        icon: 'none'
      })
    }
    else if(this.data.password==''){
      wx.showToast({
        title: '未输入密码',
        icon: 'none'
      })
    }
    else{
      var curid=this.data.account
      var curpass=this.data.password
      const db=wx.cloud.database()
      const cont = db.collection('account_information')
      cont.where({
        id: curid,
        password:curpass
      }).get().then(res=>{
          if(res.data.length==0){
            wx.showToast({
              title: '账号或密码错误',
              icon:'none'
            })
          }
          else{
            const curidentity=res.data[0].identity
            const curname=res.data[0].id
            app.globalData.username=curname
            app.globalData.identity=curidentity
            console.log(res.data[0])
            console.log(app.globalData.username)
            wx.showToast({
              title: '登录成功',
            })
            setTimeout(function(){
              wx.switchTab({
                url: '../index/index'
              })
            },2000)
          }
      }).catch(res=>{
        wx.showToast({
          title: '登录失败',
          icon:'none'
        })
      })
    }
  },
  formReset:function(){
     wx.navigateTo({
       url: '/pages/register/register',
     })
  },
  onLoad: function () {
  
 }
})
