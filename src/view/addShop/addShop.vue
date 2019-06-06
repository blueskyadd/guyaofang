<template>
  <div class="addShop-box" v-loading.fullscreen.lock="isLoading">
    <el-main>
      <div class="view-box">
        <div class="addshopp-box">
          <div class="addshopp-dai">
            <div class="addshopp-tit">
              <p>
                <img
                  @click="$parent.flag = true,$parent.projectID = -1"
                  src="../../assets/img/goback.png"
                  alt
                >
                <span>添加商品</span>
              </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td class="input_lable">
                    <label>分类</label>
                    <el-select popper-class='selete_list'  v-model="project.projectCategoryId" placeholder="请选择">
                      <el-option
                        v-for="item in projectCategory"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <span class="addshop" @click="editProjectClassifity()">
                      <img src="../../assets/img/0c05a25c35cd22ea2d3e50d8b41ba32.png" alt>
                    </span>
                    <label>优先级</label>
                    <div v-for="item in projectPriority" :key="item.id">
                      <el-radio  v-model="project.projectPriorityId" :label="item.id">{{item.name}}</el-radio>
                    </div>
                  </td>
                  <td class="inp-none">
                    <label for>状态</label>
                    <div v-for="item in projectStatusData" :key="item.id">
                       <el-radio  v-model="project.projectStatus" :label="item.id">{{item.name}}</el-radio>
                    </div>
                  </td>
                  <td>
                    <label for>商品名称</label>
                    <input
                      type="text"
                      placeholder="填写商品名称"
                      class="actively-site"
                      v-model="project.projectName"
                    >
                  </td>
                  <td>
                    <label for>原价</label>
                    <input
                      type="number"
                      placeholder="填写商品原价"
                      class="actively-num"
                      v-model="project.oldProjectPrice"
                    >
                    <label for class="xian">现价</label>
                    <input
                      type="number"
                      placeholder="填写商品现价"
                      class="actively-iphone"
                      v-model="project.newProjectPrice"
                    >
                  </td>
                  <td style="width:6.5rem">
                    <label for>商品介绍</label>
                    <input
                      type="text"
                      placeholder="填写商品介绍"
                      class=" project_Introduction"
                      maxlength="30"
                      v-model="project.projectIntroduction"
                    >
                    <span class="project_Introduction_length">{{project.projectIntroduction.length}}/30</span>
                  </td>
                  <td>
                    <label for>库存</label>
                    <input
                      type="number"
                      placeholder="填写库存"
                      class="actively-num"
                      v-model="project.projectStock"
                    >
                  </td>
                  <td class="zhuti-photo" style="height: auto;">
                    <label for style="margin-top:.2rem">商品封面</label>
                    <div class="activelyOne-pK:hoto">
                      <el-upload
                        action="string"
                        ref="upload"
                        list-type="picture-card"
                        :http-request="addAttachmentMain"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemoveMain"
                        :multiple="true"
                        :before-upload="beforeAvatarUpload"
                        accept="image/png, image/jpeg"
                        :file-list="projectMainImgList"
                        :limit="1"
                        :on-exceed="onExceed"
                        class="photo"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>

                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>

                      <p class="footer_text">750*370 png. jpg格式</p>
                    </div>
                  </td>
                  <td class="zhuti-photo" style="height: auto;">
                    <label for style="margin-top:.2rem">商品照片</label>
                    <div class="activelyOne-photo">
                      <el-upload
                        action="string"
                        ref="upload"
                        list-type="picture-card"
                        :http-request="addAttachment"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemoveBanner"
                        :multiple="true"
                        :file-list="project.projectBanner"
                        :before-upload="beforeAvatarUpload"
                        accept="image/png, image/jpeg"
                        class="photo"
                      >
                        <i class="el-icon-plus"></i>
                        <p class="zhuyi">注：不得少于4张</p>
                      </el-upload>

                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>

                      <p class="footer_text">750*370 png. jpg格式</p>
                    </div>
                  </td>
                  <td class="zhuti-photo" style="height: auto;">
                    <label for style="margin-top:.2rem">商品详情</label>
                    <div class="activelyOne-photo">
                      <el-upload
                        action="string"
                        ref="uploadDetail"
                        list-type="picture-card"
                        :http-request="addAttachmentDetail"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemoveDetail"
                        :file-list="project.projectDetail"
                        :before-upload="beforeAvatarUpload"
                        accept="image/png, image/jpeg"
                        :multiple="true"
                        class="photo"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                      <p class="footer_text">750*370 png. jpg格式</p>
                    </div>
                  </td>
                </tr>
                  <button class="tijiao" @click="submitProject">确定</button>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="activelyOne-right">
        <div class="app-show">
          <div class="app-box">
            <div class="app-tit">
              <projectApp :project="project"/>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import projectApp from "./projectApp.vue";
