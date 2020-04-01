<template>
  <div class="Actively" v-loading.fullscreen.lock="isLoading">
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label>活动名称</label>
              <input
                type="text"
                placeholder="填写活动名称"
                class="activelyOne-startTime"
                v-model="actively.activelyName"
              >
              <label for style="margin-left: .53rem">状态</label>
              <el-radio
                v-model="actively.activelyPriorityId"
                :label="item.id"
                v-for="item in activelyPriority"
                :key="item.id"
              >{{item.name}}</el-radio>
            </td>
            <td class="inp-none">
              <label for>活动时间范围</label>
              <el-date-picker
                v-model="actively.activelyTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                :start-placeholder="actively.activelyNewTime"
                :end-placeholder="actively.activelyOldTime"
                :picker-options="pickerOptions2"
                
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </td>
            <td>
              <label for>活动地址</label>
              <input
                type="text"
                placeholder="填写活动地址"
                class="actively-site"
                v-model="actively.activelyCity"
              >
            </td>
            <td class="section-big">
              <div class="section-left">
                <label for>价格</label>
                <input
                  type="number"
                  placeholder="填写价格"
                  class="actively-num"
                  v-model="actively.activelyNewPrice"
                >
              </div>
              <div class="section-right">
                <label for>原价</label>
                <input
                  type="number"
                  placeholder="填写原价"
                  class="actively-iphone"
                  v-model="actively.activelyOldPrice"
                >
              </div>
            </td>
            <td>
              <label for>商品介绍</label>
              <input
                type="text"
                placeholder="填写商品介绍"
                class="actively-site"
                v-model="actively.activelyIntrouction"
              >
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
                  :limit = 1
                  :on-exceed = 'onExceed'
                  :file-list='activelyBannerList'
                  class="photo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
                <p>375*185 png. jpg格式</p>
              </div>
            </td>
            <td class="zhuti-photo" style="height: auto;margin-top:.5rem;">
              <label for style="margin-top:.2rem">商品照片</label>
              <div class="activelyOne-photo">
                <el-upload
                  action="string"
                  ref="upload"
                  list-type="picture-card"
                  :http-request="addAttachmentProject"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemoveProject"
                  :before-upload="beforeAvatarUpload"
                  accept="image/png, image/jpeg"
                  :multiple="true"
                  :file-list='actively.activelyProjectImg'
                  class="photo"
                >
                 <p class="zhuyi">注：不得少于4张</p>
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
               
                <p class="imgNotes">375*375 png. jpg格式</p>
              </div>
            </td>
            <td class="zhuti-photo" style="height: auto;">
              <label for style="margin-top:.2rem">活动海报</label>
              <div class="activelyOne-photo">
                <el-upload
                  action="string"
                  ref="upload"
                  list-type="picture-card"
                  :http-request="addAttachmentposter"
                  :on-preview="handlePictureCardPreview"
                  :before-upload="beforeAvatarUpload"
                  accept="image/png, image/jpeg"
                  :on-remove="handleRemovePoster"
                  :multiple="true"
                  :file-list='actively.activelyPosterImg'
                  class="photo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
                <p>宽375 png. jpg格式</p>
              </div>
            </td>
          </tr>
          <button class="tijiao" @click="submit">确定</button>
        </tbody>
      </table>
    </div>
    <div class="activelyOne-right">
      <div class="activelyOne_app-show">
        <div class="activelyOne_app-box">
          <div class="activelyOne_app-tit">
            <ActivelyTwoApp :actively="actively"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActivelyTwoApp from "../activelyApp/ActivelyTwoApp.vue";
