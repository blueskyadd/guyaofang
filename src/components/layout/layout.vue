<template>
  <el-container>
    <el-aside width="3.2rem;height:100%;overflow:hidden;">
      <div class="aside-tit">
        <img :src="systemLogo" alt="">
      </div>
      <div class="nav-box">
        <nav>
          <ul>
            <li>
              <router-link to="/ShoppManage" active-class="active">
                <span>
                  <img src="../../assets/img/shoppguan.png" alt="">
                </span>
                <p>商品管理</p>
              </router-link>
            </li>
            <li>
              <router-link to="/actively" active-class="active">
                <span>
                  <img src="../../assets/img/active.png" alt="">
                </span>
                <p>活动管理</p>
              </router-link>
            </li>
            <li>
              <router-link to="/system" active-class="active">
                <span>
                  <img src="../../assets/img/system.png" alt="">
                </span>
              <p>系统管理</p>
              </router-link>
            </li>
            <li>
              <router-link to="/updataVoid" active-class="active">
                <span>
                  <img src="../../assets/img/screen.png" alt="">
                </span>
              <p>大屏管理</p>
              </router-link>
            </li>
            <li>
              <router-link to="/teaHouse" active-class="active">
                <span>
                  <img src="../../assets/img/cha.png" alt="">
                </span>
              <p>茶坊管理</p>
              </router-link>
            </li>
            <li>
              <router-link to="/buy" active-class="active">
                <span>
                  <img src="../../assets/img/gou.png" alt="">
                </span>
              <p>代购管理</p>
              </router-link>
            </li>
            <li>
              <router-link to="/Order" active-class="active">
                <span>
                  <img src="../../assets/img/gou.png" alt="">
                </span>
              <p>订单管理</p>
              </router-link>
            </li>
          </ul>
        </nav>
        
      </div>
    </el-aside>
   
    <el-container>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "layout",
        data(){
          return{
            systemLogo: ''
          }
        },
        methods:{
          getLogo(){
            this.$http.get(this.$conf.env.getSystemData).then(res =>{
            if(res.status == '200'){
              if(!res.data) return
              this.systemLogo = res.data.logo ? res.data.logo : []
            }
          }).catch( err =>{
            this.$message.error('网络错误');
          })
          }
        },
        mounted(){
          this.getLogo()
        }
    }
</script>

<style scoped lang="scss" scoped>
 .header-back{
        float: right;
        overflow: hidden;
        cursor: pointer;
        margin-top:.1rem;
        .image-box{
          float: left;
          img{
            width: .29rem;
            height:.29rem;
            display: block;
          }
        }
        span{
          float: left;
          font-size:.19rem;
          color:rgba(127,99,244,1);
          margin-left: .15rem;
        }
      }

.el-container{
  width: 100%;
  height:100%;
  overflow: hidden;
}
.right-box{
  display: flex;
  flex-direction: column;
}
.el-aside{
  display: flex;
  flex-direction: column;
  width: 3.3rem
}
  .aside-tit{
    width: 3.2rem;
    height:.98rem;
    background: #fff;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
    span{
      font-size:30px;
      font-family:FZXKFW--GB1-0;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:31px;
    }
  }
  .nav-box{
    width: 3.2rem;
    padding-top:.2rem;
  }
  .nav-box{
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 10px 0px rgba(119,119,119,0.1);
    width: 3.2rem;
    flex: 1;
  }
  nav{
   width: 3.2rem;
   ul{
     width: 3.2rem;
     li{
       height: .56rem;
       a{
         display: block;
         font-size:.16rem;
         line-height: .56rem;
         color:rgba(153,153,153,1);
         width: 100%;
         height: 100%;
         span{
           display: block;
           float: left;
           margin-left: .33rem;
           height: 100%;
           img{
             display: inline-block;
             vertical-align: middle;
             width: .32rem;
             height:.22rem;
           }
         }
         p{
           float: left;
           margin-left: .33rem;
         }
       }
      .active{
        color:rgba(127,99,244,1);
        background:rgba(127,99,244,.1);
        border-left: 2px solid rgba(127,99,244,1);
      } 
     }
   }
    // ul{
    //   width: 100%;
    //   li{
    //     width: 100%;
    //     height:.56rem;
    //     padding:.17rem .32rem;
    //     overflow: hidden;
    //     box-sizing: border-box;
    //     a{
    //       display: block;
    //       width: 100%;
    //       height:.56rem;
    //       font-size:.16rem;
    //       color:rgba(153,153,153,1);
    //       span{
    //         float: left;
    //         img{
    //           width: .32rem;
    //           height:.22rem;
    //           display: block;
    //         }
    //       p{       
    //         display: block;    
    //         // color:rgba(127,99,244,1);
    //         margin-left: .33rem;
    //         float: left;
    //       }
    //     }
    //   }
        
        
    //   }
    // }
  }
</style>
