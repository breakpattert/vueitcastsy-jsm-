<!-- 以后项目的根组件 -->
<template>
<div>
  <!--   <p class="jj" v-on:click="text()">hhhha</p>-->

  <!-- 2.0 利用vue-router的 <router-view>进行占位 -->
  <div class="main">
    <div class="m_img">
      <div class="m_box">
        <div class="say">
          <span>恋爱宝为爱保鲜，恋人必备，全宇宙的CP都在玩</span>
          <img src="../statics/imgs/say.png" alt="" />
        </div>
      </div>
      <div class="content">
        <div class="track">
          <img src="" alt="" />
        </div>
        <div class="raido">
          <img src="../statics/imgs/raido.png" alt="" />
        </div>
        <div id="test_a" class="test">
          <img src="../statics/imgs/test.png" alt="" />
        </div>
        <div id="maol_a" class="maol">
          <img src="../statics/imgs/maol.png" alt="" />
        
        </div>
        <!--图片做一个处理的恋爱关键字-->
        <div id="leaf_a" class="leaf">
        	<div class="t_leaf"><img src="../statics/imgs/txts.png" alt="" /></div>
          <div class="b_leaf"><h2>{{key_sentence}}</h2></p></div>
        </div>
    
     
      </div>
      <div id="detial">
      	<div class="detil_m">
      		<div class="detil_i">
      			<img v-bind:src="origin_img_url" alt="" />
      		</div>
      		<div class="detil_b">
      			<div class="detil_ts" v-show="detilshow">
      			TA们在恋爱宝实现了<i>{{wish_count}}</i>个愿望</br>
						超过了 <i>{{beyond_percent}}%</i>的用户

      			</div>
      			<div class="detil_ts" v-show="detilshow2">
      					2018许新年心愿，从恋爱宝开始

      			</div>
      		</div>
      		
      	</div>
      </div>
    </div>
  </div>
  <router-view></router-view>
  <!-- 3.0 利用mui中的tabbar组件实现系统的底部 -->
  <div class="bottom">
    <div class="b_title">
      <h4>活动细则</h4>
<!--      <div class="title_img"><img src="../statics/imgs/title.png" alt="" /></div>-->
    </div>
    <ul>
      <li>
        <p> 1.愿望每获得一次点赞，分享的情侣和点赞的好友都能获得红包。</p>
      </li>
      <li>
        <p>2.点赞好友每日获得的红包上限为5个。 </p>
      </li>
      <!--<li style="background:darkgoldenrod;width:300px;height:20px;text-align:center;">
        <p>{{wuid}}</p>
      </li>-->
      <!--<li>
        <p>{{thirdparty_no}}</p>
      </li>-->
      <li>
        <p>3.分享愿望的情侣每日获得的红包上限20个。</p>
      </li>
      <li>
        <p>4.新用户需要注册并绑定为情侣后，才可以领取红包。</p>
      </li>
      <li>
        <p>5.红包在恋爱宝首页领取后，自动转换为恋爱基金。</p>
      </li>
      <li>
        <p>6.使用红包的手机号须为注册时使用的手机号。</p>
      </li>
      <li>
      	<p>7.本活动最终解释权归恋爱宝所有。</p>
      </li>
    </ul>

  </div>
</div>
</template>

<script>
	import {Toast} from 'mint-ui';
