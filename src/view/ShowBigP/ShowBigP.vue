<template>
    <div class="BigShowP" @click="aa">
      <div class="BigBg">
<!--        视频背景-->
        <div class="Void_Box">
<!--          <video src="../../assets/img/haimian.mp4" autoplay="autoplay" loop="loop" muted="muted"></video>-->
          <video id="vopods" src="" style="width: 100%;height:100%;object-fit:fill" controls="controls" muted="muted" autoplay="autoplay"></video>
        </div>
        <div class="order_Box">
          <div class="Order_tit">订单</div>
          <div class="Order_List">
            <div class="order_Scroll">
              <div class="ListDan">
                <div class="zhuo">6号桌</div>
                <div class="shoopIng">
                  白茶x1
                </div>
              </div>
              <div class="ListDan">
                <div class="zhuo">6号桌</div>
                <div class="shoopIng">
                  白茶x1
                </div>
              </div>
            </div>
          </div>
        </div>


<!--        弹幕-->
        <div class="dan" style="display: none;">
          <header>
            <img src="" alt="">
          </header>
          <div class="words">
            <div class="zhuozi">6号桌</div>
            <div class="tea_WOrd">白茶x1</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ShowBigP",
      data(){
          return{
            TimerOne:'',
            TimerTwo:'',
            a:0,
            timer:null,
            b:0,

            dan:[],




            guanOne:0,
            guanTwo:0,
            guanThree:0,
            videoList:[],
            num:0
          }
      },
      methods:{
          aa(){
            console.log(132)
            let DOM =(`<div class="dan">
          <header>
            <img src="" alt="">
          </header>
          <div class="words">
            <div class="zhuozi">6号桌</div>
            <div class="tea_WOrd">白茶x1</div>
          </div>
        </div>`)

            // let WidthD = $(".dan").width()
            // DOM.css({
            //   right:'-`${WidthD}`px'
            // })
            $(".BigBg").append(DOM)















           this.TimerOne =new Date;
            let a  = (this.TimerOne - this.TimerTwo)/1000
            if(a <2){
              console.log('间隔小于2')

              setTimeout(()=>{

                this.a  = this.a + 1000;
              },this.a)

              console.log(this.a)

              if(this.timer !== null){
                clearInterval(this.timer)
              }
              this.b = this.a / 800
              this.timer = setInterval(()=>{
                this.b--;
                if( this.b <= 0){
                  clearInterval(this.timer)
                }
              },1000)





              this.TimerTwo = new Date;
              setTimeout(()=>{
                console.log(`我延迟了${this.a}秒`)
                $(".dan").animate(
                  {
                    left:'-530px'
                  },5000);
              },this.a)
            }else{
              console.log('间隔大于2')
              this.TimerTwo = new  Date;
              if(this.b <= 0){

                $(".dan").animate(
                  {
                    left:'-530px'

                  },5000);
                this.a = 0
              }else{
                setTimeout(()=>{
                  this.a  = this.a + 800;
                },this.a)

                setTimeout(()=>{

                  $(".dan").animate(
                    {
                      left:'-530px'

                    },5000);
                },this.a)

              }


            }

            // if(this.guanOne === 0){
            //   console.log(0)
            //   this.guanOne = 1
            //   setTimeout(()=>{
            //     this.guanOne = 0
            //   },800)
            //   $(".dan").css({
            //     top:0
            //   })
            //   $(".dan").animate(
            //    {
            //      left:'-530px'
            //
            //    },5000);
            // }else if(this.guanTwo === 0){
            //   this.guanTwo = 1
            //   console.log(100)
            //   setTimeout(()=>{
            //     this.guanTwo = 0
            //   },800)
            //
            //   $(".dan").css({
            //     top:100
            //   })
            //   $(".dan").animate(
            //     {
            //       left:'-530px'
            //
            //     },5000);
            //
            // }else if(this.guanThree === 0){
            //   this.guanThree = 1
            //   console.log(200)
            //   setTimeout(()=>{
            //     this.guanThree = 0
            //   },800)
            //   $(".dan").css({
            //     top:200
            //   })
            //   $(".dan").animate(
            //     {
            //       left:'-530px'
            //
            //     },5000);
            // }else{
            //
            // }
          this.removeDom()
          },

        initWebSocket() {
          const wsuri = `ws://10.102.100.23:8001/ws/screen/jfakdnmvjkdhlqwiopkfjkvncvzjkldfmnjksjuriqhdjkxnwll/`;
          this.websock = new WebSocket(wsuri);//这里面的this都指向vue
          this.websock.onopen = this.websocketopen;
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onclose = this.websocketclose;
          this.websock.onerror = this.websocketerror;
        },
        websocketopen() {//打开
          console.log("WebSocket连接成功")
        },
        websocketonmessage(e) { //数据接收
          let ObjData = JSON.parse(e.data);
          console.log(ObjData)
          if(ObjData.info.id != "" || ObjData.info.id != undefined){
            this.dan.push(ObjData.info)
          }
           this.removeDom()
        },
        websocketclose() {  //关闭
          console.log("WebSocket关闭");

        },

        websocketerror() {  //失败
           console.log("WebSocket连接失败");
        },
        removeDom(){
            // setTimeout(()=>{

            //   $(".dan")[0].remove()
            // },10000)
            let arr = []
            arr.push(document.getElementsByClassName("dan"))
          arr.forEach((element, index) =>{
            console.log(element)
            console.log(element[0].style.left)
            if(element[0].style.left == '-530px'){
                element[0].remove()
            }


          })
        },
        bb(){
            setInterval(()=>{
              if(this.dan.length>0){
                let DOM =(`<div class="dan">
          <header>
            <img src="" alt="">
          </header>
          <div class="words">
            <div class="zhuozi">${this.dan[0].name}</div>
            <div class="tea_WOrd">${this.dan[0].content}</div>
          </div>
        </div>`)

                // let WidthD = $(".dan").width()
                // DOM.css({
                //   right:'-`${WidthD}`px'
                // })
                $(".BigBg").append(DOM)

                $(".dan").animate(
                  {
                    left:'-530px'

                  },6000);
                this.dan.splice(0,1)
              }
            },1200)





          this.$http
            .get(this.$conf.env.getSystemVideo)
            .then(res => {
              console.log(res.data)
              this.videoList = res.data
                $("#vopods").attr("src",this.videoList[0].video)
                //
                document.getElementById("vopods").addEventListener('ended',() =>{
                  this.num++;
                  if(this.num>=this.videoList){
                    this.num = 0;
                  }
                  $("#vopods").attr("src",this.videoList[this.num].video)
                });

            })
            .catch(err => {
              this.isLoading = false;
              this.$message.error("网络错误");
            });
        }
      },
      created() {
          this.initWebSocket()
        this.bb()
      },
      destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
      },

    }
