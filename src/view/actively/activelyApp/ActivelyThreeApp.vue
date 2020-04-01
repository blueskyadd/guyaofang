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
      <div class="activelyRelease">
          <span><img src="../../../assets/img/free.png"/> 放生选择</span>
          <div id="scroll">
              <ul :style="{ width: getWidth + 'rem'}">
                  <li v-for="item in animalinitList" :key="item.id" >
                      <img :src="item.image" alt="">
                      <span class="activelyReleaseName">{{item.name}}</span>
                      <span class="activelyReleasePrice">￥{{item.price}}/1{{item.unit}}</span>
                      <span class="activelyReleaseImg"><img src="../../../assets/img/addshopp.png" alt=""></span>
                  </li>
              </ul>
          </div>
      </div>
      <div class="activelyDetail">
          <span><img src="../../../assets/img/shao.png" alt="">活动介绍</span>
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
            animalinitList:[]
        }
        
    },
    methods:{
        setAnimlinit(){
            this.animalinitList = []
            if(this.actively.animalinitListId && this.actively.animalinitListId.length){
                this.actively.animalinitListId.forEach(element =>{

                    if(this.actively.animalinitList && this.actively.animalinitList.length){
                        this.actively.animalinitList.forEach( (value, index) =>{
                            
                            if(value.id == element){
                                this.animalinitList.push(value)
                                console.log(value)
                            }else{
                                // this.animalinitList.splice(1, index)
                            }
                        })
                    }
                })
            }
        }
    },
    mounted(){
        this.setAnimlinit()
    },
    computed:{
         getWidth() {
            if (this.animalinitList.length) {
                 return  this.animalinitList.length*1.3
            }else{
                return 0;
                    
            }
        },
    },
    watch:{
        'actively.animalinitListId'(newData, oldData){
            this.setAnimlinit()
        }
    }
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
    .activelyRelease{
        // height: 1.39rem;
        background: #fff;
        margin-top: .02rem;
        // padding: .15rem .26rem;
        div{
            ul{
                display: flex;
                li{
                    margin: .3rem .1rem .2rem 0;
                    height: 1.2rem;
                    border: 1px solid #eee;
                    position: relative;
                    text-align: center;
                    width: 1rem;
                     flex-wrap: wrap;
                    span{
                        font-size: .2rem;
                        display: block;
                    }
                    .activelyReleaseName{
                        font-size: .18rem;
                        margin: .28rem 0 .05rem;
                        color: #333;
                    }
                    .activelyReleasePrice{
                        font-size: .14rem;
                         color: #FFDF09
                    }
                    
                    .activelyReleaseImg>img{
                        float: inherit;
                        margin: 0 auto;
                        width: .22rem !important;
                        height: .22rem !important;
                        margin-top: .15rem;
                    }
                }
                li>img{
                    position: absolute;
                    width: .5rem !important;
                    height: .5rem !important;
                    top:-.25rem;
                    left:.25rem;
                    border-radius: .25rem;
                    background: #fff;
                }
                li:first-child{
                    margin-left: .2rem;
                }
            }
            
        }
        #scroll{
            overflow-x: scroll;
        }
            #scroll::-webkit-scrollbar {
            /*滚动条整体样式*/
            // width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
            height: .1rem;
          }
          #scroll::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(255, 255,255, 1);
            background: rgba(0, 0,0, .2);
          }
          #scroll::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 1);
            border-radius: 0;
          }
        
    }
    .activelyRelease>span, .activelyDetail>span{
        font-size: .2rem;
        font-weight: 400;
        color: #444444;
        display: block;
        border-bottom: 1px solid #eee;
        padding: .1rem .2rem;
        
    }
    .activelyRelease>span>img{
        width: .3rem !important;
        height: .28rem !important;
        float: left;
        margin-right: .1rem;
    }
    .activelyDetail{
        background: #fff;
        margin-top: .02rem;
        span{
            img{
                width: .3rem !important;
                height: .28rem !important;
                float: left;
                margin-right: .1rem;
            }
        }
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
     .block::-webkit-scrollbar {
            display: none;
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
                    margin: .13rem auto 0;
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
