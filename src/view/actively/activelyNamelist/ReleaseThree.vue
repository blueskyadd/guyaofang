<template>
  <div class="big-box" v-show="flag">
    <div class="box"></div>
    <div class="model">
      <div class="header">
        <span></span>
        <p>放生名单</p>
        <span @click="setParentData()">
          <img src="../../../assets/img/close.png" style="cursor: pointer;" alt srcset>
        </span>
      </div>
      <el-main>
        <div class="view-box">
          <div class="table-box">
            <!--表格部分-->
            <div class="manage-table">
              <el-table :data="tableData" stripe style="width: 100%" v-loading="isLoadinga">
                <el-table-column prop="date" width="180px" align="center" >
                  <template slot-scope="scope">
                    <img :src="scope.row.img" alt>
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="one" align="center" width="100px" :label='oneName'></el-table-column>
                <el-table-column align="center" width="100px" prop="two" :label='twoName'></el-table-column>
                <el-table-column prop="three" align="center" width="100px" :label='threeName'></el-table-column>
                <el-table-column></el-table-column>
              </el-table>
            </div>

            <!-- 底部 -->
            <div class="total">
              <span>合计</span>
              <span v-for="item in totaldata" :key="item.animal">{{item.num__sum}}</span>
            </div>
            <div class="total-foot">
              <p>{{sumNumber}}</p>
            </div>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActivelyThree",
  props: {
    activelyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      flag: true,
      oneName: '',
      twoName: '',
      threeName: '',
      title: [{ name: "" }, { name: "" }, { name: "" }],
      tableData: [],
      totaldata: [],
      isLoadinga: true
    };
  },
  computed: {
    sumNumber() {
      var num = 0;
      this.totaldata.forEach(element => {
        num += element.num__sum;
      });
      return num;
    }
  },
  methods: {
    getAcitvelyThreeLifeList() {
      this.$http
        .get(this.$conf.env.getAcitvelyThreeLifeList + this.activelyId)
        .then(res => {
          this.isLoadinga = false;

            this.oneName = res.data.title[0] ? res.data.title[0][1] : ''
            this.twoName = res.data.title[1]? res.data.title[1][1] : ''
            this.threeName = res.data.title[2] ? res.data.title[2][1] : ''
          var userObj = {};
          res.data.user.forEach((element, index) => {
            userObj = {
              img: element[0] ? element[0] : "",
              name: element[1] ? element[1] : "",
              one: element[2] ? element[2] : 0,
              two: element[3] ? element[3] : 0,
              three: element[4] ? element[4] : 0,
            };
            this.tableData.push(userObj);
          });

          this.totaldata = res.data.total ? res.data.total : [];
        })
        .catch(err => {
          this.isLoadinga = false;
        });
    },
    setParentData(){
      this.$parent.activelyId = -1
      this.$parent.isRelease = 0
    },
  },
  mounted() {
    this.getAcitvelyThreeLifeList();
  }
};
</script>
<style lang="scss"  >
.big-box {
  position: fixed;
  width: 200%;
  height: 100%;
  left: -10rem;
  z-index: 2;
  .box {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .model {
    width: 12.2rem;
    height: 8.11rem;
    border-radius: 0.05rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    margin: auto;
    .header {
      height: 0.5rem;
      background: rgba(159, 136, 255, 1);
      display: flex;
      justify-content: space-between;
      p {
        font-size: 0.16rem;
        color: rgba(255, 254, 254, 1);
        margin-top: 0.18rem;
        margin-left: 0.33rem;
      }
      span {
        margin-top: 0.21rem;
        margin-right: 0.3rem;
        img {
          display: block;
          width: 0.17rem;
          height: 0.17rem;
        }
      }
    }
    /*主体*/
    .el-main {
      padding: 0;
      .view-box {
        width: 100%;
        height: 100%;
        padding: 0.24rem 0 0.53rem;
        box-sizing: border-box;
        .table-box {
          width: 100%;
          height: 100%;
          .manage-tit {
            width: 100%;
            overflow: hidden;
            
            img {
              display: block;
              float: right;
              // margin-bottom: .4rem;
              width: 0.94rem;
              height: 0.33rem;
              cursor: pointer;
            }
          }
          /*表格部分*/
          .manage-table {
            width: 100%;
            height: 8.1rem;
            tr.el-table__row--striped td {
              border: none;
              background: rgba(244, 241, 255, 1);
            }
            th{
                background: #7F63F4 !important;
                color: #fff;
            }
            img {
              width: 0.5rem;
              height: 0.5rem;
              display: block;
              border-radius: 50%;
              margin-left: 0.45rem;
              float: left;
            }
            span {
              float: left;
              margin-top: 0.14rem;
              margin-left: 0.17rem;
            }
          }
        }
        .total {
          box-sizing: border-box;
          width: 100%;
          height: 0.76rem;
          background: rgba(213, 203, 255, 1);
          position: absolute;
          left: 0;
          bottom: 0.72rem;
          padding-left: 1rem;
          span {
            display: block;
            float: left;
            font-size: 0.18rem;
            color: rgba(51, 51, 51, 1);
            line-height: 0.76rem;
            margin-right: 0.76rem;
          }
        }
        .total-foot {
          width: 100%;
          height: 0.76rem;
          background: rgba(173, 154, 255, 1);
          position: absolute;
          left: 0;
          bottom: 0;
          p {
            float: right;
            font-size: 0.18rem;
            line-height: 0.76rem;
            margin-right: 0.46rem;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
