// pages/private/private.js
var app=getApp() 
Page({ 
 
  /** 
   * 页面的初始数据 
   */ 
  data: { 
    identity:'', 
   studentname:[], 
   t_name:'', 
   s_name:'' 
  }, 
 
  t_caontact:function(e) 
  { 
    const t_name1=this.data.t_name 
    const s_name1=e.target.dataset.name 
    wx.navigateTo({ 
      url: '../contact/contact?t_name='+t_name1+'&s_name='+s_name1+'&speaker=server' 
    }) 
    console.log(e) 
  }, 
  s_caontact:function(e) 
  { 
    const s_name1=this.data.s_name 
    const t_name1=e.target.dataset.name 
    wx.navigateTo({ 
      url: '../contact/contact?t_name='+t_name1+'&s_name='+s_name1+'&speaker=student' 
    }) 
    console.log(e) 
  }, 
  /** 
   * 生命周期函数--监听页面加载 
   */ 
  onLoad: function (options) { 
    if(app.globalData.identity=='student'){ 
      const db = wx.cloud.database() 
      this.setData({ 
        identity: false, 
        s_name:app.globalData.username 
      }) 
      db.collection('contact').where({
          teacher:'fzy'
      }).get().then(res=>{
          var temps=res.data[0].student
          var flag=false
          for(let i=0;i<temps.length;i++){
            if(temps[i].name==this.data.s_name){
              if(temps[i].msg.length!=0){
                let templ=temps[i].msg.length-1
                let tempmsgl=temps[i].msg[templ].content.length-1
                if(temps[i].msg[templ].speaker=='server'){
                     flag=true
                }
              }
              break
            }
          }
          this.setData({
            studentname:[['fzy',flag]]
          })
      })
    } 
    else{ 
      this.setData({ 
        identity:true, 
        t_name:app.globalData.username 
      }) 
      const db = wx.cloud.database() 
      const t_name=this.data.t_name
      db.collection('contact').where({
        teacher:t_name
      }).get().then(res=>{
        console.log(res.data) 
        var temp=[]
        for(let i=0;i<res.data[0].student.length;i++){
        let tempname=res.data[0].student[i].name
        var  flag=false
        let tempmsg=res.data[0].student[i].msg
        let templ=res.data[0].student[i].msg.length
        if(templ!=0){
        console.log(tempmsg[templ-1].content.length)
        let tempstrl=tempmsg[templ-1].content.length
          if(templ!=0 && tempmsg[templ-1].speaker=='student' && (tempmsg[templ-1].content.charAt(tempstrl-1)=='？' || tempmsg[templ-1].content.charAt(tempstrl-1)=='?')){
            flag=true
          }
        }
          temp.push([res.data[0].student[i].name,flag])
        }
        this.setData({
          studentname:temp
        })
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