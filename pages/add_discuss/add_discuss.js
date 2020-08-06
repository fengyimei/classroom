//获取应用实例
var app = getApp()
Page({
  data: {
    nowDate:'',
    endDate:'',
    hTitle: '',
    content:'',
    identity:'',
    curname:'',
    complete_list:[],
    is_selectable:false
  },
  //事件处理函数
  // 发送信息
  titleChange:function(e){
       this.setData({
         hTitle: e.detail.value
       })
  },
  contentChange :function(e){
       this.setData({
         content:e.detail.value
       })
  },
  onChangeEndDate:function(e){
    this.setData({
      endDate:e.detail.value
    })
  },
  
  formSubmit2: function(e) {
    if (this.data.hTitle== ""){
        wx.showToast({
          title: '未输入问题标题',
          icon:'none'
        })
    }
    else if (e.detail.value.textarea == ""){
      wx.showToast({
        title: '未输入问题内容',
        icon:'none'
      })
  }
    else{
      console.log('form发生了submit事件，携带数据为：'+this.data.endDate)
      if(this.data.is_selectable){
        this.setData({
          curname:'匿名'
        })
      }
      else{
        this.setData({
          curname:app.globalData.username
        })
      }
      const db=wx.cloud.database()
      const cont = db.collection('discuss')
      cont.add({
      data:{
        content: this.data.content,
        hTitle:this.data.hTitle,
        time_str: app.globalData.time_str,
        time_standard: app.globalData.time_standard,
        chat_history:[],
        name:this.data.curname,
        chat_length:0
      }}).then(res=>{
        console.log(res)
        wx.showToast({
          title: '成功添加问题',
          icon:'success'
        })  
        var page = getCurrentPages().pop();  
        if (page == undefined || page == null) return;  
        page.onLoad(); 
        setTimeout(function(){
          wx.redirectTo({
            url: '../t_discuss/t_discuss',
          })
        },2000) 
      }).catch(res=>{
        console.log(res)
        wx.showToast({
          title: '添加问题失败',
          icon:'none'
        }) 
        return
      })  
    }
  },
   
  radiochange:function(e){
    this.setData({
      is_selectable:e.detail.value
    })
 },

  onLoad:function(){
    // if(app.globalData.identity=='student'){
    //   this.setData({
    //     identity:false
    //   })
    //   wx.setNavigationBarTitle({
    //     title: "添加问题"
    //   })
    // }
    // else{
    //   this.setData({
    //     identity:true
    //   })
    //   var util = require('../../utils/util.js')
    //   var dayTime = util.formatTime(new Date());
    //   const nowtime=dayTime.split(" ")[0].split("/")
    //   const nowdate=nowtime[0]+'-'+nowtime[1]+'-'+nowtime[2]
    //   this.setData({
    //     nowDate: nowdate,
    //     endDate: nowdate
    //    })
    // }
  }
//   toast1Change(){
//       this.setData({
//           toast1Hidden: true   // 消息提示框
//       })
//   },

//   toast2Change(){
//       this.setData({
//           toast2Hidden: true   // 消息提示框
//       })
//   },


//   toast3Change(){
//       this.setData({
//           toast3Hidden: true   // 消息提示框
//       })
//   }
// })
})