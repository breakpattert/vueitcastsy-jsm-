<template>
<div id="tmpl">
  <!-- 1.0 轮播图：mint-ui中的 swipe组件实现 -->



  <div class="mui-content">
    <div class="c_bgc">
      <a v-on:click="getinfo()">
        <h4>助力愿望，领取红包</h4>
        <img src="../../../statics/imgs/buttonone.png" alt="" />
      </a>
    </div>
    <div class="buttom_bgc">
      <div class="change_s">
        <label>恋爱红包将放置账户</label>
        <i style=" color:#ffffff!important;">{{userphone}}</i>
        <a v-on:click="changePhone()" style="padding-bottom: 3px;border-bottom: 1px solid #fecb85;">修改></a>
      </div>
    </div>

    <div class="footer">

      <div class="tip_title">
        <h4>{{total}}位好友为他们的愿望助了一份力</h4>
        <div class="tip_img"><img src="../../../statics/imgs/tip_q.png" alt="" /></div>
      </div>


       <div class="tip_tp">
       	<p>愿望发起者和助力者都能领取大红包哦</p>
       </div>
      <ul class="uls">
        <li v-for="item in mylist"><img v-bind:src="item.img_url" alt="" /></li>


      </ul>
      <div class="ridio_d" v-show="isblock">
        <div class="ridio_li ridio_left"><a href=""></a></div>
        <div class="ridio_li"><a href=""></a></div>
        <div class="ridio_li"><a href=""></a></div>
      </div>


    </div>
  </div>

</div>
</template>

<script>
import {
  Toast
} from 'mint-ui';
import common from '../../kits/common.js';
import $ from '../../../statics/js/jquery-3.2.1.min.js';

export default {
  data() {
    return {
      list: [],
      userphone: '',
      total: '',
      userlist: null,
      wuid: '',
      thirdparty_no: '',
      user:null,
      mylist:null,
       thirdparty_type:'',
         isblock:false,
    }
  },
  created() {
  	  　function queryParam(name) {
　　　　        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
　　　　        var r = window.location.search.substr(1).match(reg);
　　　　        if(r != null) return unescape(r[2]);
　　　　        return null;
　　　　      }
    // 	先不启用
//  function UrlSearch() {
//
//    var name, value;
//    var str = location.href; //取得整个地址栏
//    var num = str.indexOf("?")
//    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
//
//    var arr = str.split("&"); //各个参数放到数组里
//    for (var i = 0; i < arr.length; i++) {
//      num = arr[i].indexOf("=");
//      if (num > 0) {
//        name = arr[i].substring(0, num);
//        value = arr[i].substr(num + 1);
//        this[name] = value;
//      }
//    }
//  }
//  var Request = new UrlSearch(); //实例化
    var slicwuid = queryParam("wuid");
    //截取问好后面参数#号前面的参数
    this.wuid = slicwuid;
    this.thirdparty_no = queryParam("thirdparty_no");
    this.thirdparty_type = queryParam("thirdparty_type");
    this.getuserlike();
  	this.getmoney();
  },
  methods: {

    changePhone: function() {
      this.$router.replace({
        path: '/news/changephone'
      });
    },
    getinfo: function() {
      this.getlist();


    },
    getlist: function() {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/share_wish/like",
        dataType: 'json',
        data: {
          wuid: that.wuid,
          thirdparty_no: that.thirdparty_no,
           thirdparty_type:that.thirdparty_type,
        },
        success: function(data) {
          if (data.code == 10000) {
          	
            that.$router.replace({
            	
              path: '/news/newsinfo'
              
            });

          } if(data.code == 30003) {
          	
            Toast(data.msg);
            
          } if(data.code == 40001) {
          	
            Toast(data.msg);
            
         		that.$router.replace({
         			
           	path: '/news/newsinfo'
           	
         });
          } if(data.code == 30002) {
          	
            Toast(data.msg);
            
          }if(data.code == 30004) {
          	
							Toast(data.msg);
							
         }
        }
      })
    },
    getuserlike: function() {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/share_wish/likers",
        dataType: 'json',
        data: {
          wuid: that.wuid,
       		
           thirdparty_type:that.thirdparty_type,
          
        },
        success: function(data) {
          if (data.code == 10000) {
            that.mylist = data.data.pagination_d_t_o.datas;
              that.total = data.data.pagination_d_t_o.total_count;

               if(that.total ==0) {
							that.isblock=false;

            }if(that.total >4) {
            	that.isblock=true;
       
            }if(that.total <4){
            	
            	that.isblock=false;
            }


          }
        }
      })
    },
    getmoney: function() {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/share_wish/account/get",
        dataType: 'json',
        data: {
          wuid: that.wuid,
          thirdparty_no: that.thirdparty_no,
          thirdparty_type:that.thirdparty_type,
        },
        success: function(data) {
          if (data.code == 10000) {
            console.log(data);
            that.user = data.data.activity_thirdparty_user;
            that.userphone=that.user.mobile; 
//          that.postphone();
          }
        }
      })
    },
