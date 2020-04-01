<template>
  <div class="order-box">
    <headerTitle/>
    <el-main>
      <div class="view-box">
        <div class="table-box">
          <!--表格部分-->
          <div class="manage-table">
            <el-table
              v-loading="isLoading"
              :data="tableData"
              @cell-mouse-enter="show"
              @cell-mouse-leave="leave"
              style="width: 100%"
            >
              <el-table-column prop="id" label="订单号"></el-table-column>
              <el-table-column prop="money" label="订单价格"></el-table-column>
              <el-table-column prop="create_time" label="下单时间"></el-table-column>
              <el-table-column label="详情">
                <template slot-scope="scope">
                  <el-button type="text" @click="open(scope.row)">
                    <img src="../../assets/img/see.png" alt srcset>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="发货状态"></el-table-column>
              <!-- <el-table-column
                prop="operation"
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="del(scope.row)" type="text" size="small" v-show="scope.row.flag"><img src="../../assets/img/del.png" alt="" srcset=""></el-button>
                </template>
              </el-table-column>--> 
            </el-table>
          </div>
          <el-pagination
          background
          layout="prev, pager, next"
          :page-size= 10
          :total="seatNumber"
          prev-text="<<"
          next-text=">>"
          @current-change="changePage"
        ></el-pagination>
        </div>
        
      </div>
    </el-main>
    <orderDetail
      v-if="flag"
      :orderdetail="orderdetail"
      :orderaddress="orderaddress"
      @change="change"
    />
  </div>
</template>

<script>
import orderDetail from "./orderDetail";
import headerTitle from "../../components/header/header";
export default {
  name: "Order",
  components: { orderDetail, headerTitle },
  data() {
    return {
      flag: false,
      tableData: [],
      isAddSeats: true,
      qrCodeImg: "",
      seatsID: -1,
      seatNumber: 0, //茶坊列表总条数
      isLoading: true,
      currentPage: 1, //当前页面
      orderaddress: ""
    };
  },
  methods: {
    handleClick(row) {
      this.seatsID = row.id;
      this.isAddSeats = false;
    },
    del(row) {
      this.isLoading = true;
      this.$http
        .delete(this.$conf.env.deleteOrderData + row.id)
        .then(res => {
          if (res.status == "204") {
            this.$message({ message: "删除成功", type: "success" });
            this.getOrderList();
          } else {
            this.isLoading = false;
            this.$message({ message: "删除失败", type: "warning" });
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    open(row) {
      this.orderaddress = row.address;
      this.orderdetail = row.order_details;
      this.flag = true;
    },
    show(row) {
      row.flag = true;
    },
    leave(row) {
      row.flag = false;
    },
    change(data) {
      this.flag = data;
    },
    getOrderList() {
      this.$http
        .get(this.$conf.env.getOrderList)
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            this.currentPage = this.currentPage;
            this.seatNumber = res.data.count;
            res.data.results.forEach(element => {
              element.flag = false;
              element.create_time = element.create_time.split(" ")[0];
            });
            this.tableData = res.data.results;
          }else{
            this.tableData = []
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    changePage() {
      this.isLoading = true;
      if (pageNumber > this.currentPage) {
        this.getOrderList(pageNumber);
      } else {
        this.getOrderList(pageNumber);
      }
      this.currentPage = pageNumber;
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>


<style lang="scss">
.el-pager {
  .number,
  .more {
    background: #fff !important;
    border-radius: 50% !important;
    width: 0.32rem !important;
    height: 0.32rem !important;
    line-height: 0.32rem !important;
  }
  .active {
    background: rgba(127, 99, 244, 1) !important;
    color: #fff;
  }
}
.btn-prev,
.btn-next {
  background: #fff !important;
  border-radius: 50% !important;
  width: 0.32rem !important;
  height: 0.32rem !important;
  min-width: .32rem!important;
  min-height: .32rem;
  span{
        min-width: .32rem!important;
        line-height: .32rem!important;
        height: .32rem!important;
      }
}
.order-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  header {
    width: 100%;
    height: 0.98rem !important;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 0.24rem;
    padding-right: 0.66rem;
    background: #fff;
  }
  .header {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .search-box {
      position: relative;
      overflow: hidden;
      float: left;
      .search-ipt {
        width: 3.51rem;
        height: 0.5rem;
        background: rgba(243, 243, 243, 1);
        border-radius: 3px;
        float: left;
      }
      .img-box {
        width: 0.55rem;
        height: 0.5rem;
        background: #f3f3f3;
        float: left;
        img {
          width: 0.13rem;
          height: 0.13rem;
          display: block;
          margin: 0 auto;
          margin-top: 0.18rem;
        }
      }
    }
    .header-back {
      float: right;
      overflow: hidden;
      cursor: pointer;
      margin-top: 0.1rem;
      .image-box {
        float: left;
        img {
          width: 0.29rem;
          height: 0.29rem;
          display: block;
        }
      }
      span {
        float: left;
        font-size: 0.19rem;
        color: rgba(127, 99, 244, 1);
        margin-left: 0.15rem;
      }
    }
  }

  /*主体*/
  .view-box {
    width: 100%;
    height: 100%;
    padding: 0.24rem 0.32rem 0.53rem 0.32rem;
    box-sizing: border-box;
    position: relative;
    .el-pagination {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .table-box {
      width: 100%;
      height:auto;
      position: relative;
      padding-bottom: 2rem;
      min-height: 7.2rem;
      .manage-tit {
        width: 100%;
        overflow: hidden;
       
        img {
          display: block;
          float: right;
          margin-bottom: 0.4rem;
          width: 0.94rem;
          height: 0.4rem;
           cursor: pointer;
        }
      }
      /*表格部分*/
      .manage-table {
        height: auto;
        .el-table__header {
          tr {
            th {
              background: #f2f5f8 !important;
            }
          }
        }
      }
    }
  }
  .el-button{
      padding: .12rem 0 !important;
    }
}
</style>
