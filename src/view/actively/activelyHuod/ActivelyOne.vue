<template>
  <div class="Actively" v-loading.fullscreen.lock="isLoading">
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label>活动名称</label>
              <input type="text" placeholder="填写活动名称" class="activelyOne-startTime" v-model="actively.activelyName">
            </td>
            <td class="inp-none">
              <label for="">活动时间范围</label>
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
                >
              </el-date-picker>
            </td>
            <td>
              <label for="">活动地址</label>
              <input type="text" placeholder="填写活动地址" class="actively-site" v-model="actively.activelyCity">
            </td>
            <td class="section-big">
              <div class="section-left">
                <label for="">活动人数</label>
                <input type="number" placeholder="填写活动人数" class="actively-num" v-model="actively.activelyPeopleNumber">
              </div>
              <div class="section-right">
                <label for="">负责人号码</label>
                <input type="text" placeholder="填写联系方式" class="actively-iphone" v-model="actively.activelyLinkPhone">
              </div>
            </td>

            <td class="zhuti-photo" style="height: auto;">
              <label for="" style="margin-top:.2rem">主题照片</label>
              <div class="activelyOne-photo">
                <el-upload

                  action="https://jsonplaceholder.typicode.com/posts/"
                  ref="upload"
                  list-type="picture-card"
                  :http-request="addAttachment"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :multiple="true"
                  :before-upload="beforeAvatarUpload"
                  accept="image/png, image/jpeg"
                  :limit = 1
                  :on-exceed = 'onExceed'
                  :file-list='activelyMainImgList'
                  class="photo"
                >
                  <i class="el-icon-plus" v-show="!actively.activelyMainImg"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" >
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <p>750*370 png. jpg格式</p>
              </div>
            </td>
            <td class="zhuti-photo" style="height: auto;">
              <label for="" style="margin-top:.2rem">活动海报</label>
              <div class="activelyOne-photo">
                <el-upload
                  action="string"
                  ref="upload"
                  list-type="picture-card"
                  :http-request="addAttachmentPoster"
                  :before-upload="beforeAvatarUpload"
                  accept="image/png, image/jpeg"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :multiple="true"
                  :file-list='actively.activelyPosterImg'
                  class="photo"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <p>750*370 png. jpg格式</p>
              </div>
            </td>
            <button class="tijiao" @click="submit">确定</button>
          </tr>
        </tbody>
      </table>
    </div>
      <div class="activelyOne-right">
        <div class="activelyOne_app-show">
          <div class="activelyOne_app-box">
            <div class="activelyOne_app-tit">
              <ActivelyOneApp :actively='actively'/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ActivelyOneApp from '../activelyApp/ActivelyOneApp.vue'
    export default {
        name: "ActivelyOne",
        components:{ActivelyOneApp},
        props:{
          activelyId:{
            type: Number,
            required: true
          }
        },
        inject:['reload'],
      data(){
          return{
            pickerOptions2: {
              shortcuts: []
            },
            value6: '',
            value7: '',
            dialogImageUrl: '',
            dialogVisible: false,
            img_list:[],    //上传图片文件
            actively:{
              activelyName: '',//活动名称
              activelyTime: '',//活动时间范围
              activelyCity: '',//活动地址
              activelyPeopleNumber: '' ,//活动人数
              activelyLinkPhone: '',//联系人手机号
              activelyPosterImg: [],//活动海报
              activelyMainImg: '',//活动主图
              activelyOldTime: '结束时间',//活动结束时间
              activelyNewTime: '开始时间',//活动开始时间
            },
            isLoading: false,//加载
            activelyMainImgList:[]
          }
      },

      methods: {
        /**@图片添加 */

        //添加主题照片
        addAttachment (params) {
          this.baseImg(params.file, false)

        },

        //添加海报照片
        addAttachmentPoster(params){
           this.baseImg(params.file, true)
        },


         /**@图片格式转换 */
         //图片转换Base64格式
        baseImg(files, flag){
          let reader = new FileReader();
          let imgFile
          reader.readAsDataURL(files)
          reader.onload = e => {
              imgFile = e.target.result;
              let arr = imgFile.split(',')
              let obj = {}
              obj.url ='data:image/jpeg;base64,'+arr[1];
              obj.image = files
              flag ? this.actively.activelyPosterImg.push(obj): this.actively.activelyMainImg = files
          }
        },

         /**@删除图片 */

        //删除主题照片
        handleRemove(){
          this.actively.activelyMainImg = ''
        },

        //删除Poster照片
        handleRemovePoster(file, fileList) {
          this.actively.activelyPosterImg = fileList
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
        /**@图片预览 */
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },

        /**@文件超出个数限制 */
        onExceed(){
           this.$message.error('最多添加一张图片');
        },
        /**@活动详情1加载 */
        getActivelyDetail(){
          this.$http.get(this.$conf.env.getActivelyOneDetail + this.activelyId).then(res =>{
            this.isLoading = false
            if(res.status == '200'){
              if(!res.data) return
                this.actively.activelyName = res.data.name ? res.data.name :'',//活动名称
                this.actively.activelyNewTime = res.data.start_time ? res.data.start_time.split('T')[0] : ''; //活动开始时间
                this.actively.activelyOldTime = res.data.end_time ? res.data.end_time.split('T')[0] : ''; //活动结束时间
                this.actively.activelyTime = [this.actively.activelyNewTime, this.actively.activelyOldTime];//活动时间范围
                this.actively.activelyCity = res.data.activity ? res.data.activity : '';//活动地址
                this.actively.activelyPeopleNumber = res.data.goods_num ? res.data.goods_num : 0;//活动人数
                this.actively.activelyLinkPhone = res.data.principal_telephone ? res.data.principal_telephone : '';//联系人手机号
                if(res.data.good_details &&res.data.good_details.length>0){
                  res.data.good_details.forEach(element =>{
                    element.url = element.image
                  })
                }
                this.actively.activelyPosterImg =  res.data.good_details ? res.data.good_details : [];//活动海报
                this.actively.activelyMainImg = res.data.front_image ? res.data.front_image : ''
                this.activelyMainImgList = res.data.front_image ? [{'url': res.data.front_image}]  : []; //活动主图
            }
          }).catch( err =>{
            this.isLoading = false
            this.$message.error('网络错误');
          })
        },

        /**@活动一信息 */

        submit(){
          if(!this.VerificationData()) return
          var params = new FormData()
           this.actively.activelyPosterImg.forEach( element =>{
             if(!element.id){
                params.append('good_details', element.image);
             }
           })
          this.activelyMainImgList.length>0 ? params.append('front_image', '') : params.append('front_image', this.actively.activelyMainImg)
          params.append('name', this.actively.activelyName)
          params.append('start_time', this.actively.activelyNewTime + 'T00:00')
          params.append('end_time', this.actively.activelyOldTime + 'T00:00')
          params.append('activity', this.actively.activelyCity)
          params.append('goods_num', this.actively.activelyPeopleNumber)
          params.append('principal_telephone', this.actively.activelyLinkPhone)
          this.isLoading = true
          this.activelyId == -1 ? this.AddtoActivelyOneData(params) : this.UpdataActivelyOneData(params)
        },

        //数据校验
        VerificationData(){
          if(
            !this.actively.activelyName ||
            !this.actively.activelyNewTime ||
            !this.actively.activelyOldTime ||
            !this.actively.activelyCity ||
            !this.actively.activelyPeopleNumber ||
            !this.actively.activelyLinkPhone ||
            !this.actively.activelyMainImg ||
            this.actively.activelyPosterImg.length == 0
          ) {
            this.$message({ message: '请完善您的信息', type: 'warning'});
            return false
          }else{
            var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
            if (!myreg.test(this.actively.activelyLinkPhone)) {
                this.$message({ message: '请填写正确的手机号', type: 'warning'});
                return false
            }else{
              return true
            }
          }
        },
        //活动一提交
        AddtoActivelyOneData(params){
          this.$http.post(this.$conf.env.setActivelyDetailOneData, params, true).then( res =>{
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

        //活动一修改
        UpdataActivelyOneData(params){
          this.$http.put(this.$conf.env.setActivelyDetailOneData + this.activelyId + '/', params, true).then(res =>{
             this.isLoading = false
            if(res.status == '201'){
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
      mounted (){
        if(this.activelyId != -1){
          this.isLoading = true
          this.getActivelyDetail()
        }
      },
      watch:{
        'actively.activelyTime'(newData,oldData){
          this.actively.activelyNewTime = newData[0]
          this.actively.activelyOldTime = newData[1]
        }
      }
    }
</script>

<style lang="scss">
  .el-icon-error{
    font-size: 20px !important;
  }
  .el-message-error{
    min-width: 1rem !important;
  }
  .activelyOne-box{
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    width: 100%;
    height:100%;
    overflow: hidden;
    position: relative;
    .tijiao{
      display: block;
      width: 1.71rem;
      height: .39rem;
      background:rgba(127,99,244,1);
      border-radius:3px;
      margin: 0 auto .5rem;
      color: #fff;
      font-size: .18rem;
      cursor: pointer
    }
    .activelyOne-left{
        width: 9.5rem;
        height:100%;
        margin-left: .22rem;
      float: left;
      .tit-but{
        width:100%;
        overflow: hidden;
        padding:.48rem 0;
        a{
          width:.94rem;
          height:.33rem;
          background:rgba(255,255,255,1);
          box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
          border-radius:17px;
          font-size:.16rem;
          color:rgba(70,74,83,1);
          line-height:.33rem;
          text-align: center;
          float: left;
          margin-right: .32rem;
        }
        .active{
          background: #7F63F4;
          color:#fff;
        }
      }
      table{
        width: 100%;
        tr{
          display: block;
          margin-bottom: .5rem;
          .inp-none{
            .el-range-editor.el-input__inner{
              width: 3.6rem;
              height:.48rem;
              padding:0;
            }
            .el-range-separator{
              line-height: .45rem;
            }
            input{
              border: 0;
              height:.45rem;
              font-size: .15rem;
              line-height: .48rem;
            }
            .el-date-editor .el-range__icon{
              display: none;
            }
          }
          .section-big{
            overflow: hidden;
            .section-left{
              float: left;
              height:100%;
              display: flex;
              align-items: center;
              margin-right: .3rem;
              .actively-num{
                width: 1.29rem;
              }
            }
            .section-right{
              float: left;
              height:100%;
              display: flex;
              align-items: center;
              .actively-iphone{
                width: 3.14rem;
              }
            }
          }
          td{
            display: flex;
            align-items: center;
            height:.84rem;
            input{
              height:.48rem;
              font-size:.15rem;
              color:rgba(153,153,153,1);
              line-height:.48rem;
              text-indent: .19rem;
              border:1px solid rgba(221, 223, 225, 1);
              border-radius: 3px;
            }
            label{
              font-size:.18rem;
              font-weight:bold;
              color:rgba(70,74,83,1);
              margin-right:.08rem;
            }
            .activelyOne-startTime{
              width: 3.12rem;
            }
            .actively-site{
              width: 3.12rem;
            }
          }

          /*上传图片样式修改*/
          .zhuti-photo{
            margin-top: .3rem;
            label{
              white-space: nowrap;
              margin-top: 0;
            }
            p{
              font-size:.12rem;
              color:rgba(127,99,244,1);
            }
            .photo{
              height: auto;
              display: flex;
              flex-wrap: wrap;
            }
            .el-upload--picture-card{
              width: .8rem;
              height: .8rem;
              position: relative;
              background: url("../../../assets/img/addphoto.png") no-repeat;
              background-size: cover;
              border:0;
              i{
                /*position: absolute;*/
                /*left: 0.26rem;*/
                /*top: .25rem;*/
                display: none;
              }
            }
            ul{
              display: flex;
              flex-wrap: wrap;
              li{
                width: .8rem;
                height: .8rem;
              }
            }
          }
        }
      }
    }
    .el-carousel__indicators{
      display: flex;
    }
  }

</style>
