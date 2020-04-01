<template>
  <div class="addbehalf-box" v-loading.fullscreen.lock="isLoading">
    <el-main>
      <div class="view-box">
        <div class="addshopp-box">
          <div class="addshopp-dai">
            <div class="addshopp-tit">
              <p>
                <img src="../../assets/img/goback.png" alt @click="$parent.editBuy = true,$parent.behalfID = -1">
                <span>{{behalfID == -1 ?'添加代购':'编辑代购'}}</span>
              </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label for>动物名称</label>
                    <input type="text" placeholder="添加代购名称" class="daig-name" v-model="animlName">
                  </td>
                  <td>
                    <label for>动物价格</label>
                    <input type="number" placeholder="填写价格" class="anim-price" v-model="animlPrice" >
                    <label for>量词</label>
                    <input type="text" placeholder="填写量词" class="anim-num" v-model="animlNumber">
                  </td>
                  <td>
                    <label for>生命数</label>
                    <input type="number" placeholder="填写生命数" class="anim-price" v-model="animlNum">
                  </td>
                  <td class="zhuti-photo" style="height: auto;">
                    <label for style="margin-top:.2rem">主题照片</label>
                    <div class="activelyOne-photo">
                      <el-upload
                        action="string"
                        ref="upload"
                        list-type="picture-card"
                        :http-request="addAttachment"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload"
                         accept="image/png, image/jpeg"
                        :on-remove="handleRemove"
                        :multiple="true"
                        :file-list="animlMainList"
                        :limit = 1
                        :on-exceed = 'onExceed'
                        class="photo"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                      <p>50*50 png. jpg格式</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "behalf",
  inject: ["reload"],
  props: {
    behalfID: {
      type: Number,
      required: true,
      
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //上传图片文件
      animlName: "", //动物名称
      animlPrice: Number, //价格
      animlNumber: "",
      animlNum: Number,
      animlMainList: [],
      animlMain: "",
      isLoading: false
    };
  },
  methods: {
    addAttachment(params) {
      this.animlMain = params.file;
    },
    handleRemove(file, fileList) {
      this.animlMain = ''
      this.animlMainList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    /**@图片格式判断 */
    beforeAvatarUpload(file){ 
      const isJPG = file.type === "image/jpeg"
      const isPng = file.type === "image/png"
      if (!isJPG && !isPng) {
        this.$message.error("上传头像图片只能是 JPG或PNG格式!");
      }
      return isJPG  || isPng ;
    },

    submit() {
      if (!this.VerificationData()) return;
      var params = new FormData();
      params.append("name", this.animlName);
      params.append("price", this.animlPrice);
      params.append("unit", this.animlNumber);
      params.append("num", this.animlNum);
      this.animlMainList.length > 0
        ? params.append("image", "")
        : params.append("image", this.animlMain);
        this.isLoading = true
      this.behalfID == -1
        ? this.addAnimlData(params)
        : this.updataAnimlData(params);
    },
    addAnimlData(params) {
      this.$http
        .post(this.$conf.env.addAnimlData, params, true)
        .then(res => {
          this.$message({ message: "添加成功", type: "success" });
          this.reload();
        })
        .catch(err => {
          this.isLoading = false
          this.$message.error("网络错误");
        });
    },
    updataAnimlData(params) {
      this.$http
        .put(this.$conf.env.addAnimlData + this.behalfID + "/", params, true)
        .then(res => {
          this.isLoading = false
          if(res.status == '200'){
            this.$message({  message: '修改成功', type: 'success'});
            this.reload()
          }else{
            this.$message({ message: '修改失败', type: 'warning'});
          }
        })
        .catch(err => {
          this.isLoading = false
          this.$message.error("网络错误");
        });
    },
    getAnimlData() {
      this.$http
        .get(this.$conf.env.addAnimlData + this.behalfID + "/")
        .then(res => {
          this.isLoading = false
          if (res.status == "200") {
            this.animlName = res.data.name ? res.data.name : "";
            this.animlPrice = res.data.price ? res.data.price : Number;
            this.animlNumber = res.data.unit ? res.data.unit : "";
            this.animlNum = res.data.num ? res.data.num : Number;
            this.animlMain = res.data.image ? res.data.image : "";
            this.animlMainList = res.data.image
              ? [{ url: res.data.image }]
              : [];
          }
        })
        .catch(err => {
          this.isLoading = false
          this.$message.error("网络错误");
        });
    },
    VerificationData() {
      if (
        !this.animlName ||
        !this.animlPrice ||
        !this.animlNumber ||
        !this.animlNum ||
        !this.animlMain
      ) {
        this.$message({ message: "请完善您的信息", type: "warning" });
        return false;
      } else {
        return true;
      }
    },
    onExceed(){
        this.$message.error('最多添加一张图片');
    }
  },
  mounted() {
    if (this.behalfID != -1) {
      this.isLoading = true
      this.getAnimlData();
    }
  }
};
</script>

