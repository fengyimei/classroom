// pages/s_completetask/s_completetask.js
const app=getApp()
Page({

  data: {
     curid:'',
     content:'',
     answer:'',
     filepath:'',
     filename:'',
     issecond:false,
     condition:'',
     detailPics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      curid:options.id
    })
    const db=wx.cloud.database()
    const cont = db.collection('assignment')
    cont.where({
      _id:this.data.curid
    }).get().then(res=>{
      this.setData({
        content: res.data[0].content
      })
    })
  },
  contentChange:function(e){
     this.setData({
       answer: e.detail.value
     })
  },
   
  uploadImgHandle: function () {
    const that=this
    var detailPic=[]
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res=> {
        var imgs = res.tempFilePaths;
        if(imgs.length>=3){
          wx.showToast({
            title: '图片数量超出限制',
            icon:'none'
          })
        }
        else{
          for (var i = 0; i < imgs.length; i++) {
            detailPic.push(imgs[i])
          }
          that.setData({
            detailPics:detailPic
      })
     }
    },
      fail:res=>{
        wx.showToast({
          title: '上传失败',
          icon:'none'
        })
      }
  })
},

  uploadfile:function(e){
    const that=this
    wx.chooseMessageFile({
      count: 1,
      type:'all',
      success(res){
          console.log("选择文件成功",res);
          if(res.tempFiles.length==0){
            wx.showToast({
              title: '文件不存在或路径错误，请重新选择',
              icon:'none'
            })
            return
          }
          //tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths=res.tempFiles[0].path
          wx.cloud.uploadFile({
              cloudPath:'files/'+app.globalData.username+"作业文件"+".docx",//上传到云端的路径
              filePath:tempFilePaths,//小程序的临时文件路径
              success:res=>{
                console.log(res)
                that.setData({
                  filename:app.globalData.username+'作业文件'+'.docx',
                  filepath:res.fileID
                })
                  wx.showToast({
                   title: '上传文件成功',
                   })
                 
               },
              fail:res=>{
                 wx.showLoading({
                   title: '上传文件失败',
                   icon:'none'
                 })
              }
          })
      }
  })


  },

  formSubmit:function(e){
      if(this.data.answer=='' && this.data.filepath==''){
        wx.showToast({
          title: '未输入有效作业内容',
          icon:'none'
        })
      }
      else{
        const db=wx.cloud.database()
        const cont = db.collection('assignment')
        cont.where({
          _id: this.data.curid
        }).get().then(res=>{
          if(res.data[0].length==0){
            wx.showToast({
              title: '作业已不存在',
              icon:'none'
            })
          }
          else{
            var complete_list=res.data[0].complete_list.slice()
            var flag=0
            for(let i in complete_list){
              if(complete_list[i].name==app.globalData.username){
                flag=1
                complete_list[i].answer=this.data.answer
                complete_list[i].hascorrected=false
                complete_list[i].issecond=true
                complete_list[i].score=''
                complete_list[i].markword=''
                complete_list[i].condition='已重新提交，未批改'
                complete_list[i].filepath=this.data.filepath
                complete_list[i].filename=this.data.filename
                const temp=db.collection('assignment')
                temp.doc(res.data[0]._id).update({
                  data:{
                    complete_list:complete_list
                  },
                  success:function(res){
                    wx.showToast({
                      title: '重新提交成功',
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
                  },
                  fail:function(res){
                    wx.showToast({
                      title: '修改作业失败',
                      icon:'none'
                    })
                  }
                })
              }
            }
            if(!flag){
              const that=this
              var Picpath=[]
              for(let i=0; i<that.data.detailPics.length; i++){
                Picpath.push('images/' +app.globalData.username+i+'.jpg')
                wx.cloud.uploadFile({
                  cloudPath: 'images/' +app.globalData.username+i+'.jpg', // 上传至云端的路径
                  filePath: that.data.detailPics[i], // 小程序临时文件路径
                  success: res => {
                    // 返回文件 ID
                    console.log("上传成功" + res.fileID)
                  },
                  fail: res=>{
                    wx.showToast({
                      title: '图片上传出错,请重新提交',
                      icon:'none'
                    })
                    Picpath=[]
                    return
                  }
                })
              }
              var temp2={
                name:app.globalData.username,
                answer:that.data.answer,
                score:'',
                markword:'',
                hascorrected:false,
                condition:'已提交',
                picpath:that.data.detailPics,
                filepath:that.data.filepath,
                filename:that.data.filename
              }
              var complete_list2=res.data[0].complete_list.slice()
                console.log(complete_list2)
                complete_list2.push(temp2)
                const temp=db.collection('assignment')
                temp.doc(res.data[0]._id).update({
                  data:{
                    complete_list:complete_list2
                  },
                  success:function(res){
                    wx.showToast({
                      title: '提交作业成功',
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
                  },
                  fail:function(res){
                    wx.showToast({
                      title: '提交作业失败',
                      icon:'none'
                    })
                  }
                })
            }
          }
        })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})