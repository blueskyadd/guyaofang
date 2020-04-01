<template>
  <div class="shop-box">
    <headerTitle/>
    <el-main v-if="flag">
      <div class="view-box">
        <div class="table-box">
          <div class="manage-tit">
            <img src="../../assets/img/add.png" alt @click="addShop()">
          </div>
          <!--表格部分-->
          <div class="manage-table">
            <el-table
              v-loading="isLoading"
              :cell-style="changecolor"
              :data="tableData"
              @cell-mouse-enter="show"
              @cell-mouse-leave="leave"
              style="width: 100%"
            >
              <el-table-column prop="id" type="index" :index="getIndex" label="序号" width="100%"></el-table-column>
              <el-table-column prop="name" label="商品名称"></el-table-column>
              <el-table-column prop="shop_price" label="价格"></el-table-column>
              <el-table-column prop="create_time" label="添加时间"></el-table-column>
              <el-table-column prop="category" label="所属分类"></el-table-column>
              <el-table-column prop="priority" label="优先级">
                 <template slot-scope="scope">
                  <el-button type="text" >
                    {{scope.row.priority}}
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
          :page-size= 'perPage'
          :total="projectNumber"
          prev-text="<<"
          next-text=">>"
          @current-change="changePage"
        ></el-pagination>
        </div>

        
      </div>
    </el-main>
    <add-project v-else @editProjectClassifity="editProjectClassifity" :projectID="projectID"></add-project>

    <Bianji
      v-if="bianjiflag"
      @change="change"
      :classifityTitle="classifityTitle"
      :ClassifityID="ClassifityID"
    />
    <Bianji2 v-if="bianji2flag" @change="change2" @addProjectClassifity="addProjectClassifity"/>
  </div>
</template>

<script>
import Bianji from "./bianji.vue";
import Bianji2 from "./bianji2.vue";
import addProject from "../addShop/addShop.vue";
import headerTitle from "../../components/header/header";
export default {
  name: "ShoppManage",
  components: {
    Bianji,
    Bianji2,
    addProject,
    headerTitle
  },

  data() {
    return {
      flag: true,
      bianjiflag: false,
      bianji2flag: false,
      tableData: [],
      isLoading: true,
      classifityTitle: "",
      projectNumber: 0, //商品总条数
      projectID: -1, //商品ID
      previousPage: "", //上一页
      nextPage: "", //下一页
      currentPage: 1, //当前页面
      Pagenumber: 0,
      ClassifityID: -1,
      perPage:10
    };
  },
  methods: {
    handleClick(row) {
      this.projectID = row.id;
      this.flag = false;
    },
    del(row) {
      this.isLoading = true;
      this.deleteProject(row.id);
    },
    addShop() {
      this.flag = !this.flag;
    },
    show(row) {
      row.flag = true;
    },
    leave(row) {
      row.flag = false;
    },
    change(data) {
      this.bianjiflag = data;
    },
    change2(data) {
      this.bianji2flag = data;
    },
    //编辑分类
    editProjectClassifity() {
      this.bianji2flag = true;
    },
    addProjectClassifity(data) {
      this.bianjiflag = true;
      this.ClassifityID = data.id ? data.id : -1;
      this.classifityTitle = data.classifityName
        ? data.classifityName
        : "编辑分类";
    },

    changecolor(data) {
      if (data.columnIndex == 2) {
        return "color:#7F63F4";
      }
      if(data.columnIndex == 5){
        return "color:#333";
      }
    },
    /**@接口调用 */
    //获取商品列表
    getProjectList(number) {
      var url = this.$conf.env.getprojectList + "?p=" + number;

      this.$http
        .get(number ? url : this.$conf.env.getprojectList )
        .then(res => {
          this.isLoading = false;

          if (res.status == "200") {
            this.currentPage = this.currentPage;
            this.previousPage = res.data.previous;
            this.nextPage = res.data.next;
            this.projectNumber = res.data.count;
            this.Pagenumber = res.data.results.length;
            if (res.data.results && res.data.results.length > 0) {
              res.data.results.forEach(element => {
                element.flag = false;
              });
              this.tableData = res.data.results;
            }
          }else{
            this.tableData = []
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    deleteProject(ID) {
      this.$http
        .delete(this.$conf.env.getprojectList + ID + "/")
        .then(res => {
          if (res.status == "204") {
            this.$message({ message: "删除成功", type: "success" });
            this.getProjectList(this.currentPage);
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
    changePage(pageNumber) {
      this.isLoading = true;
      
      if (pageNumber > this.currentPage) {
        this.getProjectList(pageNumber);
      } else {
        this.getProjectList(pageNumber);
      }
      this.currentPage = pageNumber;
    },
    getIndex(index){
      return (this.currentPage - 1) * this.perPage + index + 1
    }
  },
  mounted() {
    this.getProjectList(0);
  }
};
</script>


<style lang="scss">
.shop-box {
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
    padding: 0.24rem 0.32rem 0 0.32rem;
    box-sizing: border-box;
    position: relative;
    .el-pagination {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .table-box {
      width: 100%;
     position: relative;
        padding-bottom: 2rem;
        min-height: 7.2rem;
      .manage-tit {
        width: 100%;
         height:auto;
       
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
        width: 100%;
        height:auto;
        .el-table__header {
          tr {
            th {
              background: #f2f5f8 !important;
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
      min-width: .32rem!important;
      min-height: .32rem;
      span{
        min-width: .32rem;
        line-height: .32rem;
        height: .32rem;
      }
    }
    
  }
  ::-webkit-scrollbar {
        display: none;
    }
}
.el-button--text{
  color: #333 !important;
}

</style>
