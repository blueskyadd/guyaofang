<template>
  <div class="projectApp">
    <headerApp :title="project.projectName"/>
    <div class="block" style="padding-top: .64rem;">
      <el-carousel height="3.75rem">
        <el-carousel-item v-for="item in project.projectBanner" :key="item.url">
          <!-- <img>{{item.url}}</h3> -->
          <img :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
      <div class="projectText">
          <div class="projectPrice">
              <span class="news-price">￥ {{project.newProjectPrice}}</span>
              <span class="old-price">原价：<i>￥{{project.oldProjectPrice}}</i></span>
          </div>
          <div class="projectName">
              <span>{{project.projectName}}</span>
              <span>{{project.projectIntroduction}}</span>
          </div>
      </div>
      <div class="projectDetail">
          <div class="header">
              <span>商品详情</span>
          </div>
          <div class="detailImg">
              <img v-for="item in project.projectDetail" :key="item.id" :src="item.url" alt="">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerApp from "../../components/header/headerApp.vue"
export default {
    name: 'projectApp',
    components: {headerApp},
    props:{
        project:{
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
.projectApp {
    background:rgba(236,236,236,1);
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
    .projectText{
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
        .projectName{
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
    .projectDetail{
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
    
    
}
</style>
