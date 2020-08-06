//获取应用实例
var app = getApp()
Page({
  data: {
          curid:'',
          hTitle:'',
          content:'',
          endDate:'',
          complete_list:[],
          e_list:[],
          overtime:false,
          avg:0,
          max:0,
          sum_markword:'',
          sum_markdown:'',
          identity:''
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
          e_list: res.data[0].e_list,
          complete_list:res.data[0].complete_list,
          no_submit:30-res.data[0].complete_list.length,
          identity:app.globalData.identity,
          sum_markword:res.data[0].sum_markword
        })
      }
      
      if(app.globalData.time_rough>this.data.endDate)
        this.setData({
           overtime:true
        })
        var maxx=0
        var temp=0
        for(let i=0;i<this.data.complete_list.length;i++){
          temp+=parseInt(this.data.complete_list[i].score)
          if(parseInt(this.data.complete_list[i].score)>maxx){
            maxx=parseInt(this.data.complete_list[i].score)
          }
        }
        temp=temp/this.data.complete_list.length
        this.setData({
          avg:temp,
          maxx:maxx
        })
    })
  },
  t_mark: function(e) {
    const curindex=e.currentTarget.dataset.index
    console.log(e)
   // const curname=this.data.complete_list[curindex].name
    wx.navigateTo({
      url: '/pages/homework_exhibition/homework_exhibition?id='+this.data.curid+'&index='+curindex
    })
  },
   
  sum_markchange:function(e){
    this.setData({
      sum_markdown:e.detail.value
    })
  },

  submit_mark:function(e){
    const db=wx.cloud.database()
    const that=this
    db.collection('assignment').doc(this.data.curid).update({
      data:{
        sum_markword:this.data.sum_markdown
      }
    }).then(res=>{
      wx.showToast({
        title: '修改总评语成功',
      })
      that.setData({
        sum_markword:this.data.sum_markdown,
        sum_markdown:''
      })
    }).catch(res=>{
      wx.showToast({
        title: '提交评语失败',
        icon:'none'
      })
    })
  },

  to_assignment:function(){
    wx.switchTab({
      url: '/pages/t_assignment/t_assignment',
    })
  }
  
})