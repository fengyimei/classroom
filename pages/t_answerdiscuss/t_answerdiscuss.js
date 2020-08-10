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
    is_selectable:false,
    curid:"",
    special:''
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
    if (this.data.content== ""){
        wx.showToast({
          title: '未输入回复内容',
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
        if(app.globalData.identity=='teacher'){
          this.setData({
            special:'teachercss'
          })
        }
      }
      const db=wx.cloud.database()
      const cont = db.collection('discuss')
      var templist=[]
      const id=this.data.curid
      cont.doc(id).get().then(res=>{
          templist=res.data.chat_history.slice()
          templist.push({
            name:this.data.curname,
            content:this.data.content,
            time_str:app.globalData.time_str,
            time_standard:app.globalData.time_standard,
            special:this.data.special,
            identity:app.globalData.identity
          })
          console.log(templist)
          var teacher_reply=''
          if(app.globalData.identity=='teacher'){
            teacher_reply='有老师回复'
          }
          const db2=wx.cloud.database()
          db2.collection('discuss').doc(this.data.curid).update({
            data:{
              chat_history:templist,
              chat_length:templist.length,
              teacher_reply:teacher_reply
            }
          }).then(res2=>{
                 
            var pages = getCurrentPages();  
            var beforepage = pages[pages.length - 2];
            var before2page=pages[pages.length - 3]
            if (beforepage == undefined || beforepage == null||before2page == undefined || before2page == null){
              wx.showToast({
                title: '页面错误',
                icon:'none'
              })
              return;
            }   
            beforepage.setData({
              chat_history:templist,
              chat_length:templist.length
            })

            before2page.onLoad()
            wx.showToast({
              title: '成功提交回复',
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1,
              })
            },1500)

             }).catch(res2=>{
                wx.showToast({
                  title: '数据库连接出错',
                  icon:'none'
                })
                return
              })
      }).catch(res=>{
        wx.showToast({
          title: '数据库连接出错',
          icon:'none'
        })
      })
    }
  },

   
  radiochange:function(e){
    this.setData({
      is_selectable:e.detail.value
    })
 },

  onLoad:function(otions){
    this.setData({
      curid:this.options.id
    })
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