import $ from '../statics/js/jquery-3.2.1.min.js';
import common from './kits/common.js';
export default { // es6的导出对象的写法
  data() { //等价于 es5的 data:function(){
    return {
    	mouth:'',
      muid: '',
      thirdparty_no: '',
      mate_id: '',
      list: null,
      needs_days: '',
			key_sentence:'',
 			wish_count:'0',
 			beyond_percent:'0',
 			generate_img_url:'',
 			like_count:'',
 			spring_homepage_status:'',
      thirdparty_type:'',
      mobile:'',
      amount:'',
      like_id:'',
   		spring_mate_id:'',
   		origin_img_url:'',
   		detilshow:true,
   		detilshow2:false
   		
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

    var slicwuid = queryParam("muid");
    //截取问好后面参数#号前面的参数
    this.muid = slicwuid;
    //  判断一下这个第三方id是否在为空,为空就跳转到授权页面不为空就是当前页面
    this.thirdparty_no = queryParam("thirdparty_no");
    //控制我们回调，如果用户另外在分享出去的话就给他重新再授权一次拿到用户数据
  if(this.thirdparty_no==null){
//		  	window.loacation.href ="http://m.matepay.cc/matepay/share/wish/tencent/index.html";
	// window.location.href ="http://m.matepay.cc/matepay/activity/spring/wechat/index.html?muid="+slicwuid
  }

    this.thirdparty_type = queryParam("thirdparty_type");
 	 	this.getBanner();

  },
  methods: {
    text: function() {
      //					'color':'red','font-size':'12px'
      $(".jj").css('transform', "rotate(90deg)");

    },
    getBanner: function() {
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
             that.spring_homepage_status = that.list.spring_homepage_status;
            	that.mobile = that.list.mobile;
            	that.amount = that.list.amount;
            	that.like_id = that.list.like_id;
            	that.spring_mate_id = that.list.spring_mate_id;
            	 	 if(that.wish_count && that.beyond_percent==0){
 	 										this.detilshow=false;
 	 										this.detilshow2=true;
 	 								}
          }
          if(data.code == 40001){
          	 Toast(data.msg);
          }
        }
      })
    },
    //过渡动画的效果maoltop: 0px;，test top: -40px;，coin_bottomtop: 2.5rem;
  }


}
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/

body {
  font-size: 12px;
}

.main {
  width: 100%;
height: 53.69rem;

  overflow: hidden;
  /*  background: rgb(101, 207, 148);*/
  /*	line-height: 200px;*/
  /*padding-top: 50px;
  text-align: center;*/
}

.m_box {
  width: 100%;

  overflow: hidden;
}

.main .m_img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /*background-position: center center;*/
/*  background-image: url(../statics/imgs/main.png);*/
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}


.m_img .say {
  margin: 0.75rem 0;
  float: left;
  width: 100%;
  height: 1.58rem;
    padding: 0 0.75rem;
  position: relative;
  z-index: 2;
}

.say>span {
  position: absolute;
  top: 0;
  left: 20%;
  right: 0;
  bottom: 0;
  margin: 0;
  text-align: center;
  line-height: 1.58rem;
  font-size: 0.65rem;
  color: #A4AFFF;
  font-weight: 700;
}

.say>img {
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;

}

.main>p {
  /*  display: block;*/
  /*	line-height: 0px;*/
}

.content {
  width: 100%;
  /*	height: 50rem;*/
  position: relative;

}

.raido,
.track,
.test,
.maol,
.leaf
{
  position: absolute;

}

