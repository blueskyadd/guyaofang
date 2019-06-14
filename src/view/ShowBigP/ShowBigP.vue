<template>
  <div class="BigShowP">
    <div class="BigBg">
      <!--        视频背景-->
      <div class="Void_Box">
        <video
          id="vopods"
          src
          style="width: 100%;height:100%;object-fit:fill"
          controls="controls"
          autoplay="autoplay"
        ></video>
      </div>
      <div class="order_Box">
        <div class="Order_tit">订单</div>
        <div class="Order_List">
          <div class="order_Scroll">
            <div class="ListDan" v-for="(val,index) in OrderList" :key="index">
              <div class="zhuo">{{val.seat}}</div>
              <div class="shoopIng">{{val.goods}}x{{val.num}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--        弹幕-->
      <div class="dan" style="display: none;">
        <header>
          <img src alt>
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
import "../../assets/style/fontS.css";
export default {
  name: "ShowBigP",
  data() {
    return {
      TimerOne: "",
      TimerTwo: "",
      a: 0,
      timer: null,
      b: 0,
      dan: [],
      guanOne: 0,
      guanTwo: 0,
      guanThree: 0,
      OrderList: [],
      num: 0
    };
  },
  methods: {
    initWebSocket() {
      const wsuri = `wss://www.bmeauto.cn/ws/screen/jfakdnmvjkdhlqwiopkfjkvncvzjkldfmnjksjuriqhdjkxnwll/`;
      this.websock = new WebSocket(wsuri); //这里面的this都指向vue
      this.websock.onopen = this.websocketopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
      this.websock.onerror = this.websocketerror;
    },
    websocketopen() {
      //打开
      console.log("WebSocket连接成功");
    },

    websocketonmessage(e) {
      //数据接收
      let ObjData = JSON.parse(e.data);
      console.log(ObjData);
      if (ObjData.type.length == 9) {
        this.dan.push(ObjData.info);
        this.removeDom();
      }
      if (ObjData.type.length == 2) {
        this.OrderList.push(ObjData.info);
        let name = ObjData.info.seat;
        let content = `${ObjData.info.goods}x${ObjData.info.num}`;
        let obj = {
          name: name,
          content: content
        };
        this.dan.push(obj);
      }

      if (ObjData.type.length == 4) {
        for (var i in this.OrderList) {
          if (this.OrderList[i].order == ObjData.order) {
            this.OrderList.splice(i, 1);
            return;
          }
        }
      }
    },
    websocketclose() {
      //关闭
      console.log("WebSocket关闭");
    },

    websocketerror() {
      //失败
      console.log("WebSocket连接失败");
    },
    removeDom() {
      let arr = [];
      arr.push(document.getElementsByClassName("dan"));
      arr.forEach((element, index) => {
        console.log(element);
        console.log(element[0].style.left);
        if (element[0].style.left == "-530px") {
          element[0].remove();
        }
      });
    },
    bb() {
      setInterval(() => {
        if (this.dan.length > 0) {
          let DOM = `<div class="dan">
          <header>
            <img src="${this.dan[0].head}" alt="">
          </header>
          <div class="words">
            <div class="zhuozi">${this.dan[0].name}</div>
            <div class="tea_WOrd">${this.dan[0].content}</div>
          </div>
        </div>`;
          $(".BigBg").append(DOM);

          $(".dan").animate(
            {
              left: "-530px"
            },
            6000
          );
          this.dan.splice(0, 1);
        }
      }, 1200);
    },
    BigVoid() {
      this.$http
        .get(this.$conf.env.getSystemVideo)
        .then(res => {
          if (res.status == "200") {
            console.log(res.data);

            $("#vopods").attr("src", res.data[0].video);

            document.getElementById("vopods").addEventListener("ended", () => {
              this.num++;
              if (this.num >= res.data.length) {
                this.num = 0;
              }
              $("#vopods").attr("src", res.data[this.num].video);
            });
          }
        })
        .catch(err => {});
    }
  },
  created() {
    this.initWebSocket();
    this.bb();
    this.BigVoid();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  }
};
</script>


<style lang="scss">
.BigShowP {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .BigBg {
    width: 100%;
    height: 100%;
    position: relative;
    .Void_Box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      video {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: fill;
        overflow: hidden;
        border: 0;
      }
    }
    .order_Box {
      width: 4.77rem;
      height: 100%;
      background: rgba(214, 208, 233, 1);
      opacity: 0.4;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      background: url("../../assets/img/1.png") no-repeat;
      background-size: cover;
      font-family: haha;
      .Order_tit {
        font-size: 0.6rem;
        font-family: haha;
        color: rgba(1, 1, 1, 1);
        line-height: 0.6rem;
        text-align: center;
        height: 15%;
        padding-top: 0.6rem;
        padding-bottom: 0.4rem;
        box-sizing: border-box;
      }
      .Order_List {
        width: 100%;
        box-sizing: border-box;
        padding-left: 0.64rem;
        height: 85%;
        overflow: hidden;
        .order_Scroll {
          height: 100%;
          overflow-x: hidden;
          overflow-y: scroll;
          .ListDan {
            overflow: hidden;
            line-height: 0.6rem;
            .zhuo {
              font-size: 0.28rem;
              font-family: haha;
              color: rgba(1, 1, 1, 1);
              float: left;
              margin-right: 1.3rem;
              line-height: 0.6rem;
            }
            .shoopIng {
              width: 43%;
              overflow: hidden;
              float: left;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 0.28rem;
              font-family: haha;
              color: rgba(1, 1, 1, 1);
              line-height: 0.6rem;
            }
          }
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #06a9af;
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
    .dan {
      width: 530px;
      height: 68px;
      background: black;
      position: absolute;
      right: -530px;
      top: 30px;
      border-radius: 34px;
      overflow: hidden;
      background: url("../../assets/img/danbg.png") no-repeat;
      background-size: cover;
      header {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        float: left;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }
      .words {
        height: 100%;
        width: 400px;
        margin-left: 100px;
        overflow: hidden;
        .zhuozi {
          float: left;
          font-size: 28px;
          font-family: MFShangHei_Noncommercial-Regular;
          color: rgba(255, 255, 255, 1);
          line-height: 68px;
        }
        .tea_WOrd {
          width: 240px;
          font-size: 28px;
          margin-left: 44px;
          overflow: hidden;
          float: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 100%;
          color: rgba(255, 255, 255, 1);
          line-height: 68px;
        }
      }
    }
  }
}
</style>
