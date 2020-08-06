// pages/t_answerdiscuss/t_answerdiscuss.js
Page({

  data: {
       chat_history:[],
       title:"",
       content:"",
       name:'',
       time_str:'',
       time_standard:'',
       curid:''
  },
  contentChange:function(e){
      console.log(e.detail)
      this.setData({
        t_reply: e.detail.value
      })
  },

  formSubmit:function(){
       if(this.data.t_reply==""){
         wx.showToast({
           title: '回复不能为空',
           icon: 'none'
         })
       }
       else{
        const db=wx.cloud.database()
        const cont = db.collection('discuss')
        console.log(this.data.curid)
        const id=this.data.curid
        cont.doc(id).update({
          data:{
            reply:this.data.t_reply,
            ischeck:true
          }
        }).then(res=>{
          console.log(res)
          wx.showToast({
            title: '回复成功',
            icon:'success'
          }) 
          setTimeout(function(){
            wx.navigateBack({
              delta: 1,
              success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
               }
         })
          },3000) 
        }).catch(res=>{
          console.log(res)
          wx.showToast({
            title: '回复失败',
            icon:'none'
          }) 
        })
       }
  },

  changetoadd:function(e){
    const id=this.data.curid
    wx.navigateTo({
      url: '/pages/t_answerdiscuss/t_answerdiscuss?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id)
      this.setData({
        curid: options.id
      })
      const db=wx.cloud.database()
      const cont = db.collection('discuss')
      cont.where({
        _id: options.id}).get().then(res=>{
            this.setData({
              title: res.data[0].hTitle,
              content:res.data[0].content,
              chat_history:res.data[0].chat_history,
              chat_length:res.data[0].chat_history.length,
              name:res.data[0].name,
              time_str:res.data[0].time_str,
              time_standard:res.data[0].time_standard
            })
            function fn(a,b){
              return a.time_str-b.time_str
            }
            function compare(p){
              return function(m,n){
                var x = m[p]
                var y = n[p]
                return x-y
            }
          }
            var templist=this.data.chat_history.slice()
            templist.sort(fn)
            console.log(templist)
            this.setData({
              chat_history:templist
            })
        }).catch(res=>{
          wx.showToast({
            title: '加载信息失败',
            icon: 'none'
          })
        })

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