// import conf from "../../config/index.js";
export default {
  name: "AddSeats",
  components: { projectApp },
  inject: ["reload"],
  props: {
    projectID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isLoading: false, //加载
      pickerOptions2: { shortcuts: [] },
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //上传图片文件
      project: {
        projectName: "", //商品名称
        newProjectPrice: "", //商品现价
        oldProjectPrice: "", //商品原价
        projectIntroduction: "", //商品介绍
        projectBanner: [], //商品banner图
        projectDetail: [], //商品详情图
        projectCategoryId: "", //分类ID
        projectPriorityId: "", //优先级ID
        projectStatus: "", //商品状态
        projectMainImg: "" //商品封面图
      },
      projectCategory: [], //分类列表
      projectPriority: [
        { id: 6, name: "A" },
        { id: 5, name: "B" },
        { id: 4, name: "C" },
        { id: 7, name: "推荐" },
        { id: 8, name: "新品" }
      ], //优先级列表
      projectStatusData: [{ id: "1", name: "现货" }, { id: "2", name: "期货" }], //商品状态数据
      file: "",
      projectStock: Number,
      projectMainImgList: []
    };
  },
  methods: {
    addAttachmentMain(params) {
      this.project.projectMainImg = params.file;
    },
    addAttachment(params) {
      this.baseImg(params.file, true);
    },
    addAttachmentDetail(params) {
      this.baseImg(params.file, false);
    },
    baseImg(files, flag) {
      let reader = new FileReader();
      let imgFile;
      reader.readAsDataURL(files);
      reader.onload = e => {
        imgFile = e.target.result;
        let arr = imgFile.split(",");
        let obj = {};
        obj.url = "data:image/jpeg;base64," + arr[1];
        obj.image = files;
        flag
          ? this.project.projectBanner.push(obj)
          : this.project.projectDetail.push(obj);
      };
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
    handleRemoveMain(file, fileList) {
      this.project.projectMainImg = "";
      this.projectMainImgList = []
    },
    handleRemoveBanner(file, fileList) {
      this.project.projectBanner = fileList;
      if (file.id) {
        this.isLoading = true;
        this.deleteProjectImg(file.id);
      }
    },
    deleteProjectImg(ID) {
      this.$http
        .delete(this.$conf.env.deleteProjectImg + ID)
        .then(res => {
          this.isLoading = false;
          if (res.status == "202") {
            this.$message({ message: "删除成功", type: "success" });
          }else{
            this.$message({ message: '删除失败', type: 'warning'});
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    handleRemoveDetail(file, fileList) {
      this.project.projectDetail = fileList;
      if (file.id) {
        this.isLoading = true;
        this.deleteProjectdetailImg(file.id);
      }
    },
     deleteProjectdetailImg(ID) {
    this.$http
      .delete(this.$conf.env.detectProjectDetailImg + ID)
      .then(res => {
        this.isLoading = false;
        if (res.status == "202") {
          this.$message({ message: "删除成功", type: "success" });
          // this.getProjectDetail()
        }else{
          this.$message({ message: '删除失败', type: 'warning'});
        }
      })
      .catch(err => {
        this.isLoading = false;
        this.$message.error("网络错误");
      });
  },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //点击添加分类
    editProjectClassifity() {
      this.$emit("editProjectClassifity");
    },
    /**@接口调用 */
    //获取分类列表

    getprojectCategory() {
      this.$http
        .get(this.$conf.env.getprojectCategory)
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            if (res.data && res.data.length > 0) {
              this.projectCategory = res.data;
              this.$bus.$emit("setProjectCategory", res.data);
            }
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },

    //获取商品详情
    getProjectDetail() {
      this.$http
        .get(this.$conf.env.getProjectDetail + this.projectID)
        .then(res => {
          this.isLoading = false;
          if (!res.data) return;
          this.project.projectName = res.data.name ? res.data.name : ""; //商品名称
          this.project.newProjectPrice = res.data.shop_price? res.data.shop_price : ""; //商品现价
          this.project.oldProjectPrice = res.data.old_price ? res.data.old_price: ""; //商品原价
          this.project.projectIntroduction = res.data.goods_desc? res.data.goods_desc: ""; //商品介绍
          if (res.data.good_images && res.data.good_images.length > 0) {
            res.data.good_images.forEach(element => {
              element.url = element.image;
            });
          }
          this.project.projectBanner = res.data.good_images? res.data.good_images : []; //商品banner图
          if (res.data.good_details && res.data.good_details.length > 0) {
            res.data.good_details.forEach(element => {
              element.url = element.image;
            });
          }
          this.project.projectDetail = res.data.good_details ? res.data.good_details : []; //商品详情图
          this.project.projectMainImg = res.data.front_image ? res.data.front_image : [];
          this.projectMainImgList = res.data.front_image ? [{ url: res.data.front_image, id:res.data.id }] : [];
          this.project.projectCategoryId = res.data.category ? res.data.category: ""; //分类ID
          this.project.projectStock = res.data.goods_num ? res.data.goods_num : 0
          this.project.projectPriorityId = res.data.priority ? res.data.priority : ""; //优先级ID
          this.project.projectStatus = res.data.status ? "1" : "2"; //商品状态
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    submitProject() {
      if (
        !this.project.projectName || //商品名称
        !this.project.newProjectPrice || //商品现价
        !this.project.oldProjectPrice || //商品原价
        !this.project.projectIntroduction || //商品介绍
        this.project.projectBanner.length == 0 || //商品banner图
        this.project.projectDetail.length == 0 || //商品详情图
        !this.project.projectCategoryId || //分类ID
        !this.project.projectPriorityId || //优先级ID
        !this.project.projectStatus || //商品状态
        !this.project.projectMainImg||
        !this.project.projectStock
      ) {
        this.$message({
          message: "请完善商品信息",
          type: "warning"
        });
      } else {
        if (this.project.projectBanner.length < 4) {
          this.$message({
            message: "商品照片不得少于四张",
            type: "warning"
          });
        } else{
          this.submitProjectUplude();
        }
      }
    },
    submitProjectUplude() {
      let formData = new FormData();
      var projectBanner = [];
      var projectDetail = [];
      this.project.projectBanner.forEach(element => {
        if (!element.id) {
          formData.append("good_image", element.image);
        }
      });
      this.project.projectDetail.forEach(element => {
        if (!element.id) {
          formData.append("good_detail", element.image);
        }
      });
      formData.append("category", this.project.projectCategoryId); //分类id
      formData.append("priority", this.project.projectPriorityId); //优先级 (4, 'C'), (5, 'B'), (6, 'A'), (7, '推荐'), (8, '新品')
      formData.append(
        "status",
        this.project.projectStatus == "1" ? true : false
      ); //True现货 Flase期货
      formData.append("name", this.project.projectName); //商品名称
      formData.append("shop_price", this.project.newProjectPrice); // 售价
      formData.append("old_price", this.project.oldProjectPrice); //原价
      formData.append("goods_desc", this.project.projectIntroduction); //商品介绍
      formData.append('goods_num', this.project.projectStock)//库存
      this.projectMainImgList.length > 0
        ? formData.append("front_image", "")
        : formData.append("front_image", this.project.projectMainImg);
      this.isLoading = true;
      this.projectID == -1
        ? this.addEstablishProject(formData)
        : this.editEstablishProject(formData);
    },
    addEstablishProject(formData) {
      this.$http
        .post(this.$conf.env.establishProject, formData, true)
        .then(res => {
          this.isLoading = false;
          if (res.status == "201") {
            this.$message({ message: "添加成功", type: "success" });
            this.reload();
          } else {
            this.$message.error("添加失败");
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    editEstablishProject(formData) {
      this.$http
        .put(
          this.$conf.env.establishProject + this.projectID + "/",
          formData,
          true
        )
        .then(res => {
          this.isLoading = false; 
          if (res.status == "200") {
            this.$message({ message: "修改成功", type: "success" });
            this.reload();
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    /**@文件超出个数限制 */
    onExceed() {
      this.$message.error("最多添加一张图片");
    }
  },
  mounted() {
    this.getprojectCategory();
    if (this.projectID != -1) {
      this.isLoading = true;
      this.getProjectDetail();
    }
    $(window).resize(function () {    
    let Width = $(".zhuyi").width()+ 15
      $(".zhuyi").css({
        right:-`${Width}`
      })
    });

    let Width = $(".zhuyi").width()+ 15
    $(".zhuyi").css({
      right:-`${Width}`
    })
  }
};
</script>

<style lang="scss">
 .selete_list{
    margin-top: .56rem !important;
  }
.addShop-box {
  overflow: hidden;
  .el-popper[x-placement^=bottom]{
    margin-top: .56rem !important;;
  }
  ::-webkit-scrollbar {
        display: none;
    }
  .el-upload-list__item-status-label {
    margin: 0 !important;
    line-height: initial;
  }
 
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  .tijiao {
    display: block;
    width: 1.71rem;
    height: .39rem;
    line-height: .39rem;
    background: rgba(127, 99, 244, 1);
    border-radius: 3px;
    left: 4.86rem;
    color: #fff;
    font-size: 0.18rem;
    margin: 0 auto .5rem;
    cursor: pointer
  }
  .activelyOne-right {
    position: absolute;
    top: 0.52rem;
    right: 0.45rem;
    .app-show {
      width: 5.25rem;
      height: 8.5rem;
      padding: 0.53rem 0.315rem 0.21rem 0.315rem;
      box-sizing: border-box;
      background: #d3d3d3;
      .app-box {
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: hidden;
        overflow-y: scroll;
        .app-tit {
          width: 100%;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
  }
  /*头部*/
  .view-box {
    width: 100%;
    height: 100%;
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

      .el-input__suffix {
        display: none;
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
            position: relative;
            tr {
              td {
                position: relative;
                //   height:.98rem;
                margin: 0.24rem 0;
                display: flex;
                align-items: center;
                .xiala {
                  width: 1.46rem;
                  height: 0.49rem;
                  padding: 0 0.2rem;
                  font-size: 0.15rem;
                  color: #999;
                }
                .addshop {
                  margin-left: 0.17rem;
                  margin-right: 0.95rem;
                  img {
                    width: 0.28rem;
                    height: 0.28rem;
                    display: block;
                    cursor: pointer;
                  }
                }
                .ji {
                  font-size: 0.14rem;
                  margin-left: 0.1rem;
                  margin-right: 0.22rem;
                }
                .xian {
                  margin-left: 0.64rem;
                }
                .el-radio__inner{
                  margin-top: .17rem;
                }
                label {
                  font-size: 0.18rem;
                  font-weight: bold;
                  color: rgba(70, 74, 83, 1);
                  margin-right: 0.08rem;
                  display: block;
                  // span {
                  //   height: 0.33rem;
                  //   line-height: 0.33rem;
                  //   width: 0.94rem;
                  //   border-radius: 17px;
                  //   padding: 0;
                  //   font-size: 0.16rem;
                  // }
                  .el-radio-button__orig-radio:checked
                    + .el-radio-button__inner {
                    background: #7f63f4;
                    border-color: #7f63f4;
                  }
                }
                div {
                  // height: 0.49rem;
                  input {
                    float: left;
                  }
                  input:checked {
                    background: #7f63f4;
                  }
                  .el-radio__label {
                    float: left;
                    line-height: 0.53rem;
                    font-size: .16rem;
                    padding-right: .1rem;
                  }
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
                .actively-site{
                  width: 3.12rem;
                }
                .actively-num, .actively-iphone{
                  width: 2.44rem;
                }
                .project_Introduction{
                  width: 5.6rem;
                }
                .project_Introduction_length{
                   font-size: .16rem;
                  color: #7f63f4;
                  position: absolute;
                  right: 0;
                  bottom: -.3rem;
                }
                input[type="number"] {
                  -moz-appearance: textfield;
                }
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                .daig-name {
                  width: 3.12rem;
                }
              }
              .input_lable>div{
                height: .5rem;
              }
              /*上传图片样式修改*/
              .zhuti-photo {
                margin-top: 0.5rem;
                position: relative;
               .activelyOne-photo {
                  position: relative;
                  height: 100%;
                  .photo{
                  li{
                    .el-upload-list__item-actions{
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      span+span{
                        margin-left: 8px;
                      }
                    }
                  }
                  }
                }
                label {
                  white-space: nowrap;
                  margin-top: 0;
                }
                p {
                  font-size: 0.12rem;
                  color: rgba(127, 99, 244, 1);
                }
                .zhuyi {
                  position: absolute;
                  right: -1.15rem;
                  top: 0;
                  white-space: nowrap;
                  line-height: 0.8rem !important;
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
    .el-carousel__indicators{
      display: flex;
    }
    .el-radio__inner:hover{
      background: #7f63f4 !important;
      border-color: #7f63f4  !important;
    }
    .el-radio__input.is-checked .el-radio__inner{
      background: #7f63f4 !important;
      border-color: #7f63f4  !important;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: #7f63f4;
    }
  /*表单*/
}
</style>
