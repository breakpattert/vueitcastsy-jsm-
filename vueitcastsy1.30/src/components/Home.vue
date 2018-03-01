<template>
<div id="tmpl">

  <div class="mui-content">
    <div class="c_bgc">
    	<p style="text-align: center;color:#ffffff;font-size: 1.15rem;margin-bottom:1rem;">为他们的爱情助力即可获得现金红包</p>
      <a v-on:click="getpoint()" style="width:8.9rem" v-if="showptoto">
        <img src="../../statics/imgs/buttons.png" alt="" />
      </a>
       <a style="width:8.9rem" v-if="showlike">
        <img src="../../statics/imgs/thanks.png" alt="" />
      </a>
    </div>
    <div class="v_block" v-show="v_block">
    	<div class="v_main">
    	<div class="v_content" v-if="iftrue">
 			<h4>恭喜您获取<i class="h_money">{{amount}}</i>红包</h4>
      <div class="c_input">
        <input type="number" v-model="oldNum" name="" id="phone" placeholder="首次领取需先绑定手机号" />
      </div>
      <a v-on:click="checkDel()">
        <h4>确定领取</h4>

      </a>
 			</div>
 		<!--<div class="v_content" v-if="iftrue">
 			<h4>恭喜您获取<i class="h_money">{{hmoney}}</i>红包</h4>
      <div class="c_input">
        <input type="number" v-model="oldNum" name="" id="phone" placeholder="首次领取需先绑定手机号" />
      </div>
      <a v-on:click="checkDel()">
        <h4>确定领取</h4>

      </a>
 			</div>-->
 			<div class="v_contents" v-if="iffase">
 			<h4>恭喜您获取<i class="h_moneys">{{amount}}</i>红包</h4>
      <div class="c_inputs">
       <p>红包已经放置账户<span>{{mobile}}</span></p>
      </div>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=me.fmfm.loverfund">
        <h4>打开恋爱宝</h4>

      </a>
 			</div>
 			
 			
    		<div class="del" v-on:click="opendel()">
    			<img src="../../statics/imgs/close.png" alt="" />
    		</div>
    		
    	</div>
    	
    	
    </div>

    <div class="footer">
      <div class="tip_title">
        <p>截止当前，已经获得了{{like_count}}个赞</p>

      </div>
    </div>




    </ul>

  </div>

</div>
</template>

<script>
import {
  Toast
} from 'mint-ui';

import common from '../kits/common.js';
import $ from '../../statics/js/jquery-3.2.1.min.js';
export default {
  data() {
    return {
    	imgsurl:'',
      list: null,
      v_block: false,
      thirdparty_no: '',
			showptoto:true,
			showlike:false,
      thirdparty_type:'',
      isblock:false,
      oldNum:'',

      iftrue:false,
      iffase:false,
       mate_id: '',
			key_sentence:'',
 			wish_count:'0',
 			beyond_percent:'0',
 			generate_img_url:'',
 			like_count:'',
 			spring_homepage_status:1,
      thirdparty_type:'',
      mobile:'',
      like_id:'',
   		spring_mate_id:'',
   		origin_img_url:'',
   		amount:'0',
    }
  },
  created() {
    // 当页面中的data和methods对象都创建完毕以后，就会自动调用created
  	  　function queryParam(name) {
　　　　        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
　　　　        var r = window.location.search.substr(1).match(reg);
　　　　        if(r != null) return unescape(r[2]);
　　　　        return null;

　　　　      }
  	   // 	先不启用

    var slicwuid = queryParam("muid");
    //截取问好后面参数#号前面的参数
    this.muid = slicwuid;
    //  判断一下这个第三方id是否在为空,为空就跳转到授权页面不为空就是当前页面
    this.thirdparty_no = queryParam("thirdparty_no");

    this.thirdparty_type = queryParam("thirdparty_type");
    this.getuserlike();

    
  

  },
  methods: {
  	 checkDel: function() {
      var phone = document.getElementById('phone').value;
      console.log(phone);
     
      var reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!reg.test(phone)) {
        Toast('手机号有误,请重新填写');
        return;
      } else {
      	console.log(phone);
      	this.mobile=phone;
      	this.getphone(phone);
	
      }

    },
    getpoint: function() {
      // if (this.spring_homepage_status == 0) {
      	this.getlike();
      	this.showlike=true;
				// this.showptoto =true;
// 			this.imgsurl="../../statics/imgs/thanks.png";
      	this.v_block = true;
      	this.iftrue = true;
//    	 this.getlist();

      // }
     

  
    },
    opendel:function(){
    		this.v_block = false;
    },


    getphone: function(phone) {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/spring/hongbao/get",
        dataType: 'json',
        data: {
        	mate_id:that.mate_id,
        	like_id:that.like_id,
          spring_mate_id:that.spring_mate_id,
          mobile:phone,
        },
        success: function(data) {
          if (data.code == 10000) {
          				this.iftrue=false;
									this.iffase=true;
          

         
          }else{
          	
          		Toast(data.msg);
          }
        }
      })
    },
