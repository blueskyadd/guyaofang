<template>
    <div class="big-box" v-show="flag">
        <div class="box"></div>
        <div class="model">
            <div class="header">
                <span></span>
                <p>付款名单</p>
                <span @click="setParentData()"><img src="../../../assets/img/close.png" style="cursor: pointer;" alt="" srcset=""></span>
            </div>
            <el-main>
                <el-table
                    v-loading="isLoading"
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="create_time"
                    label="时间">
                    </el-table-column>
                    <el-table-column
                    style="text-align:left"
                    prop="user"
                    label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="金额"
                    >
                    </el-table-column>
                </el-table>
            </el-main>
            
        </div>

    </div>
</template>
<script>
export default {
    name: 'ActivelyTwo',
     props:{
        activelyId:{
            type: Number,
            required: true
        }
    },
    data(){
      return{
        flag: true,
        tableData:[],
        isLoading: true
      }
    },

    methods: {
      close(){
          this.flag = false
      },
      setParentData(){
      this.$parent.activelyId = -1
      this.$parent.isRelease = 0
      },
      getActivelyTwoJoinList(){
          this.$http.get(this.$conf.env.getActivelyTwoJoinList +this.activelyId ).then( res =>{
              this.isLoading = false
              if(res.status == '200'){
                  if(!res.data) return
                  res.data.forEach( element =>{
                      element.create_time  = element.create_time.split(' ')[1]
                  })
                  this.tableData = res.data
              }
          }).catch( err =>{
              this.isLoading = false
              this.$message.error('网络错误');
          })
      }
    },
    mounted(){
        this.getActivelyTwoJoinList()
    }
}
</script>
<style lang="scss" >
    .big-box{
        position: fixed;
        width: 200%;
        height: 100%;
        left: -10rem;
        z-index: 2;
        .box{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.4);
        }
        .model{
            width: 5.5rem;
            height: 8.11rem;
            border-radius: .05rem;
            position: fixed;
            left: 0; right: 0; top: 0; bottom: 0;
            background: #fff;
            margin: auto;
            .header{
                height: .5rem;
                background: rgba(159,136,255,1);
                display: flex;
                justify-content: space-between;
                p{
                    font-size: .16rem;
                    color:rgba(255,254,254,1);
                    margin-top: .18rem;
                    margin-left: .33rem;
                }
                span{
                    margin-top: .21rem;
                    margin-right: .3rem;
                    img{
                        display: block;
                        width: .17rem;
                        height: .17rem;
                    }
                }
            }
            /*主体*/
            .el-main{
                padding: 0;
                tbody{
                    tr:nth-child(2n) td{
                        background: #F4F1FF;
                    }
                    tr{
                        color: #7F63F4;
                    }
                    tr td{
                        text-align: center;
                    }
                    tr td:nth-child(2){
                        text-align: left;
                    }
                }
                tr th{
                    background: #7F63F4;
                    color: #fff;
                    text-align: center;
                    }
                tr th:nth-child(2){
                    text-align: left;
                }
            }
        }
        
        
    }
    
</style>
