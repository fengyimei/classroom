//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello4',
    username: "",
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  changetoziliao:function(){
      wx.navigateTo({
        url: '../t_ziliao/t_ziliao',
      }) 
  },
  changetodiscuss:function(){
    wx.navigateTo({
      url: '../taolun_transition/taolun_transition',
    }) 
  },
  bindViewTap: function() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  t_assignment: function() {
    wx.navigateTo({
      url: '../t_assignment/t_assignment'
    })
  },
  t_tasks: function() {
    wx.navigateTo({
      url: '../t_tasks/t_tasks'
    })
  },
  onLoad: function () {
    if(app.globalData.identity=='student'){
      wx.setNavigationBarTitle({
        title:'学生主页'
      })
      wx.setTabBarItem({
        index: 0,
        text:'学生首页',
        "iconPath":"icons/home-1.png",
        "selectedIconPath":"icons/home-2.png"
      })
      wx.setTabBarItem({
        index: 1,
        text:'添加问题',
        "iconPath":"icons/homework-1.png",
        "selectedIconPath":"icons/homework-2.png"
      })
      wx.setTabBarItem({
        index: 2,
        text:'完成作业',
        iconPath:"icons/correct-1.png",
        selectedIconPath:"icons/correct-2.png"
      })
    }
    this.setData({
      username: app.globalData.username
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
