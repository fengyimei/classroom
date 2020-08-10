//s_answer.js
//获取应用实例
var app = getApp()
Page({
  data: {
          t_id:'',
          curid:'',
          hTitle:'',
          curindex:-1,
          curname:'',
          answer:'',
          score:-1,
          p_score:-1,
          filename:'',
          filepath:'',
          markword:'',
          p_markword:'',
          is_excellent:true,
          items: []  ,
          newcomment:'',
          pingyutotal:'',/*总评语 提交后的 */
          input1:false
  },
  //事件处理函数
  
  onLoad: function (options) {
     this.setData({
       curid:options.id,
       curindex:options.index,
       hTitle:options.hTitle
     })
     const db = wx.cloud.database()
     db.collection('account_information').where({
       id:app.globalData.username
     }).get().then(res=>{
        this.setData({
          t_id:res.data[0]._id,
          items:res.data[0].quick_comment
        })
     })
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
               p_score: res.data[0].complete_list[this.data.curindex].score,
               p_markword: res.data[0].complete_list[this.data.curindex].markword,
               filepath: res.data[0].complete_list[this.data.curindex].filepath,
               filename:res.data[0].complete_list[this.data.curindex].filename
           })
         } 
      })

  },

  onHide:function(options){
      const db=wx.cloud.database()
      const that=this
      db.collection('account_information').doc(this.data.t_id).update({
          data:{
            quick_comment:that.data.items
          }
      })
  },

  onUnload:function(e){

    const db=wx.cloud.database()
    const that=this
    db.collection('account_information').doc(this.data.t_id).update({
        data:{
          quick_comment:that.data.items
        }
    })
  },

  radiochange:function(e){
     this.setData({
       is_excellent:e.detail.value
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
      fileID: that.data.filepath,
      success: function (res) {
              const filePath = res.tempFilePath
              wx.openDocument({
              filePath: filePath,
              success: function (res) {
                  console.log('打开文档成功')
                  wx.showToast({
                    title: '打开文档成功'
                  })
              },
              fail:function(){
                wx.showToast({
                  title: '文档下载失败',
                  icon:'none'
                })
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
      const title=this.data.hTitle
      const name=this.data.curname
      const filename=this.data.filename
      const answer=this.data.answer
      const markword=this.data.p_markword
      const path=this.data.filepath
      const id=this.data.curid
      const db = wx.cloud.database()  
      const cont=db.collection('assignment')
      cont.doc(this.data.curid).get().then(res=>{
        var curlist=res.data.complete_list
        var cur=res.data.complete_list[this.data.curindex]
        var e_list=res.data.e_list.slice()
        cur.score=this.data.p_score
        cur.markword=this.data.p_markword
        cur.hascorrected=true
        cur.condition='老师已批改反馈'
        curlist[this.data.curindex]=cur
        cur.is_excellent=this.data.is_excellent
        if(cur.is_excellent==true){
          var i=0
          for(;i<e_list.length;i++){
              console.log(name)
              if(e_list[i].name==name){
                e_list[i].anwer=answer
                e_list[i].markword=markword
                e_list[i].filename=filename
                e_list[i].filepath=path
                break
              }
          }
          if(i==e_list.length){
            var tempobject={
              name:name,
              answer:answer,
              markword:markword,
              filename:filename,
              filepath:path,
            }
            e_list.push(tempobject)
          }
        }
        const cont2=db.collection('assignment')
        cont2.doc(this.data.curid).update({
          data:{
            complete_list:curlist,
            e_list:e_list
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
  
  deleteitem:function(e){
      const index=e.index
      var templist=this.data.items.slice()
      templist.splice(index,1)
      for(let i=0;i<templist.length;i++){
        templist[i].name=i
      }
      this.setData({
        items:templist
      })
      
  },
  newchange:function(e){
    this.setData({
      newcomment:e.detail.value
    })
    const newitems1=this.data.items
      newitems1.push({name:'',value:e.detail.value})
      console.log(e)
      this.setData({
        items:newitems1
        })

  },

  add:function(e){
    if(this.data.newcomment=='' || this.data.newcomment.match(/^\s+$/)){
      return
    }
    var templist=this.data.items.slice()
    var len=templist.length
    templist.push(
      { 
        name:len,
        value:this.data.newcomment
    })
    this.setData({
      newcomment:'',
      items:templist
    })
  },

  inputs:function()
  {
   this.setData({
   input1:true
   })
  },

  checkboxChange: function (e) {
    console.log('老师的评语模板是：', e.detail.value)
    this.setData({
      p_markword:e.detail.value.join(',')
    })
  },
})

// success:function(e){
//   var page = getCurrentPages().pop();  
//    if (page == undefined || page == null) return;  
//   page.onLoad();  
// }
