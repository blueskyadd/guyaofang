<template>
  <div class="activelyApp">
    <headerApp :title="actively.activelyName"/>
    <div class="block" style="padding-top: .64rem;">
      <el-carousel height="3.75rem">
        <el-carousel-item v-for="item in actively.activelyProjectImg" :key="item.url">
          <!-- <img>{{item.url}}</h3> -->
          <img :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
      <div class="activelyText">
          <div class="activelyPrice">
              <span class="news-price">￥ {{actively.activelyNewPrice}}</span>
              <span class="old-price">原价：<i>￥{{actively.activelyOldPrice}}</i></span>
          </div>
          <div class="activelyName">
              <span>{{actively.activelyName}}</span>
              <span>{{actively.activelyIntrouction}}</span>
          </div>
      </div>
      <div class="activelyDetail">
          <div class="detailImg">
              <img v-for="item in actively.activelyPosterImg" :key="item.id" :src="item.url" alt="">
          </div>
      </div>
      
    </div>
    <div class="active_footer">
        <div><span><img src="../../../assets/img/shopping.png"/> <i>商城</i></span><span><img src='../../../assets/img/shoppCart.png'/><i>购物车</i></span></div>
        <div><span>加入购物车</span><span>立即预定</span></div>
    </div>
  </div>
</template>
<script>
import headerApp from "../../../components/header/headerApp.vue"
export default {
    name: 'activelyApp',
    components: {headerApp},
    props:{
        actively:{
            type:Object,
            required: true
        },
        
    },
    data(){
        return{
        }
    },
};
</script>
<style lang="scss" scoped>
.activelyApp {
    background:rgba(236,236,236,1);
    position: relative;
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .activelyText{
        height: 1.39rem;
        background: #fff;
        margin-top: .02rem;
        padding: .15rem .26rem;
        span{
            width: 4.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .news-price{
            font-size: .34rem;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(255,240,0,1);
            display: block;
        }
        .old-price{
            color: rgba(153,153,153,1);
            line-height: .15rem;
            display: block;
            font-size: .15rem;
            i{
                text-decoration: line-through;
            }
        }
        .activelyName{
            padding-top: .22rem;
          
            span:first-child{
                display: block;
                font-size: .22rem;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(51,51,51,1);
                line-height: .22rem;
            }
            span:last-child{
                font-size: .14rem;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(153,153,153,1);
                line-height: .23rem;
                display: block;
            }
        }
    }
    .activelyDetail{
        background: #fff;
        margin-top: .02rem;
        .header{
            height: .7rem;
            span{
                font-size: .26rem;
                font-family: MicrosoftYaHei;
                font-weight: 400;
                color: rgba(255,240,0,1);
                line-height: .69rem;
                display: block;
                width: 2.45rem;
                text-align: center;
                border-bottom: 2px solid rgba(255,240,0,1);
                margin-left: .2rem;
            }
        }
    }
    .block{
        padding: .64rem 0 .9rem;
        height: 6.3rem;
        overflow: hidden;
        overflow-y: scroll;
    }
    //底部
    .active_footer{
        height: .9rem;
        position: absolute;
        font-size: .2rem;
        width: 100%;
        display: flex;
        bottom: 0;
        background: #fff;
        div{
            display: flex;
            span{
                flex: 1;
                text-align: center;
                line-height: .9rem;
            }
        }
        div:first-child{
            width: 1.3rem;
            font-size: .16rem;
            color:rgba(51,51,51,1);
            font-weight:400;
            span{
                flex-direction:column;
                display: flex;
                img{
                    width: .3rem !important;
                    height: auto !important;
                    margin: .2rem auto 0;
                }
                i{
                    line-height: .5rem;
                }
            }
        }
        div:last-child{
            color: #fff;
            width: 3.5rem;
            font-size: .2rem;
            span:first-child{
                background:rgba(255,161,36,1);
            }
            span:last-child{
                background:rgba(255,128,58,1);
            }
        }
    }
    
}
</style>
