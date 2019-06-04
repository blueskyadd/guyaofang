<template>
  <div class="house-box">
    <headerTitle/>
    <el-main v-if="isAddSeats">
      <div class="view-box">
        <div class="table-box">
          <div class="manage-tit">
            <img src="../../assets/img/add.png" alt @click="isAddSeats = false">
          </div>
          <!--表格部分-->
          <div class="manage-table">
            <el-table
              :cell-style="changecolor"
              v-loading="isLoading"
              :data="tableData"
              @cell-mouse-enter="show"
              @cell-mouse-leave="leave"
              style="width: 100%"
            >
              <el-table-column prop="id" type="index" :index="getIndex" label="序号"></el-table-column>
              <el-table-column prop="name" label="席位"></el-table-column>
              <el-table-column prop="location" label="所属分类"></el-table-column>
              <el-table-column label="二维码">
                <template slot-scope="scope">
                  <el-button type="text" @click="open(scope.row)">
                    <img src="../../assets/img/see.png" alt srcset>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    v-show="scope.row.flag"
                  >
                    <img src="../../assets/img/bianji.png" alt srcset>
                  </el-button>
                  <el-button
                    @click="del(scope.row)"
                    type="text"
                    size="small"
                    v-show="scope.row.flag"
                  >
                    <img src="../../assets/img/del.png" alt srcset>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size= 'perPage'
          :total="seatNumber"
          prev-text="<<"
          next-text=">>"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </el-main>
    <AddSeats v-else :seatsID="seatsID"/>
    <Code v-if="flag" :qrCodeImg="qrCodeImg" @change="change"/>
  </div>
</template>

<script>
import Code from "./QR-code";
import AddSeats from "../AddSeats/AddSeats.vue";
import headerTitle from "../../components/header/header";
export default {
  name: "teaHouse",
  components: { Code, AddSeats, headerTitle },
  data() {
    return {
      flag: false,
      tableData: [],
      isAddSeats: true,
      qrCodeImg: "",
      seatsID: -1,
      seatNumber: 0, //茶坊列表总条数
      isLoading: true,
      perPage:10,
      currentPage: 1
    };
  },
  methods: {
    handleClick(row) {
      this.seatsID = row.id;
      this.isAddSeats = false;
    },
    changecolor(data) {
      if (data.columnIndex == 4 && data.row.status == "闲置") {
        return "color:#00EC8B";
      } else if (data.columnIndex == 4 && data.row.status == "忙碌") {
        return "color:#F10044";
      }
    },
    del(row) {
      this.isLoading = true;
      this.$http
        .delete(this.$conf.env.deleteSeat + row.id + "/")
        .then(res => {
          if (res.status == "204") {
            this.$message({ message: "删除成功", type: "success" });
            this.getSeatList(this.currentPage);
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
      this.qrCodeImg = row.image;
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
    getSeatList(num) {
      this.$http
        .get(this.$conf.env.getSeatList + num)
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            this.currentPage = this.currentPage;
            this.seatNumber = res.data.count;
            res.data.results.forEach(element => {
              element.flag = false;
            });
            this.tableData = res.data.results;
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    changePage(numpage) {
      this.isLoading = true;
      this.currentPage = numpage;
      this.getSeatList(numpage);
    },
    getIndex(index){
      return (this.currentPage - 1) * this.perPage + index + 1
    }
  },
  mounted() {
    this.getSeatList(1);
  }
};
</script>


<style lang="scss">
.house-box {
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
      height: 100%;
      .manage-tit {
        width: 100%;
        overflow: hidden;
        
        img {
          display: block;
          float: right;
          margin-bottom: 0.4rem;
          width: 0.94rem;
          height: 0.33rem;
          cursor: pointer;
        }
      }
      /*表格部分*/
      .manage-table {
        width: 100%;
        height: 8.1rem;
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
    span{
        min-width: .32rem;
        line-height: .32rem;
        height: .32rem;
      }
  }
}
</style>