export default {
  name: "ActivelyTwo",
  components: { ActivelyTwoApp },
  props:{
    activelyId:{
      type: Number,
      required: true
    }
  },
  inject: ["reload"],
  data() {
    return {
      pickerOptions2: {
        shortcuts: []
      },
      value6: "",
      value7: "",
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //上传图片文件
      radioa: "2", //状态
      actively: {
        activelyName: "", //活动名称
        activelyPriorityId: "", //活动状态
        activelyTime: "", //活动时间
        activelyCity: "", //活动地址
        activelyNewPrice: "", //活动现价
        activelyOldPrice: "", //活动原价
        activelyIntrouction: "", //活动介绍
        activelyBanner: '', //活动主图
        activelyProjectImg: [], //活动商品图
        activelyPosterImg: [], //活动海报
        activelyNewTime: '开始时间',//开始时间
        activelyOldTime: '结束时间',//结束时间
      },
      isLoading: false,//加载
      activelyPriority: [{ id: "1", name: "现货" }, { id: "2", name: "期货" }], //活动状态呢json数据
      activelyBannerList:[]
    };
  },
  methods: {
    /**@图片添加 */
    //添加主题照片
    addAttachment(params){
      this.actively.activelyBanner = params.file
    },

    //添加商品照片
    addAttachmentProject(params) {
      this.baseImg(params.file, "2");
    },

    //添加海报照片
    addAttachmentposter(params) {
      this.baseImg(params.file, "3");
    },

    /**@图片格式转换 */

    //图片转换Base64格式
    baseImg(files, flag) {
      let reader = new FileReader();
      let imgFile;
      reader.readAsDataURL(files);
      reader.onload = e => {
        imgFile = e.target.result;
        let arr = imgFile.split(",");
        let obj = {
          'url': "data:image/jpeg;base64," + arr[1],
          'image': files
        };
        switch (flag) {
          case "2":
            this.actively.activelyProjectImg.push(obj);
            break;
          case "3":
            this.actively.activelyPosterImg.push(obj);
        }
      };
    },


    /**@删除图片 */
    //删除主题照片
    handleRemove(file, fileList) {
      this.actively.activelyBanner = ''
      this.activelyBannerList=[]
    },

    //删除商品照片
    handleRemoveProject(file, fileList){
      this.actively.activelyProjectImg = fileList
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
    //删除海报照片
    handleRemovePoster(file, fileList){
      this.actively.activelyPosterImg = fileList
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

    /**@图片预览 */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    /**@文件超出个数限制 */
    onExceed(){
        this.$message.error('最多添加一张图片');
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
    //删除海报照片
    
    /**@获取活动二详情 */
    getActivelyDetail(){
      this.$http.get(this.$conf.env.getActivelyTwoDetail + this.activelyId).then(res =>{
        this.isLoading = false
          if(res.status == '200'){
            if(!res.data) return
              this.actively.activelyName = res.data.name ? res.data.name : ""; //活动名称
              this.actively.activelyPriorityId = res.data.status ? '1' : '2'; //活动状态
              this.actively.activelyNewTime = res.data.start_time ? res.data.start_time.split(' ')[0] : ''; //活动开始时间
              this.actively.activelyOldTime = res.data.end_time ? res.data.end_time.split(' ')[0] : ''; //活动结束时间
              this.actively.activelyTime = [this.actively.activelyNewTime, this.actively.activelyOldTime];//活动时间
              this.actively.activelyCity = res.data.activity ? res.data.activity : ''; //活动地址
              this.actively.activelyNewPrice = res.data.shop_price ? res.data.shop_price : '' ; //活动现价
              this.actively.activelyOldPrice = res.data.old_price ? res.data.old_price : ""; //活动原价
              this.actively.activelyIntrouction = res.data.goods_desc ? res.data.goods_desc : ""; //活动介绍
              this.actively.activelyBanner = res.data.front_image ? res.data.front_image :  ''; //活动主图
              this.activelyBannerList = res.data.front_image ? [{'url': res.data.front_image, 'id': res.data.id}]  : []; //活动主图
              if(res.data.good_images &&res.data.good_images.length>0){
              res.data.good_images.forEach(element =>{
                element.url = element.image
              })
              }
              this.actively.activelyProjectImg = res.data.good_images ? res.data.good_images : []; //活动商品图
              if(res.data.good_details &&res.data.good_details.length>0){
              res.data.good_details.forEach(element =>{
                element.url = element.image
              })
              this.actively.activelyPosterImg =  res.data.good_details ? res.data.good_details : []; //活动海报
            }
          }
      }).catch( err =>{
        this.isLoading = false
        this.$message.error('网络错误');
      })
    },

     /**@活动二信息 */
     submit(){
        if(!this.VerificationData()) return
        var params = new FormData()
         this.actively.activelyProjectImg.forEach(element =>{
           if(!element.id){
            params.append('good_image', element.image);
           }
         })
        this.actively.activelyPosterImg.forEach(element =>{
          if(!element.id){
           params.append('good_detail', element.image);
          }
         })
        params.append("name", this.actively.activelyName)
        params.append("start_time", this.actively.activelyNewTime + 'T00:00')//开始时间
        params.append("end_time", this.actively.activelyOldTime + 'T00:00') //结束时间
        params.append("activity", this.actively.activelyCity)
        params.append( "status", this.actively.activelyPriorityId == '1' ? true : false)
        params.append("shop_price", this.actively.activelyNewPrice)
        params.append("old_price", this.actively.activelyOldPrice)
        params.append("goods_desc", this.actively.activelyIntrouction)
        this.activelyBannerList.length>0 ? params.append("front_image", '') : params.append("front_image", this.actively.activelyBanner)
        this.isLoading = true
        this.activelyId == -1 ? this.AddtoActivelyTwoData(params) : this.UpdataActivelyTwoData(params)
     },

     //数据校验
     VerificationData(){
       if(
        !this.actively.activelyName|| //活动名称
        !this.actively.activelyPriorityId || //活动状态
        !this.actively.activelyTime || //活动时间
        !this.actively.activelyCity ||//活动地址
        !this.actively.activelyNewPrice || //活动现价
        !this.actively.activelyOldPrice ||//活动原价
        !this.actively.activelyIntrouction || //活动介绍
        !this.actively.activelyBanner || //活动主图
        !this.actively.activelyNewTime ||//开始时间
        !this.actively.activelyOldTime || //结束时间
        this.actively.activelyProjectImg.length == 0 || //活动商品图
        this.actively.activelyPosterImg.length == 0//活动海报
       ){
          this.$message({ message: '请完善您的信息', type: 'warning'});
          return false
       }else{
         if (this.actively.activelyProjectImg.length < 4) {
            this.$message({
              message: "商品照片不得少于四张",
              type: "warning"
            });
            return false
          } else if(this.actively.activelyOldPrice <0.01 || this.actively.activelyOldPrice == 0.01 || this.actively.activelyNewPrice < 0.01 || this.actively.activelyNewPrice == 0.01){
           this.$message({
            message: "价格不得低于0.02",
              type: "warning"
            });
          }else if(this.actively.activelyOldPrice.toString().split(".")[1] && this.actively.activelyOldPrice.toString().split(".")[1].length>2 || this.actively.activelyNewPrice.toString().split(".")[1] && this.actively.activelyNewPrice.toString().split(".")[1].length>2){
            this.$message({
              message: "请确保总计不超过 2 个小数位",
              type: "warning"
            });
          }else{
            return true
          }
        
       }
     },

     //添加活动二
     AddtoActivelyTwoData(params){
        this.$http.post(this.$conf.env.setActivelyDetailTwoData, params).then( res =>{
            this.isLoading = false
            if(res.status == '201'){
              this.$message({  message: '添加成功', type: 'success'});
              this.reload()
            }else{
               this.$message({ message: '添加失败', type: 'warning'});
            }
          }).catch( err =>{
             this.isLoading = false
            this.$message.error('网络错误');
          })
     },

     //修改活动二
     UpdataActivelyTwoData(params){
       this.$http.put(this.$conf.env.setActivelyDetailTwoData + this.activelyId + '/', params).then(res =>{
             this.isLoading = false
            if(res.status == '200'){
                this.$message({ message: '修改成功', type: 'success'});
                this.reload()
            }else{
               this.$message({ message: '修改失败', type: 'warning'});
            }
          }).catch( err =>{
             this.isLoading = false
            this.$message.error('网络错误');
          })
     }
  },
  mounted(){
    if(this.activelyId != -1){
       this.isLoading = true
      this.getActivelyDetail()
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
  },
   watch:{
    'actively.activelyTime'(newData,oldData){
      this.actively.activelyNewTime = newData[0]
      this.actively.activelyOldTime = newData[1]
    }
  }
};
</script>

<style lang="scss">
.Actively {
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  .tijiao {
    display: block;
    width: 1.71rem;
     height: .39rem;
      line-height: .39rem;
    background: rgba(127, 99, 244, 1);
    border-radius: 3px;
    margin: 0 auto .5rem;
    margin-bottom: 1rem;
    color: #fff;
    font-size: 0.18rem;
    cursor: pointer
  }

  .tit-but {
    width: 100%;
    overflow: hidden;
    padding: 0.48rem 0;
    a {
      width: 0.94rem;
      height: 0.33rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 7px 0px rgba(6, 33, 88, 0.3);
      border-radius: 17px;
      font-size: 0.16rem;
      color: rgba(70, 74, 83, 1);
      line-height: 0.33rem;
      text-align: center;
      float: left;
      margin-right: 0.32rem;
    }
    .active {
      background: #7f63f4;
      color: #fff;
    }
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
          background: url("../../../assets/img/addphoto.png") no-repeat;
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
  .activelyOne-photo {
    position: relative;
  }
}
</style>
