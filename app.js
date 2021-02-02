//app.js
App({
  globalData: {
    userInfo: null,
    username:"",
    identity:"teacher",
    time_standard:'',
    time_rough:[],
    time_standard2:'',
    time:0
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }),
    wx.cloud.init({
      env: "cloudclassroom-3tovs",
      traceUser:true
    })
  },

  shijiancha: function (faultDate, completeTime) {

    var stime = Date.parse(new Date(faultDate));
    
    var etime = Date.parse(new Date(completeTime));
    
    var usedTime = etime - stime; //两个时间戳相差的毫秒数
    
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    
    //计算出小时数
    
    var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    
    var hours = Math.floor(leave1 / (3600 * 1000));
    
    //计算相差分钟数
    
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    
    var minutes = Math.floor(leave2 / (60 * 1000));
    
     
    
    var dayStr = days == 0 ? "" : days + "天";
    
    var hoursStr = hours == 0 ? "" : hours + "时";
    
     
    
    var time = dayStr + hoursStr + minutes + "分";
    
    return time;
    
    },
    
     
  onHide:function(){
    const that=this
    wx.cloud.callFunction({
      name:'getTime',
    success:function(res){
      var utc_datetime=res.result
      var util = require('/utils/util.js')
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
     const nowdate=[nowtime[0],nowtime[1],nowtime[2]]
     const nowsecond=dayTime.split(" ")[1]
     const compare1=nowdate.join('-')+' '+nowsecond
     console.log(compare1)
     console.log(that.globalData.time_standard2)
     if(that.globalData.time_standard2=="" || that.globalData.username=="" ){
       return 
     }
     var stime = Date.parse(new Date(that.globalData.time_standard2));
    
    var etime = Date.parse(new Date(compare1));
    
    var usedTime = etime - stime; //两个时间戳相差的毫秒数
    
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    
    //计算出小时数
    
    var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    
    var hours = Math.floor(leave1 / (3600 * 1000));
    
    //计算相差分钟数
    
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    
    var minutes = Math.floor(leave2 / (60 * 1000));
    
     
    
    var dayStr = days == 0 ? 0 : days*24*60;
    
    var hoursStr = hours == 0 ? 0 : hours*60;
    
    var timeadd = dayStr + hoursStr + minutes;
    console.log(timeadd+"分")
    const db=wx.cloud.database()
    const _=db.command
    db.collection('account_information').where({
      id:that.globalData.username
     }
    ).update({
      data:{
        time:_.inc(timeadd)
      }
    }).then(res=>{
      console.log("时长记录成功！")
    }).catch(res=>{
      console.log("时长记录失败！")
    })
   }
  })
 },
})