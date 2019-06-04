<template>
  <div class="addbigbox" v-if="flag" v-loading.fullscreen.lock="isLoading">
    <div class="box"></div>
    <div class="model">
      <div class="header">
        <p>{{classifityTitle}}</p>
        <span @click="close()">
          <img src="../../assets/img/close.png" style="cursor: pointer;" alt srcset>
        </span>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <label for>分类名称</label>
              <input
                type="text"
                placeholder="填写分类名称"
                class="actively-site"
                v-model="activelyClassifityName"
              >
            </td>
            <td class="zhuti-photo" style="height: auto;">
              <label for style="margin-top:.2rem">选中图片</label>
              <div class="activelyOne-photo">
                <el-upload
                  action="string"
                  ref="upload"
                  list-type="picture-card"
                  :http-request="addAttachmentActive"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemoveActive"
                  :multiple="true"
                  :before-upload="beforeAvatarUpload"
                  accept="image/png, image/jpeg"
                  :limit="1"
                  :file-list='addAttachmentActiveImgList'
                  :on-exceed="onExceed"
                  class="photo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
                <p>750*370 png. jpg格式</p>
              </div>
            </td>
            <td class="zhuti-photo" style="height: auto;">
              <label for style="margin-top:.2rem">默认图片</label>
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
                  :limit="1"
                  :file-list='addAttachmentImgList'
                  :on-exceed="onExceed"
                  class="photo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
                <p>750*370 png. jpg格式</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="submit">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "bianji",
  inject: ["reload"],
  data() {
    return {
      flag: true,

      pickerOptions2: {
        shortcuts: []
      },
      value6: "",
      value7: "",
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //上传图片文件
      radioa: "2", //状态
      activelyClassifityName: "", //分类名称
      addAttachmentActiveImgList: [],
      addAttachmentActiveImg: "",
      addAttachmentImgList: [],
      addAttachmentImg: "",
      isLoading: false
    };
  },
  props: {
    bianjiflag: Boolean,
    classifityTitle: {
      type: String,
      required: true
    },
    ClassifityID: {
      type: Number,
      required: true
    }
  },
  methods: {
    addAttachmentActive(params) {
      this.addAttachmentActiveImg = params.file;
    },
    addAttachment(params) {
      this.addAttachmentImg = params.file;
    },
    handleRemoveActive() {
      this.addAttachmentActiveImgList = [];
      this.addAttachmentActiveImg = "";
    },
    handleRemove() {
      this.addAttachmentImg = "";
      this.addAttachmentImgList = [];
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    close() {
      this.flag = false;
      this.$emit("change", false);
    },
    /**@文件超出个数限制 */
    onExceed() {
      this.$message.error("最多添加一张图片");
    },
    submit() {
      if(!this.VerificationData()) return
      var params = new FormData();
      params.append("name", this.activelyClassifityName);
      this.addAttachmentActiveImgList.length>0 ? params.append("click_img", '') : params.append("click_img", this.addAttachmentActiveImg);
      this.addAttachmentImgList.length>0 ? params.append("img", '') :  params.append("img", this.addAttachmentImg);
      this.isLoading = true;
      this.ClassifityID != -1
        ? this.updataProjectCategory(params)
        : this.addProjectCategory(params);
    },
    VerificationData(){
      if(
        !this.activelyClassifityName ||
        !this.addAttachmentActiveImg || 
        !this.addAttachmentImg
      ){
         this.$message({ message: '请完善您的信息', type: 'warning'});
          return false
      }else{
        return true
      }
    },
    addProjectCategory(params) {
      this.$http
        .post(this.$conf.env.addProjectCategory, params, true)
        .then(res => {
          this.isLoading = false;
          if (res.status == "201") {
            this.close();
            this.$bus.$emit("getprojectCategoryclose", "data");
            this.$message({ message: "添加成功", type: "success" });
          }else{
            this.$message({ message: '添加失败', type: 'warning'});
          }
        })
        .catch(err => {
          this.isLoading = false;
           this.$message.error('网络错误');
        });
    },
    updataProjectCategory(params){
        this.$http
        .put(this.$conf.env.addProjectCategory +  this.ClassifityID +'/', params, true)
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            this.close();
            this.$bus.$emit("getprojectCategoryclose", "data");
            this.$message({ message: "修改成功", type: "success" });
          }else{
               this.$message({ message: '修改失败', type: 'warning'});
            }
        })
        .catch(err => {
          this.isLoading = false;
           this.$message.error('网络错误');
        });
    },
    getProjectCategory() {
      this.$http
        .get(this.$conf.env.addProjectCategory + this.ClassifityID + "/")
        .then(res => {
          this.isLoading = false;
          if (res.status == "200") {
            this.activelyClassifityName = res.data.name ? res.data.name : "";
            this.addAttachmentActiveImg = res.data.click_img
              ? res.data.click_img
              : "";
            this.addAttachmentActiveImgList = res.data.click_img
              ? [{ 'url': res.data.click_img }]
              : [];
            this.addAttachmentImg = res.data.img ? res.data.img : "";
            this.addAttachmentImgList = res.data.img
              ? [{ 'url': res.data.img }]
              : [];
          }
        })
        .catch(err => {
          this.isLoading = false;
           this.$message.error('网络错误');
        });
    }
  },
  mounted() {
    if (this.ClassifityID != -1) {
        this.isLoading = true;
      this.getProjectCategory();
    }
  }
};
</script>
<style lang="scss" >
.addbigbox {
  z-index: 13;
  position: fixed;
  width: 200%;
  height: 100%;
  left: -10rem;
  .el-upload-list__item-status-label{
      margin: 0 !important;
      line-height: initial;
    }
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
      background: rgba(159, 136, 255, 1)  ;
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
    button {
      width: 1.71rem;
       height: .39rem;
      line-height: .39rem;
      background: rgba(127, 99, 244, 1);
      border-radius: 3px;
      position: absolute;
      right: 0.82rem;
      bottom: 0.38rem;
      font-size: 0.18rem;
      text-align: center;
      color: #fff;
      line-height: 0.39rem;
      cursor: pointer
    }
    table {
      width: 100%;
      tr {
        .inp-none {
          .el-range-editor.el-input__inner {
            width: 3.6rem;
            height: 0.48rem;
            padding: 0;
          }
          .el-range-separator {
            line-height: 0.45rem;
          }
          input {
            border: 0;
            height: 0.45rem;
            font-size: 0.15rem;
            line-height: 0.48rem;
          }
          .el-date-editor .el-range__icon {
            display: none;
          }
        }
        .section-big {
          overflow: hidden;
          .section-left {
            float: left;
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 0.3rem;
            .actively-num {
              width: 1.29rem;
            }
          }
          .section-right {
            float: left;
            height: 100%;
            display: flex;
            align-items: center;
            .actively-iphone {
              width: 3.14rem;
            }
          }
        }
        td {
          display: flex;
          align-items: center;
          height: 0.84rem;
          padding-left: 0.22rem;
          input {
            height: 0.48rem;
            font-size: 0.15rem;
            color: rgba(153, 153, 153, 1);
            line-height: 0.48rem;
            text-indent: 0.19rem;
            border: 1px solid rgba(221, 223, 225, 1);
            border-radius: 3px;
          }
          label {
            font-size: 0.18rem;
            font-weight: bold;
            color: rgba(70, 74, 83, 1);
            margin-right: 0.08rem;
          }
          .activelyOne-startTime {
            width: 3.12rem;
          }
          .actively-site {
            width: 3.12rem;
          }
        }

        /*上传图片样式修改*/
        .zhuti-photo {
          margin-top: 0.3rem;
          position: relative;
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
            left: 1.64rem;
            top: 0.52rem;
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
</style>

