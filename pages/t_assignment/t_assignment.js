//获取应用实例
var app = getApp()
Page({
  data: {
    nowDate:'',
    endDate:'',
    hTitle: '',
    content:'',
    identity:'',
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
  formSubmit: function(e) {
    if (this.data.hTitle== ""){
        this.setData({
            toast2Hidden: false   // 消息提示框
        })
        wx.showToast({
          title: '未输入作业标题',
          icon:'none'
        })
    }
    else if (e.detail.value.textarea == ""){
      this.setData({
          toast2Hidden: false   // 消息提示框
      })
      wx.showToast({
        title: '未输入作业内容',
        icon:'none'
      })
  }
//   else if (this.data.endDate[0] == ""){
//     this.setData({
//         toast2Hidden: false   // 消息提示框
//     })
//     wx.showToast({
//       title: '未输入作业内容',
//       icon:'none'
//     })
// }
    else{
      console.log('form发生了submit事件，携带数据为：'+this.data.endDate)
      let temp=this.data.endDate.split('-')
      const now=this.data.nowDate.split('-')
      if (parseInt(temp[0])<parseInt(now[0]) || parseInt(temp[1])<parseInt(now[1]) || parseInt(temp[2])<parseInt(now[2])){
        wx.showToast({
          title: '截止日期有误',
          icon:'none'
        })
        return  
      }
        this.setData({
            toast3Hidden: false
        })
        
        const db=wx.cloud.database()
        const cont = db.collection('assignment')

    cont.add({

      data:{
        hTitle: this.data.hTitle,
        content:this.data.content,
        nowData:this.data.nowDate,
        endDate:this.data.endDate,
        complete_list:[],
        is_selectable:this.data.is_selectable
      }}).then(res=>{
        console.log(res)
        wx.showToast({
          title: '成功布置作业',
          icon:'success'
        })  
        db.collection('excellent').add({
          data:{
            hTitle: this.data.hTitle,
            content:this.data.content,
            endDate:this.data.endDate,
            e_list:[]
          }
        })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/t_tasks/t_tasks',
            success:function(e){
              var page = getCurrentPages().pop();  
               if (page == undefined || page == null) return;  
              page.onLoad();  
            }
          })
        },2000) 
      }).catch(res=>{
        console.log(res)
        wx.showToast({
          title: '布置作业失败',
          icon:'none'
        }) 
        return
      })  
       
      
    }
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
      const db=wx.cloud.database()
      const cont = db.collection('discuss')
      cont.add({
      data:{
        content: this.data.content,
        hTitle:this.data.hTitle,
        time: this.data.nowDate,
        reply:[]
      }}).then(res=>{
        console.log(res)
        wx.showToast({
          title: '成功添加问题',
          icon:'success'
        })  
        setTimeout(function(){
          wx.navigateTo({
            url: '../t_discuss/t_discuss',
            success:function(e){
              var page = getCurrentPages().pop();  
               if (page == undefined || page == null) return;  
              page.onLoad();  
            }
          })
        },3000) 
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
    if(app.globalData.identity=='student'){
      this.setData({
        identity:false
      })
      wx.setNavigationBarTitle({
        title: "添加问题"
      })
    }
    else{
      this.setData({
        identity:true
      })
      var util = require('../../utils/util.js')
      var dayTime = util.formatTime(new Date());
      const nowtime=dayTime.split(" ")[0].split("/")
      const nowdate=nowtime[0]+'-'+nowtime[1]+'-'+nowtime[2]
      this.setData({
        nowDate: nowdate,
        endDate: nowdate
       })
    }
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