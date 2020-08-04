//获取应用实例
var app = getApp()
Page({
  data: {
    tasks: [],
    currentindex:-1,
    identity:''
  },
  //事件处理函数
  onLoad: function(){
    if(app.globalData.identity=='student'){
      this.setData({
        identity: false
      }
     )
    }
    else{
      this.setData({
        identity:true
      })
    }
    const db = wx.cloud.database()
    db.collection('assignment').get().then(res => { console.log(res.data) 
      this.setData({
          tasks:res.data
      })
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: "获取作业失败",
        icon:"none"
      })
    })

  },
  // 跳转到学生列表
  t_students: function(e) {
    const curindex=e.currentTarget.dataset.index
    const curid=this.data.tasks[curindex]._id
    wx.navigateTo({
      url: '../exhibition_students/exhibition_students?id='+curid
    })
  },

  s_complete:function(e){
    const curindex=e.currentTarget.dataset.index
    const curid=this.data.tasks[curindex]._id
    wx.navigateTo({
      url: '/pages/s_transition/s_transition?id='+curid,
    })
  },
  // 弹出底部菜单
  action_sheet: function(e){
    console.log(e)
    this.setData({
      currentindex:e.currentTarget.dataset.index
    })
    const delindex=this.data.currentindex
    const delid=this.data.tasks[delindex]._id
    const that=this
    wx.showActionSheet({
      itemList: ['删除'],
      success(res){
        const newlist=that.data.tasks.filter(
          (v,i)=> {
           return  i != delindex;
          }
        )
        const db = wx.cloud.database()
        db.collection('assignment').where({
              _id:delid
        }).remove()
        .then(res => { console.log(res) 
          console.log(newlist)
        that.setData({
          tasks: newlist,
          currentindex:-1,
         // actionSheetHidden: !this.data.actionSheetHidden, // 隐藏底部菜单
          //toast1Hidden: false   // 弹出消息提示框
        })
          wx.showToast({
            title: "删除成功",
            icon:"success"
          })
    }).catch(res=>{
      console.log(res)
      wx.showToast({
        title: "删除失败",
        icon:"none"
      })
    })
        },
        fail(res){
          console.log(res.errMsg)
        }
      })
  },
})