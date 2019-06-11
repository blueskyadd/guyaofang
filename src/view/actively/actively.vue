<template>
  <div class="actively-box">
    <headerTitle/>
    <el-main v-if="isAddActively">
      <div class="view-box">
        <div class="table-box" style="padding-bottom: 2rem;">
          <div class="manage-tit">
            <img src="../../assets/img/add.png" alt @click="isAddActively = false">
          </div>
          <!--表格部分-->
          <div class="manage-table">
            <el-table
              v-loading="isLoading"
              :data="tableData"
              @cell-mouse-enter="show"
              @cell-mouse-leave="leave"
              style="width: 100%"
            >
              <el-table-column prop="id" type="index" :index="getIndex" label="序号" width="100%"></el-table-column>
              <el-table-column prop="name" label="活动名称"></el-table-column>
              <el-table-column prop="create_time" label="添加时间"></el-table-column>
              <el-table-column prop="join_num" label="参加人数"></el-table-column>
              <el-table-column prop="sold_num" label="付款人数"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="查看">
                <template slot-scope="scope">
                  <el-button type="text" @click="open(scope.row)">
                    <img src="../../assets/img/see.png" alt srcset>
                  </el-button>
                </template>
              </el-table-column>
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
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="perPage"
            :total="activelyNumber"
            @current-change="changePage"
            prev-text="<<"
            next-text=">>"
          ></el-pagination>
        </div>
      </div>
    </el-main>
    <!-- <AddSeats v-else /> -->
    <Actively v-else :activelyClassifity="activelyClassifity" :activelyId="activelyId"/>
    <ReleaseOne v-if="isRelease  == 1" :activelyId="activelyId"/>
    <ReleaseTwo v-if="isRelease  == 2" :activelyId="activelyId"/>
    <ReleaseThree v-if="isRelease == 3" :activelyId="activelyId"/>
  </div>
</template>

<script>
import Actively from "./activelyHuod/Actively.vue"; //添加活动
import ReleaseOne from "./activelyNamelist/ReleaseOne.vue"; //活动一查看列表
import ReleaseTwo from "./activelyNamelist/ReleaseTwo.vue";
import ReleaseThree from "./activelyNamelist/ReleaseThree.vue"; //活动三查看列表
import headerTitle from "./../../components/header/header";

export default {
  name: "teaHouse",
  components: { Actively, ReleaseOne, ReleaseTwo, ReleaseThree, headerTitle },
  data() {
    return {
      isLoading: true,
      flag: false,
      tableData: [],
      isAddActively: true,
      qrCodeImg: "",
      activelyNumber: 0, //茶坊列表总条数
      isRelease: "", //查看活动列表
      activelyClassifity: 1, //活动类别
      activelyId: -1, //活动ID
      previousPage: "", //上一页
      nextPage: "", //下一页
      pageNumber: 0, //当前页数
      currentPage: 1,
      perPage: 10
    };
  },
  methods: {
    handleClick(row) {
      this.activelyId = row.id;
      this.activelyClassifity = row.classify;
      this.isAddActively = false;
    },
    del(row) {
      this.isLoading = true;
      this.deleteSeat(row.id);
    },
    open(row) {
      this.activelyId = row.id;

      this.isRelease = row.classify;
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
    deleteSeat(ID) {
      this.$http
        .delete(this.$conf.env.deleteActively + ID)
        .then(res => {
          if (res.status == "200") {
            this.$message({ message: "删除成功", type: "success" });
            this.getActivelyList(this.currentPage);
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
    getActivelyList(number) {
      this.$http
        .get(this.$conf.env.getActivelyList + number)
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            this.currentPage = this.currentPage;
            this.previousPage = res.data.previous;
            this.nextPage = res.data.next;
            this.activelyNumber = res.data.count;
            this.pageNumber = res.data.results.length;
            res.data.results.forEach(element => {
              element.flag = false;
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
    changePage(pageNumber) {
      this.isLoading = true;
      this.getActivelyList(pageNumber);
      this.currentPage = pageNumber;
    },
    getIndex(index) {
      return (this.currentPage - 1) * this.perPage + index + 1;
    }
  },
  mounted() {
    this.getActivelyList(1);
  }
};
</script>


<style lang="scss" >
.actively-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
    min-width: 0.32rem !important;
    min-height: 0.32rem;
    span {
      min-width: 0.32rem;
      line-height: 0.32rem;
      height: 0.32rem;
    }
  }

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
      height: auto;
      position: relative;
      min-height: 7.2rem;
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
  .el-button {
    padding: 0.12rem 0 !important;
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