.raido,
.track,
.maol,
.leaf
>img {
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.track {
/*  border: 1px solid firebrick;*/

  height: 7.5rem;
    top: 12rem;
  z-index: 2;
}

.raido {
/*		border: 1px solid red;*/
    /* height: 7.32rem; */
    right: 0px;

    width: 92%;
    height: 21rem;
    left: 0;
    bottom: 0;
    margin: auto;
    top: 17rem;
}
.raido>img{
	width:100%;
}
.test {

   width: 7rem;
    /* height: 7.05rem; */
    top: 8.5rem;
    right: -0.25rem;
  /* transition: all 3s;*/
/*  animation: run 5s linear infinite;*/
}

.test>img{
	width:100%;
}
@keyframes run {
  /*百分比是相对于动画的执行时间*/
  0% {
    transform: translate(0, 0px);

  }
  15% {
    /*		width: 400px;
				height: 200px;*/
    transform: translate(0, 4px);

  }
  30% {
    /*		width: 400px;
				height: 200px;*/
    transform: translate(0, 7px);

  }

  45% {
    /*				width: 400px;
				height: 400px;*/
    transform: translate(0, 10px);
  }
  60% {
    /*				width: 400px;
				height: 400px;*/
    transform: translate(0, 7px);

  }

  85% {
    /*				width: 400px;
				height: 400px;
				background-color: yellow;*/
    transform: translate(0, 4px);

  }

  100% {
    /*	width: 200px;
				height: 200px;*/
    /*		background-color: green;*/
    transform: translate(0, 0px);
  }
}

.maol {
/*border: 1px solid blue;*/

  top: 0;
  left: 0rem;
  right: 0;
    width: 92%;
    height: 19.9rem;
    top: -2.86rem;
  margin: 0 auto;
/*  animation: maol 4s linear infinite;*/

}
.maol>img{
	width:100%;
}

@keyframes maol {
  /*百分比是相对于动画的执行时间*/
  0% {
    transform: translate(0, 0px);

  }
  15% {
    /*		width: 400px;
				height: 200px;*/
    transform: translate(0, 4px);

  }
  30% {
    /*		width: 400px;
				height: 200px;*/
    transform: translate(0, 6px);

  }

  45% {
    /*				width: 400px;
				height: 400px;*/
    transform: translate(0, 8px);
  }
  60% {
    /*				width: 400px;
				height: 400px;*/
    transform: translate(0, 6px);

  }

  85% {
    /*				width: 400px;
				height: 400px;
				background-color: yellow;*/
    transform: translate(0, 4px);

  }

  100% {
    /*	width: 200px;
				height: 200px;*/
    /*		background-color: green;*/
    transform: translate(0, 0px);
  }
}

.leaf {
/* 	border: 1px solid palevioletred;*/
  z-index: 4;
  width: 92%;
    right: 0rem;
    top: 17rem;
    left: 0;
    margin: auto;
    
 /* animation: change 9s linear infinite;*/
}
.leaf .t_leaf{
 margin-bottom: 0.75rem;
  margin-top: 1rem;
	width:60%;
	margin-left: 10%;
	
}
.leaf .b_leaf{
	width:100%;
	margin-left: 9%;
}
.b_leaf , .t_leaf img{
	width:100%;
}

.b_leaf>h2{
	color:#8CE3D3;
	font-size:1.875rem;
}

@keyframes change {
  /*百分比是相对于动画的执行时间*/
  0% {
    transform: rotateZ(-0deg);

  }
  15% {
    /*		width: 400px;
				height: 200px;*/
    transform: rotateZ(-5deg);
  }
  30% {
    /*		width: 400px;
				height: 200px;*/
    transform: rotateZ(-10deg);
  }

  45% {
    /*				width: 400px;
				height: 400px;*/
    transform: rotateZ(-15deg);
  }
  60% {
    /*				width: 400px;
				height: 400px;*/
    transform: rotateZ(-10deg);
  }

  85% {
    /*				width: 400px;
				height: 400px;
				background-color: yellow;*/
    transform: rotateZ(-5deg);
  }

  100% {
    /*	width: 200px;
				height: 200px;*/
    /*		background-color: green;*/
    transform: rotateZ(0deg);
  }
}






#detial {
  padding: 1.25rem 10% 0 10%;
  position: absolute;
  height: 28.53rem;
  /*    width: 20.94rem;*/
	bottom:0rem;
  left: 0;
  right: 0;
/*  border: 1px solid #394740;*/
	background-image: url(../statics/imgs/detilb.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  z-index: 3;

}
#detial .detil_m{
	width:100%;
	height:100%;
	border-radius:0.75rem;
	background:#fff;
		padding:1rem;
	
}
#detial .detil_i{
	width:100%;
	height:70%;

	background: #ccc;
	
}
.detil_i>img{
	width:100%;
	height: 100%;
}
.detil_ts{
	    margin-top: 1rem;
	width:100%;
	padding: 0.75rem 0;
	line-height: 1.75rem;
	font-size:1rem;
	color:#09062D;
}
.detil_ts>i{
	color:#8CE3D3;
	font-size: 2.14rem;
	position: relative;
  top: 0.3rem;
}





.d_cont {
  width: 11.25rem;
  height: 6.75rem;
  margin-left: 3.25rem;
  position: absolute;
  bottom: 3rem;
  transition: all 2s ease-out 2s;
  animation: d_cont 2s linear forwards;
}

@keyframes d_cont {
  /*百分比是相对于动画的执行时间*/
  0% {
    opacity: 0;

  }

  100% {

    transition: all 2s ease-out 2s;
    opacity: 1;
  }
}



.bottom {
  height: 24.5rem;

 /* background: rgba(26, 9, 83, 1);*/
}

.bottom .b_title {
  height: 1.25rem;
  text-align: center;

}

.b_title>h4 {
  color: #8CE3D3;
  font-size: 1rem;
  width: 20%;
  float: left;
  line-height: 1.25rem;
  margin-left: 2.25rem;
}

.b_title>.title_img {
  height: 1.25rem;
  width: 68%;
  float: left;
}

.title_img>img {
  background-position: center center;

  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
  width: 100%;
}

.bottom>ul {
  text-align: center;
  width: 76%;
  /*  border: 1px solid #ccc;*/
  margin: 0 auto;
  margin-top: 0.6rem;
}

.bottom>ul>li>p {
  color: #fff;
  font-size: 0.85rem;
    line-height: 1.7rem;
  text-align: left;
}
</style>
