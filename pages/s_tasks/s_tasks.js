//s_list_tasks.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tasks: [
    ]
 },
  //事件处理函数
  answer: function() {
    wx.navigateTo({
      url: '../s_answer/s_answer'
    })
  },

  onLoad: function () {
    // const db = wx.cloud.database()
    // db.collection('assignment').get().then(res => { console.log(res.data) })
  }

})