//  获取首页的信息
    getuserlike: function() {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/spring/homepage/get",
        dataType: 'json',
        data: {
       muid: that.muid,
//					muid:'1_1',
//				thirdparty_no:'123',
     thirdparty_no: that.thirdparty_no,
     thirdparty_type:that.thirdparty_type,
//					thirdparty_type:0
        },
        success: function(data) {
          if (data.code == 10000) {
            that.list = data.data.spring_activity_mate_d_t_o;
             that.mate_id = that.list.mate_id;
             that.key_sentence = that.list.key_sentence;
             that.wish_count = that.list.wish_count;
             that.beyond_percent = that.list.beyond_percent;
             that.generate_img_url = that.list.generate_img_url;
             that.origin_img_url = that.list.origin_img_url;
             that.like_count = that.list.like_count;
          	
            	that.mobile = that.list.mobile;
            	that.amount = that.list.amount;
            	that.like_id = that.list.like_id;
            	that.spring_mate_id = that.list.spring_mate_id;
          		that.spring_homepage_status = that.list.spring_homepage_status;
//          			that.spring_homepage_status = 1;
          	    if(that.spring_homepage_status=0){
 								that.v_block=false;

 								that.iffase=false;
 								that.iftrue=false;
 								
							}if(that.spring_homepage_status=1){
 								that.v_block=true;
  									that.iffase=false;
 								that.iftrue=true;
										that.showlike=true;
										that.showptoto =false;
// 								that.imgsurl="../../statics/imgs/thanks.png";
  	
  							}if(that.spring_homepage_status=2){
  								that.v_block=true;
  								that.iffase=true;
 								that.iftrue=false;
 								that.showlike=true;
										that.showptoto =false;
// 								that.imgsurl="../../statics/imgs/thanks.png";
  							}

          }
          else{
          	 Toast(data.msg);
          }
        }
      })
    },
//获取点赞信息
    getlike: function() {
      var that = this;
      $.ajax({
        url: common.apidomain + "/activity/spring/like",
        dataType: 'json',
        data: {
        	mate_id:that.mate_id,
        	 thirdparty_no: that.thirdparty_no,
//        thirdparty_no: '123',
//         thirdparty_type:'0',
            thirdparty_type:that.thirdparty_type,
        },
        success: function(data) {
          if (data.code == 10000) {
          	that.amount = data.data.spring_activity_likes_d_t_o.amount;
          }else{
          	Toast(data.msg);
          }
          
          
        }
      })

    },
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
  width: 100%;
/*  height: 7.89rem;*/
  margin: auto;
margin-top: 1.25rem;
}

