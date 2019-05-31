<template>
  <div class="order-detail" v-show="flag">
    <div class="box"></div>
    <div class="model">
      <div class="header">
        <span></span>
        <p>订单详情</p>
        <span>
          <img src="../../assets/img/close.png" alt style="cursor: pointer;" @click="close()">
        </span>
      </div>
      <el-main>
        <div class="view-box">
          <div class="table-box">
            <!--表格部分-->
            <div class="manage-table">
              <p>购买物品</p>
              <ul>
                <!-- :src="item.good.image || '' -->
                <li v-for="item in orderdetail" :key="item.id">
                  <img :src="item.good.image" alt>
                  <div>
                    <span>{{item.good.name}}</span>
                    <span>X{{item.num}}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 底部 -->
            <div class="total">
              <p class="title">顾客详情</p>
              <p>
                <span>{{decodeURI(address.name)}}</span>
                <span>{{address.mobile}}</span>
              </p>
              <p>{{decodeURI(address.area)}}</p>
            </div>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  props: {
    orderdetail: {
      type: Array,
      required: true
    },
    orderaddress: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      flag: true,
      isLoading: true,
      address: {}
    };
  },
  computed: {},
  methods: {
    close() {
      this.$parent.flag = false;
    }
  },
  mounted() {
    this.address = JSON.parse(this.orderaddress);
  }
};
</script>
<style lang="scss" scoped >
.order-detail {
   ::-webkit-scrollbar {
        display: none;
    }
   
  position: fixed;
  width: 200%;
  height: 100%;
  left: -10rem;
  z-index: 2;
  .box {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .model {
    width: 12.2rem;
    height: 8.11rem;
    border-radius: 0.05rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    margin: auto;
    .header {
      height: 0.6rem;
      background: rgba(159, 136, 255, 1);
      display: flex;
      justify-content: space-between;
      p {
        font-size: 0.16rem;
        color: rgba(255, 254, 254, 1);
        margin-top: 0.18rem;
        margin-left: 0.33rem;
      }
      span {
        margin-top: 0.21rem;
        margin-right: 0.3rem;
        img {
          display: block;
          width: 0.17rem;
          height: 0.17rem;
        }
      }
    }
    /*主体*/
    .el-main {
      padding: 0;
      .view-box {
        width: 100%;
        height: 100%;
        padding: 0.1rem 0 0.53rem;
        box-sizing: border-box;
        .table-box {
          width: 100%;
          height: 100%;
          .manage-tit {
            width: 100%;
            overflow: hidden;

            img {
              display: block;
              float: right;
              // margin-bottom: .4rem;
              width: 0.94rem;
              height: 0.33rem;
              cursor: pointer;
            }
          }
          /*表格部分*/
          .manage-table {
            font-size: 0.14rem;
            height: 5.5rem;
            overflow: hidden;
            padding: 0.2rem 0.4rem;

            ul {
              height: 100%;
              overflow-y: scroll;
              p {
                line-height: 0.8rem;
              }
              li {
                height: 0.8rem;
                float: left;
                margin: 0 0.6rem 0.3rem 0;
                img {
                  width: 0.8rem;
                  margin-right: 0.1rem;
                  float: left;
                  border-radius: 0.1rem;
                }
                div {
                  float: left;
                  display: flex;
                  height: 0.8rem;
                  justify-content: space-between;
                  flex-direction: column;
                  span {
                    display: block;
                  }
                }
              }
            }
          }
          .manage-table>p{
            font-size: .22rem;
          }
        }
        .total {
          box-sizing: border-box;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 2rem;
          padding-left: 0.4rem;
          .title {
            font-size: 0.26rem;
          }
          p {
            font-size: 0.2rem;
            overflow: hidden;
            line-height: 0.4rem;
            span {
              display: block;
              float: left;
            }
            span:last-child {
              color: #888;
              margin-left: 0.3rem;
            }
          }
          p:first-child {
            margin-bottom: 0.2rem;
          }
          p:last-child {
            font-size: 0.16rem;
          }
        }
        .total-foot {
          width: 100%;
          height: 0.76rem;
          background: rgba(173, 154, 255, 1);
          position: absolute;
          left: 0;
          bottom: 0;
          p {
            float: right;
            font-size: 0.18rem;
            line-height: 0.76rem;
            margin-right: 0.46rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
