<template>
  <div class="buy-box">
    <headerTitle/>
    <el-main v-if="editBuy">
      <div class="view-box">
        <div class="table-box">
          <div class="manage-tit" >
            <img src="../../assets/img/add.png" alt="" @click="editBuy=false">
          </div>
            <!--表格部分-->
          <div class="manage-table">
            <el-table
              v-loading="isLoading"
              :data="tableData"
              @cell-mouse-enter="show"
              @cell-mouse-leave="leave"
              style="width: 100%">
              <el-table-column
                prop="id"
                type="index"
                width="100%"
                :index="getIndex"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="代购名称">
              </el-table-column>
              <el-table-column
                label="价格">
                <template slot-scope="scope">
                  <el-button type="text" >
                    {{scope.row.price}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
                  <el-button @click="deleteAnimlList(scope.row)" type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/del.png" alt="" srcset=""></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination
          background
          layout="prev, pager, next"
          :page-size= 'perPage'
          :total="amimlNuber"
          @current-change='changePage'
          prev-text='<<'
          next-text=">>"
         >
        </el-pagination>
        </div>
        
      </div>
    </el-main>
    <add-buy v-else  :behalfID='behalfID'></add-buy>



  </div>
</template>

<script>
import addBuy from "../behalf/behalf.vue";
import headerTitle from "../../components/header/header"
  export default {
    name: "teaHouse",
    components:{addBuy, headerTitle},
    data() {
      return {
        amimlNuber: 0,//代购总条数
        tableData: [],
        isLoading: true,
        pageNumber : 1,
        editBuy: true,
        perPage: 10,
        behalfID: -1
      }
    },
    methods: {
      handleClick(row) {
        this.behalfID = row.id
        this.editBuy = false
      },
      deleteAnimlList(row) {
        this.isLoading = true
        this.$http.delete( this.$conf.env.deleteAnimlList +  row.id).then( res =>{
          if(res.status == '204'){
            this.$message({ message: '删除成功', type: 'success' });
            this.getAnimalList(this.pageNumber)
          }else{
            this.isLoading = false
            this.$message.error('删除失败');
          }
          
        }).catch( err=>{
          this.isLoading = false
          this.$message.error('网络错误');
        })
      },
      show(row){
        row.flag = true
      },
      leave(row){
        row.flag = false
      },
      getAnimalList(num){
        this.$http.get(this.$conf.env.getAnimalList +  num).then( res =>{
         this.isLoading = false
          if(res.status == '200'){
            this.pageNumber = this.pageNumber
            this.amimlNuber = res.data.count
            res.data.results.map( element =>{
              element.flag = false
            })
            this.tableData = res.data.results
            
          }
        }).catch( err =>{
          this.isLoading = false
          this.$message.error('网络错误');
        })
      },
      changePage(numpage){
        this.isLoading = true
        this.getAnimalList(numpage)
        this.pageNumber = numpage
      },
       getIndex(index){
        return (this.pageNumber - 1) * this.perPage + index + 1
      }
    },
    mounted(){
      this.getAnimalList(1)
    }
  }
</script>


<style lang="scss" >
  .buy-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
    .el-table__row{
      height: .54rem;
    }
    .el-pager{
      .number, .more{
        background: #fff !important;
        border-radius: 50% !important;
        width: .32rem !important;
        height: .32rem !important;
        line-height:  .32rem !important;
      }
      .active{
        background: rgba(127,99,244,1) !important;
        color: #fff;
      }
    }
    .btn-prev, .btn-next{
      background: #fff !important;
      border-radius: 50% !important;
      width: .32rem !important;
      height: .32rem !important;
      min-width: .32rem!important;
      min-height: .32rem;
      span{
        min-width: .32rem;
        line-height: .32rem;
        height: .32rem;
      }
    }
    header{
      width: 100%;
      height:.98rem !important;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding-top:.24rem;
      padding-right:.66rem;
      background: #fff;
    }
    .header{
      width: 100%;
      height:100%;
      overflow: hidden;
      .search-box{
        position: relative;
        overflow: hidden;
        float: left;
        .search-ipt{
          width: 3.51rem;
          height:.5rem;
          background:rgba(243,243,243,1);
          border-radius:3px;
          float: left;
        }
        .img-box{
          width: .55rem;
          height:.5rem;
          background: #F3F3F3;
          float: left;
          img{
            width: .13rem;
            height: .13rem;
            display: block;
            margin:0 auto;
            margin-top: .18rem;
          }
        }
      }
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
    }

    /*主体*/
    .view-box{
      width: 100%;
      height:100%;
      padding:.24rem .32rem .53rem .32rem;
      box-sizing: border-box;
      position: relative;
      .el-pagination{
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .table-box{
        width: 100%;
        height:auto;
        position: relative;
        padding-bottom: 2rem;
        min-height: 7.2rem;
        .manage-tit{
          width: 100%;
          overflow: hidden;
          
          img{
            display: block;
            float: right;
            margin-bottom: .4rem;
            width: .94rem;
            height:.33rem;
            cursor: pointer;
          }
        }
        /*表格部分*/
        .manage-table{
          width: 100%;
          height:auto;
          .el-table__header{
            tr{
              th{
                background: #F2F5F8 !important;
              }
            }
          }
        }
      }
    }
    .el-button--text{
  color: #333 !important;
}
  }
</style>