//  postphone: function() {
//    var that = this;
//    $.ajax({
//      url: common.apidomain + "/activity/share_wish/mobile/binding",
//      dataType: 'json',
//      data: {
//        mobile: that.userphone,
//        thirdparty_no: that.thirdparty_no,
//        thirdparty_type: 2
//      },
//      success: function(data) {
//        if (data.code == 10000) {
//          that.$router.replace({
//            path: '/news/newspoint'
//          });
//
//
//        }
//        if (data.code == 30003) {
//          Toast(data.msg);
//        }
//        if (data.code == 40001) {
//          Toast(data.msg);
//        }
//        if (data.code == 30002) {
//          Toast(data.msg);
//        }
//
//      }
//    })
//  },

  }
}
</script>

<style scoped>
.mui-content {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;

}

.bgc_conts {
  margin: 0 auto;
  height: 100px;

}

.bgc_conts>img {
  width: 100%;
  height: 100%;

}

.c_bgc {

  position: relative;
  padding: 0 1.5rem;
  padding-top: 5.9rem;
  background-color: #527cff;
  width: 100%;
  height: 7.89rem;
  margin: auto;
}

.c_bgc>a {
  border-radius: 3.35rem;

  text-align: center;
  margin: 0 auto;
  /* padding: 0 1.5rem;*/
  width: 19.82rem;
  height: 3.25rem;
  display: block;
  width: 100%;
  overflow: hidden;
}

.c_bgc>a>h4 {
  color: #fff;
  position: absolute;

  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.c_bgc>a>img {
  width: 100%;
  height: 100%;
}

.buttom_bgc {
  border-radius: 0 0 50% 50%;

  width: 100%;
  height: 4rem;
}

.buttom_bgc .change_s {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 1.6rem;


}

.change_s>span {
  font-weight: 700;
	color:#ffffff!important;
  margin: 0 3.2rem 0 1.25rem;
  font-size: 0.75rem;
}

.change_s>label {
  font-weight: 700;
  color: #fff;
  font-size: 0.75rem;
}

.change_s>a {
  padding-bottom: 1px;
  font-weight: 700;
  color: #FECB85;
  font-size: 0.75rem;



}

.footer {
  /*position: fixed;*/
  width: 100%;
  bottom: 0;
  left: 0;
   height: 11.6rem;
/*  background: rgba(26, 9, 83, 1);*/
}
.tip_title{
overflow: hidden;
 margin-top: 3.25rem;
}
.tip_title>h4 {
  color: #fff;
  font-size: 0.875rem;
  float: left;
  line-height: 1.25rem;

}

.footer .tip_title {
  height: 1.25rem;
	padding-left: 2.75rem;


}

.tip_title .tip_img {
  height: 1.25rem;
  width: 25%;
  float: left;
  margin-left: 2%;
}

.tip_img>img {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  width: 100%;
}

.footer .tip_tp{
	margin-top: 0.25rem;
		padding-left: 2.75rem;
}

.footer .tip_tp p{
  font-size: 0.75rem;

  color: #fff;

}

.footer>ul {
  margin-top: 1.92rem;
  margin-left: 10%;
  float: left;
  width: 65%;
  overflow: hidden;
}

.footer>ul>li {
  width: 2.66rem;

  background: rgba(147, 184, 255, 1);
  border-radius: 0.37rem;
  height: 2.66rem;
  float: left;
  list-style: none;
  margin-left: 4%;
  overflow: hidden;
}

.footer>ul>li>img {
  width: 100%;
  height: 100%;

}

.ridio_d .ridio_li {
  background: rgba(147, 184, 255, 1);
  float: left;
  width: 0.63rem;
  height: 0.63rem;
  border-radius: 50%;
  margin-top: 1rem;
  margin-right: 0.65rem;
}

.ridio_d.ridio_left {
  /*	margin-left:1.25rem;*/
}

.footer .ridio_d {
  margin-top: 1.92rem;
  float: left;
  width: 23%;
  margin-left: 2%;
  overflow: hidden;
}
.uls li:nth-child(5){
	margin-top:10px;
}
</style>
