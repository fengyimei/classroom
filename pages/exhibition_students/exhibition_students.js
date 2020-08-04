//获取应用实例
var app = getApp()
Page({
  data: {
          curid:'',
          hTitle:'',
          content:'',
          endDate:'',
          e_list:[]
  },
  //事件处理函数
  onLoad:function(options){
    this.setData({
      curid:options.id
    })
    const db = wx.cloud.database()
    db.collection('assignment').where({
      _id: options.id
    }).get().then(res=>{
      if(res.data[0].length==0){
        wx.showToast({
          title: '作业已被删除',
          icon:'none'
        })
      }
      else{
        this.setData({
          hTitle:res.data[0].hTitle,
          content:res.data[0].content,
          endDate:res.data[0].endDate,
          e_list: res.data[0].e_list
        })
      }
    })
  },
  t_mark: function(e) {
    const curindex=e.currentTarget.dataset.index
    console.log(e)
   // const curname=this.data.complete_list[curindex].name
    wx.navigateTo({
      url: '/pages/homework_exhibition/homework_exhibition?id='+this.data.curid+'&index='+curindex
    })
  }
})