.c_bgc>a {


 
  text-align: center;
  margin: 0 auto;
  /* padding: 0 1.5rem;*/
  width: 8.9rem;
  display: block;
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
  text-align:center;
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

.change_s>a {
  padding-bottom: 1px;
  font-weight: 700;
  color: #FECB85;
  font-size: 0.75rem;
}
.v_block{
	width:100%;
text-align: center;
	padding:1.25rem;
height:17.855rem;
	position: absolute;
	top:0.4rem;
	left: 0;
	right:0;
/*bottom:0;*/
	margin: auto;
/*border:1px solid #DD524D;*/
 transition: all 3s;

 
/* animation: run 0.5s linear forwards;*/
/* animation: run 1s linear infinite;*/
	}
	@keyframes run {
  /*百分比是相对于动画的执行时间*/
  0% {
    /*transform: translate(0, 0px);*/
	height:0
  }

  100% {
   	height: 14rem;
	/*			height: 200px;*/
    /*		background-color: green;*/
  /*  transform: translate(0, 0px);*/
  }
}
	.v_main{
		border-radius: 1.25rem;
		width:100%;
		height:100%;
/*		border: 1px solid #000;*/
		text-align: center;
		background:rgba(85,56,238,1);
		border-radius: 1.43rem ; 
		
	}
	.v_main .v_content>h4{
		  color: #fff;

    padding-bottom: 1.75rem;
    padding-top: 0.86rem;
	}
	.v_content>a{
		margin: 0 auto;
    margin-top: 1.5rem;
    width: 8.59rem;
    height: 3.3rem;
    background: rgba(226,90,65,1);
    border-radius: 3.3rem;
    display: block;
    color: #fff;
    /* font-size: 1.07rem; */
	}
	.v_content .h_money{
		color:#E25A41;
	font-size: 2.86rem;
	position: relative;
  top: 0.5rem;
	}
	 .c_input {
/*  position: absolute;*/
  left: 0;
  margin: auto;
  right: 0;
  top: 4rem;
  /*    width:19.8rem;*/
  height: 3.25rem;
  border-radius: 50%;
  padding: 0 1rem;
  opacity: 1;
/*  transition: all 1s ease-out 1s;*/
/*  animation: ttip 1s ease-in forwards;*/
}
.v_content>a>h4{
			      line-height: 3.3rem;
}

.c_input>input {
  /*  width: 19.8rem;*/
  height: 3.03rem;
  padding: 0rem 1rem;
  border-radius: 3.03rem;
  text-align: center;
  font-size: 1rem;
}
	.v_main .v_contents>h4{
		  color: #fff;

    padding-bottom: 1.75rem;
    padding-top: 0.86rem;
	}
	.v_contents>a{
		margin: 0 auto;
    margin-top: 1.5rem;
    width: 8.59rem;
    height: 3.3rem;
    background: rgba(226,90,65,1);
    border-radius: 3.3rem;
    display: block;
    color: #fff;
    /* font-size: 1.07rem; */
	}
	.v_contents .h_moneys{
		color:#E25A41;
	font-size: 2.86rem;
	position: relative;
  top: 0.5rem;
	}
	 .c_inputs {
/*  position: absolute;*/
  left: 0;
  margin: auto;
  right: 0;
  top: 4rem;
  /*    width:19.8rem;*/
  height: 3.25rem;
  border-radius: 50%;
  padding: 0 1rem;
  opacity: 1;
/*  transition: all 1s ease-out 1s;*/
/*  animation: ttip 1s ease-in forwards;*/
}
.v_contents>a>h4{
			      line-height: 3.3rem;
}

.c_inputs>p {
  /*  width: 19.8rem;*/
  height: 3.03rem;
  /*padding: 0rem 1rem;*/

  text-align: center;
  color:#fff;
  font-size: 1rem;
}
	.v_main .del{
		border: #000;
		position: absolute;
		    width: 1rem;
    height: 1rem;
    font-size:1.25rem;
    /* border: rgba(157, 141, 141, 0.62); */
    position: absolute;
    color: rgba(117, 111, 111, 0.94);
    top: 2rem;
    right:2.5rem;
	}
	
.footer {
  /*position: fixed;*/
  width: 100%;
  bottom: 0;
  left: 0;
  height: 5.6rem;
/*  background: rgba(26, 9, 83, 1);*/
}

.tip_title>p {
	    margin-top: 0.75rem;
  color: #fff;
  font-size: 0.795rem;
text-align: center;
  line-height: 1.25rem;

}

.footer .tip_title {
  height: 1.25rem;
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



</style>
