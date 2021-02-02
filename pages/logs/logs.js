//logs.js
const util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    account: "",
    password:"",
    current:false
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
            app.globalData.time=res.data[0].time
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
          title: '请检查网络',
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

  to_register_teacher:function(){
      wx.navigateTo({
        url: '/pages/register_teacher/register_teacher',
      })

  },

  utc_beijing(utc_datetime) {
    var util = require('../../utils/util.js')
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
   // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    var beijing_datetime = new Date(parseInt(timestamp) * 1000)
    var dayTime = util.formatTime(beijing_datetime)
    console.log(dayTime)
    return beijing_datetime; // 2017-03-31 16:02:06
  },

  onLoad: function () {
     wx.cloud.callFunction({
       name:'getTime',
     success:function(res){
       var utc_datetime=res.result
      var util = require('../../utils/util.js')
      // 转为正常的时间格式 年-月-日 时:分:秒
      var T_pos = utc_datetime.indexOf('T');
      var Z_pos = utc_datetime.indexOf('Z');
      var year_month_day = utc_datetime.substr(0, T_pos);
      var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
      var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06
  
      // 处理成为时间戳
      timestamp = new Date(Date.parse(new_datetime));
      timestamp = timestamp.getTime();
      timestamp = timestamp / 1000;
  
      // 增加8个小时，北京时间比utc时间多八个时区
      var timestamp = timestamp + 8 * 60 * 60;
  
      // 时间戳转为时间
     // var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      var beijing_datetime = new Date(parseInt(timestamp) * 1000)
      var dayTime = util.formatTime(beijing_datetime)
      const nowtime=dayTime.split(" ")[0].split("/")
      const nowsecond=dayTime.split(" ")[1]
      const nowdate=[nowtime[0],nowtime[1],nowtime[2]]
      app.globalData.time_standard=dayTime
      dayTime=dayTime.replace(/\//g,"")
      dayTime=dayTime.replace(/:/g,'')
      dayTime=dayTime.replace(/\s/g,"")
      app.globalData.time_rough=nowdate.join('-')
      app.globalData.time_standard2=nowdate.join('-')+' '+nowsecond
      app.globalData.time_str=dayTime
     }
  })   
 }
  
})
