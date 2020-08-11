// pages/contact/contact.js
const app = getApp(); 
var inputVal = ''; 
var windowWidth = wx.getSystemInfoSync().windowWidth; 
var windowHeight = wx.getSystemInfoSync().windowHeight; 
var keyHeight = 0; 
 
/** 
 * 初始化数据 
 */ 
function initData(that) { 
   
} 
 
/** 
 * 计算msg总高度 
 */ 
// function calScrollHeight(that, keyHeight) { 
//   var query = wx.createSelectorQuery(); 
//   query.select('.scrollMsg').boundingClientRect(function(rect) { 
//   }).exec(); 
// } 
 
Page({ 
 
  /** 
   * 页面的初始数据 
   */ 
  data: { 
    scrollHeight: '100vh', 
    inputBottom: 0, 
    t_name:'', 
    s_name:'', 
    identity:'student', 
    student:[], 
    msgList:[] 
  }, 
 
  /** 
   * 生命周期函数--监听页面加载 
   */ 
  onLoad: function(options) { 
    this.setData({ 
      t_name:options.t_name, 
      s_name:options.s_name, 
      identity:options.speaker 
     }) 
     inputVal = ''; 
  const db = wx.cloud.database() 
  const add=db.collection('contact') 
  db.collection('contact').where( 
    { 
      teacher:this.data.t_name 
    } 
  ).get().then(res => { console.log(res.data)  
    var falg=false 
    for(var value of res.data[0].student){ 
     if(value.name==this.data.s_name) 
     {this.setData( 
       { 
         msgList:value.msg 
       } 
     ) 
     falg=true 
    } 
  } 
    if(falg==false) 
   { var studentlist=res.data[0].student 
    studentlist.push({msg:[],name:this.data.s_name}) 
    db.collection('contact').where( 
      { 
        teacher:this.data.t_name 
      } 
    ).update({ 
     data:{ 
       student:studentlist 
     } 
    }) 
    
  }}).catch(res=>{ 
    console.log(res) 
    wx.showToast({ 
      title: "历史记录获取失败", 
      icon:"none" 
    }) 
  }) 
  add.where({ 
    'teacher':this.data.t_name, 
    'student.name':this.data.s_name 
  }).watch({ 
    onChange: function (snapshot) { 
      //监控数据发生变化时触发 
      console.log(snapshot) 
       
    }, 
   
    onError:(err) => { 
      console.error(err) 
    } 
  }) 
 
 
  }, 
 
  /** 
   * 生命周期函数--监听页面显示 
   */ 
  onShow: function() { 
 
  }, 
 
  /** 
   * 页面相关事件处理函数--监听用户下拉动作 
   */ 
  onPullDownRefresh: function() { 
 
  }, 
 
  /** 
   * 页面上拉触底事件的处理函数 
   */ 
  onReachBottom: function() { 
 
  }, 
 
  /** 
   * 获取聚焦 
   */ 
  focus: function(e) { 
 
    keyHeight = e.detail.height; 
    this.setData({ 
      scrollHeight: (windowHeight - keyHeight) + 'px' 
    }); 
    this.setData({ 
      toView: 'msg-' + (this.data.msgList.length - 1), 
      inputBottom: keyHeight + 'px' 
    }) 
    //计算msg高度 
    // calScrollHeight(this, keyHeight); 
 
  }, 
  tap:function() 
  { 
    const db = wx.cloud.database() 
    const add=db.collection('contact') 
    add.where( 
      { 
        teacher:this.data.t_name 
      } 
    ).get().then(res => { console.log(res.data)  
      var falg=false 
      for(var value of res.data[0].student){ 
       if(value.name==this.data.s_name) 
       {this.setData( 
         { 
           msgList:value.msg 
         } 
       ) 
       falg=true 
      } 
    } 
  }) 
  }, 
 
  //失去聚焦(软键盘消失) 
  blur: function(e) { 
    this.setData({ 
      scrollHeight: '100vh', 
      inputBottom: 0 
    }) 
    this.setData({ 
      toView: 'msg-' + (this.data.msgList.length - 1) 
    }) 
 
  }, 
 
  /** 
   * 发送点击监听 
   * 发送信息  身份   
   */ 
  sendClick: function(e) { 
    const db = wx.cloud.database() 
    const add=db.collection('contact') 
    var msnew=this.data.msgList 
    msnew.push({ 
      speaker: this.data.identity, 
      contentType: 'text', 
      content: e.detail.value 
    }) 
    inputVal = ''; 
    this.setData({ 
      msgList:msnew, 
      inputVal 
    }); 
    add.where( 
      { 
        'teacher':this.data.t_name, 
        'student.name':this.data.s_name 
      } 
    ).update( 
      { 
        data:{ 
          'student.$.msg':this.data.msgList 
        } 
      } 
    ) 
 
  }, 
 
  /** 
   * 退回上一页 
   */ 
  toBackClick: function() { 
    wx.navigateBack({}) 
  } 
 
})