//获取应用实例
var app = getApp()
Page({
  data: {
          curid:'',
          hTitle:'',
          content:'',
          endDate:'',
          complete_list:[],
          uncomplete_list:[]
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
          complete_list: res.data[0].complete_list
        })
        const db = wx.cloud.database()
        db.collection('account_information').where({
          identity:"student"
        }).get().then(res=>{
          var complete_name=[]
          var uncomplete_name=[]
          for(let i in this.data.complete_list){
                complete_name.push(this.data.complete_list[i].name)
          }
          const all=res.data
          for (let i in all){
              if(complete_name.indexOf(all[i].id)==-1){
                  uncomplete_name.push(all[i].id)
              }
          }
          this.setData({
            uncomplete_list:uncomplete_name
          })
        })
      }
    })
  },
  t_mark: function(e) {
    const curindex=e.currentTarget.dataset.index
    console.log(e)
   // const curname=this.data.complete_list[curindex].name
    wx.navigateTo({
      url: '../t_mark/t_mark?id='+this.data.curid+'&index='+curindex
    })
  }
})