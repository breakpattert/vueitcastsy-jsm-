<template>
<div id="tmpl">
  <!--1.0 实现新闻资讯列表样式-->
  <div class="mui-content">


    <div class="c_bgc">
      <div class="c_input">
        <input type="number" v-model="userphone" name="" id="phone" placeholder="手机号修改后将在下次点赞时生效" />
      </div>
      <div class="s_win">
      	<img src="../../../statics/imgs/fiurt.png" alt="" />
      </div>
      <a v-on:click="changePhone()">
        <h4>确定修改</h4>
        <img src="../../../statics/imgs/buttonone.png" alt="" />
      </a>
    </div>
    <div class="buttom_bgc">
      <div class="change_s" v-show="isshow">
        <label>当前手机号为</label><i style="color:#ffffff!important;">{{olduserphone}}</i>
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
     <div class="ridio_d" id="rid" v-show="isblock">
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
      list: [], //新闻列表功能
      dataPhone: '',
      oldNum: '',
      userphone: '',
      total: '',
      userlist: null,
      wuid: '',
      thirdparty_no: '',
      isshow: false,
      mainlist: null,
      amount:'',
      olduserphone:'',
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
		 this.getmodel();

  },
  methods: {
    changePhone: function() {
      var phone = document.getElementById('phone').value;
      console.log(phone);
      var reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!reg.test(phone)) {
        Toast('手机号有误,请重新填写');
        return;
      } else {


     			this.postphone();

      }
    },

    postphone: function() {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/share_wish/mobile/binding",
        dataType: 'json',
        data: {
          mobile: that.userphone,
          thirdparty_no: that.thirdparty_no,
           thirdparty_type:that.thirdparty_type,
        },
        success: function(data) {
          if (data.code == 10000) {
          	 Toast('手机号修改成功');
          	 	that.$router.replace({
       					path: '/news/newspoint'
     						});
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
    getmodel: function() {
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


            that.mainlist = data.data.activity_thirdparty_user;
             that.amount = data.data.activity_thirdparty_user.amount;
            console.log(that.mainlist.mobile);
            if (that.mainlist.mobile == '') {
              that.isshow = false;

            } else {
            	that.isshow = true;
              that.olduserphone = that.mainlist.mobile;
              that.amount = that.mainlist.amount;
              
            }
            //           console.log(userlist);
            //           console.log(userlist.mobile);
          }
        }
      })

    },
//   getlist: function() {
//    var that = this;
//    $.ajax({
//      url: common.apidomain + "/activity/share_wish/like",
//      dataType: 'json',
//      data: {
//        wuid: that.wuid,
//        thirdparty_no: that.thirdparty_no,
//        thirdparty_type: 2
//      },
//      success: function(data) {
//        if (data.code == 10000) {
//          that.$router.replace({
//            path: '/news/newsinfo'
//          });
//
//          console.log(data);
//        } else if (data.code == 40001) {
//          Toast(data.msg);
//           that.$router.replace({
//            path: '/news/newsinfo'
//          });
//
//        }
//      }
//    })
//  },

  },
  watch: {

  },
 
}
</script>

<style scoped>
.mui-content {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background: rgba(26, 9, 83, 1);
  /*	padding-top: 100px;*/
}

.c_bgc {
  padding: 0 1.5rem;
  position: relative;
  padding-top: 5.9rem;
  background-color: #527cff;
  width: 100%;
  height: 7.89rem;
  margin: auto;
  perspective: 1000px;
}

.c_bgc .c_input {
  position: absolute;
  left: 0;
  margin: auto;
  right: 0;
  top: 1rem;
  /*   width:19.8rem;*/
  height: 3.25rem;
  border-radius: 50%;
  padding: 0 1.5rem;
}

.c_input>input {
  height: 3.03rem;
  padding: 0rem 1rem;
  border-radius: 3.03rem;
  text-align: center;
  font-size: 1rem;
}
.s_win{
	position: absolute;
  left: 0;
  margin: auto;
  right: 0;
  top: -1rem;
  /*   width:19.8rem;*/
  height: 6.25rem;
  border-radius:4.25rem;
  padding: 0 1.5rem;
	    display: none;
  overflow: hidden;
}
.s_win>img{
	width:100%;
	height: 100%;
}

input::input-placeholder {
  color: #9CB5FF;

}

input::-webkit-input-placeholder {
  color: #9CB5FF;

}

input::-moz-placeholder {
  color: #9CB5FF;

}

input:-moz-placeholder {
  color: #9CB5FF;

}

input::-ms-input-placeholder {
  color: #9CB5FF;

}

.c_bgc>a {
  text-align: center;
  margin: 0 auto;
  /* padding: 0 1.8rem;*/
  width: 19.82rem;
  height: 3.25rem;
  display: block;
  width: 100%;
  overflow: hidden;
  transition: all 1s;

}

.c_bgc:hover .a {
  transform: translateZ(-4px);
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
/*  background-color: #527cff;*/
  width: 100%;
  height: 4rem;
}

.buttom_bgc .change_s {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 1.6rem;


}

.change_s>i {
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