</script>


<style lang="scss">

  .BigShowP{
    width: 100%;
    height: 100%;
  overflow: hidden;
    .BigBg{
      width: 100%;
      height: 100%;
      position: relative;
      .Void_Box{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: blue;
          video{
            width: 100%;
            height: 100%;
            display: block;
            object-fit: fill;
            overflow: hidden;
            border: 0;
        }
      }
      .order_Box{
        width:4.77rem;
        height:100%;
        background:rgba(214,208,233,1);
        opacity:0.4;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2;
        background: url("../../assets/img/1.png") no-repeat;
        background-size: cover;
        font-family: chunlian;
        .Order_tit{
          font-size:.6rem;
          font-family:FZXKFW--GB1-0;
          color:rgba(1,1,1,1);
          line-height:.6rem;
          text-align: center;
          height: 15%;
          padding-top: .6rem;
          padding-bottom: .4rem;
          box-sizing: border-box;
        }
        .Order_List{
          width: 100%;
          box-sizing: border-box;
          padding-left: .64rem;
          height: 85%;
          background: red;
          overflow: hidden;
          .order_Scroll{
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            .ListDan{
              overflow: hidden;
              line-height: .6rem;
              .zhuo{
                font-size:.28rem;
                font-family:FZXKFW--GB1-0;
                color:rgba(1,1,1,1);
                float: left;
                margin-right: 1.5rem;
                line-height: .6rem;
              }
              .shoopIng{
                width: 43%;
                overflow: hidden;
                float: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size:.28rem;
                font-family:FZXKFW--GB1-0;
                color:rgba(1,1,1,1);
                line-height: .6rem;

              }
            }
            &::-webkit-scrollbar {/*滚动条整体样式*/
              width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: #06A9AF;
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              border-radius: 0;
              background: rgba(0,0,0,0.1);
            }
          }

        }

      }
      .dan{
        width: 530px;
        height: 68px;
        background: black;
        position: absolute;
        right: -530px;
        top: 30px;
        border-radius:34px;
        overflow: hidden;

        header{
          width:68px;
          height:68px;
          border-radius:50%;
          float: left;
        }
        .words{
          height: 100%;
          width: 400px;
          margin-left: 100px;
          overflow: hidden;
          .zhuozi{
            float: left;
            font-size:28px;
            font-family:MFShangHei_Noncommercial-Regular;
            color:rgba(255,255,255,1);
            line-height:68px;
          }
          .tea_WOrd{
            width: 250px;
            font-size:28px;
            margin-left: 44px;
            overflow: hidden;
            float: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 100%;
            color:rgba(255,255,255,1);
            line-height:68px;
          }
        }
      }
    }
  }
</style>
