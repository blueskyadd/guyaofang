<template>
  <div class="header-box">
    <div class="header">
      <section>
        <div  class="login-box">
          <p class="login-tit">坊管理系统</p>


          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>


          <form action="">
            <label for="">账号</label>
            <input type="text" class="user-iphone" v-model="username">
            <span></span>
            <label for="">密码</label>
            <input type="password" class="user-pass" v-model="password">
            <span></span>
            <input type="button" class="but" value="登录" @click="liginMoudel"></input>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
      name: "Login",
      data(){
        return{
          "username": 'hllyzms',//账户名
          "password": 'asd123456',//用户密码

          options: [{
            value: '0',
            label: '后台管理系统'
          }, {
            value: '1',
            label: '大屏展示'
          }, {
            value: '2',
            label: '中控系统'
          }],
          value: '0'
        }
      },
      methods:{
        liginMoudel(){
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });


          var params = {
            "username": this.username,
            "password": this.password
          }
          ;
          if(this.value === ''){
            this.$message({
              showClose: true,
              message: '请先选择系统',
              duration:1000,
              type: 'warning'
            });
            loading.close()
            return false
          }
          this.$http.post(this.$conf.env.loginUser, params).then( res =>{
            console.log(res)
            loading.close();
            if(res.status == '201'){
              if(res.data.token){
                sessionStorage.setItem('jp_token', res.data.token)
                if(this.value === '0'){

                  this.$router.push({name:"ShoppManage"})
                }else if(this.value === '1'){
                  this.$router.push({name:"ShowBigP"})
                }else if(this.value === '2'){
                  this.$router.push({name:"stateScreen"})
                }
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                });
              }

            }
          }).catch( err =>{

            loading.close();
            this.$message({
              message: '网络错误',
              duration:1000,
              type: 'warning'
            });
          })
        }
      }
  }
</script>

<style lang="scss" >
    .el-icon-loading{
      font-size: 35px;
    }
    .el-loading-spinner i{
      color:rgba(186,138,197,1);
    }
    .el-loading-spinner .el-loading-text{

      color:rgba(186,138,197,1);
    }
.header-box{
  width:100%;
  height:100%;

  .header{
    width:100%;
    height:100%;
    background: url("../assets/img/loginbj.png") no-repeat;
    background-size: cover;
  }
    section{
      width: 13rem;
      height:7.33rem;
      position: fixed;
      left: 50%;
      top:50%;
      margin-left:-6.5rem;
      margin-top:-3.66rem;
      background: red;
      background: url("../assets/img/denglu.png") no-repeat;
      background-size: cover;
      .login-box{
        margin-top:1.6rem;
        margin-left: .41rem;
        .login-tit{
          font-size:.3rem;
          font-family:FZXKFW--GB1-0;
          font-weight:bold;
          color:rgba(53,78,192,1);
        }
        .el-select{
          display: block;
          width: 2rem;
          margin-top: .3rem;
          input{
            border-radius:10px;
          }
        }
        form{
          margin-top:.23rem;
          label,input,button{
            display: block;
          }
          label{
            font-size:.2rem;
            color:rgba(51,51,51,1);
            margin-bottom: .08rem;
          }
          input{
            width: 4rem;
            line-height: .4rem;
            border:0;
            border-bottom: 1px solid #333333;
            background: #E8E9F2;
          }
          span{
            height:.6rem;
            display: block;
            font-size: .2rem;
            color:red;
          }
          .but{
            margin-top:.07rem;
            width:4rem;
            height:.6rem;
            background:rgba(56,81,199,1);
            box-shadow:4px 4px 9px 1px rgba(6,12,39,0.2), -4px -4px 9px 1px rgba(6,12,39,0.2);
            border-radius:.3rem;
            text-align: center;
            line-height: .6rem;
            font-size:.2rem;
            font-weight:400;
            color:rgba(255,255,255,1);
          }
        }
      }
    }
  .el-message{
    min-width:3rem;
    .el-message__icon{
      font-size: .3rem;
    }
  }
    .el-loading-spinner{
      i{
        font-size: .25rem;
        display: block;
      }
    }
  }
  
</style>
