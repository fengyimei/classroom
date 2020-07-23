//s_answer.js
//获取应用实例
var app = getApp()
Page({
  data: {
          curid:'',
          curindex:-1,
          curname:'',
          answer:'',
          score:-1,
          p_score:-1,
          filename:'',
          markword:'',
          p_markword:''
  },
  //事件处理函数
  
  onLoad: function (options) {
     this.setData({
       curid:options.id,
       curindex:options.index
     })
     const db = wx.cloud.database()
     db.collection('assignment').where({
             _id:this.data.curid
     }).get().then(res => { 
         if(res.data[0].length==0){
           wx.showToast({
             title: '出现错误',
             icon:'none'
           })
         }
         else{
           this.setData({
               curname:res.data[0].complete_list[this.data.curindex].name,
               answer: res.data[0].complete_list[this.data.curindex].answer,
               score: res.data[0].complete_list[this.data.curindex].score,
               markword: res.data[0].complete_list[this.data.curindex].markword,
               filename: res.data[0].complete_list[this.data.curindex].filepath

           })
         } 
      })

  },
  scoreChange:function(e){
    this.setData({
        p_score: e.detail.value
      })
  },
  markwordchange:function(e){
    this.setData({ 
       p_markword: e.detail.value
  })
},
  
openfile:function(){
  const that=this
  wx.cloud.downloadFile({
      // 示例 url，并非真实存在
      fileID: 'cloud://cloudclassroom-3tovs.636c-cloudclassroom-3tovs-1302479370/files/'+that.data.curname+'作业文件.pdf',
      success: function (res) {
              const filePath = res.tempFilePath
              wx.openDocument({
              filePath: filePath,
              success: function (res) {
                  console.log('打开文档成功')
              }
          })
      }
  })   
},

  // 发送信息
  formSubmit: function(e) {
    console.log(e.detail.value.input)
    if (this.data.p_score==-1)
    {
        wx.showToast({
            title: '未打分',
            icon:'none'
          })
    }
    else if(this.data.p_markword == ""){
        wx.showToast({
            title: '未输入评语',
            icon:'none'
          })
    }
    else{
      const id=this.data.curid
      const db = wx.cloud.database()  
      const cont=db.collection('assignment')
      cont.doc(this.data.curid).get().then(res=>{
        console.log(res.data)
        let curlist=res.data.complete_list
        let cur=res.data.complete_list[this.data.curindex]
        cur.score=this.data.p_score
        cur.markword=this.data.p_markword
        cur.hascorrected=true
        curlist[this.data.curindex]=cur
        const cont2=db.collection('assignment')
        cont2.doc(this.data.curid).update({
          data:{
            complete_list:curlist
          },
          success:function(res){
            // wx.showToast({
            //   title: '提交成绩成功',
            // })
            var pages = getCurrentPages();  
            var beforepage = pages[pages.length - 2];
            
            if (beforepage == undefined || beforepage == null){
              return;
            }   
            beforepage.setData({
              complete_list:curlist
            })
            wx.showToast({
              title: '成功提交批改',
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1,
              })
            },1500)
          },
          fail:function(res2){
            wx.showToast({
              title: '成绩提交失败',
              icon:'none'
            })
          }
        })
    })
  }       
},
  // 结束任务
  finish_homework: function(){
      this.setData({
          toast2Hidden: false   // 消息提示框
      })
  },

  // 重启任务
  restart_homework: function() {
      this.setData({
          toast3Hidden: false   // 消息提示框
      }),
      console.log('任务重启')
  },

})

// success:function(e){
//   var page = getCurrentPages().pop();  
//    if (page == undefined || page == null) return;  
//   page.onLoad();  
// }