<style lang="scss" >
.addbehalf-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .el-upload-list__item-status-label{
    margin: 0 !important;
    line-height : initial;
  }
  /*头部*/
  .view-box {
    width: 100%;
    height: calc(100% - .78rem);
    background: #fff;
    box-shadow: 0px 3px 10px 0px rgba(119, 119, 119, 0.1);
    border-radius: 3px;
    .addshopp-box {
      width: 100%;
      height: 100%;
      padding: 0.28rem;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      .el-button {
        position: absolute;
        right: 0.67rem;
        bottom: 0.33rem;
        background: rgba(127, 99, 244, 1);
        border-color: #7f63f4;
        width: 1.71rem;
        font-size: 0.18rem;
      }

      .addshopp-tit {
        width: 100%;
        height: 0.4rem;
        overflow: hidden;
        p {
          overflow: hidden;
          img{
              cursor: pointer;
            }
        }
        span {
          font-size: 0.22rem;
          color: rgba(70, 74, 83, 1);
          line-height: 0.4rem;
          margin-left: 12px;
          float: left;
        }
        img {
          float: left;
          width: 0.22rem;
          height: 0.22rem;
          margin-top: 0.1rem;
        }
      }
      .addshopp-dai {
        width: 8.8rem;
        height: 100%;
        float: left;
        .one-lei {
          width: 100%;
          overflow: hidden;
        }
        table {
          margin-left: 0.22rem;
          tbody {
            tr {
              td {
                height: 0.98rem;
                display: flex;
                align-items: center;
                label {
                  font-size: 0.18rem;
                  font-weight: bold;
                  color: rgba(70, 74, 83, 1);
                  margin-right: 0.08rem;
                }
                input {
                  height: 0.49rem;
                  border: 1px solid #dddfe1;
                  border-radius: 3px;
                  background: rgba(33, 141, 250, 0);
                  font-size: 0.15rem;
                  color: #999;
                  line-height: 0.49rem;
                  text-indent: 0.19rem;
                }
                .daig-name {
                  width: 3.12rem;
                }
                .anim-price {
                  width: 1.28rem;
                  margin-right: 0.33rem;
                }
                .anim-num {
                  width: 1.01rem;
                }
              }

              /*上传图片样式修改*/
              .zhuti-photo {
                margin-top: 0.3rem;
                label {
                  white-space: nowrap;
                  margin-top: 0;
                }
                p {
                  font-size: 0.12rem;
                  color: rgba(127, 99, 244, 1);
                }
                .photo {
                  height: auto;
                  display: flex;
                  flex-wrap: wrap;
                }
                .el-upload--picture-card {
                  width: 0.8rem;
                  height: 0.8rem;
                  position: relative;
                  background: url("../../assets/img/addphoto.png") no-repeat;
                  background-size: cover;
                      border: 1px dashed #fff;
                  i {
                    /*position: absolute;*/
                    /*left: 0.26rem;*/
                    /*top: .25rem;*/
                    display: none;
                  }
                }
                ul {
                  display: flex;
                  flex-wrap: wrap;
                  li {
                    width: 0.8rem;
                    height: 0.8rem;
                  }
                }
              }
            }
          }
        }
      }
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

  /*表单*/
}
</style>
