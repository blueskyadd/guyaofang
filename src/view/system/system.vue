<template>
  <div class="system-box"  v-loading.fullscreen.lock="isLoading">
    <headerTitle/>
    <el-main>
      <div class="view-box">
        <div class="addshopp-box">
          <div class="addshopp-void">
            <div class="addshopp-tit">
              <p>
                <span>系统管理</span>
              </p>
            </div>
            <table>
              <tbody>
              <tr>
                <td class="zhuti-photo" style="height: auto;">
                  <div class="words" style="overflow: hidden">
                    <label for="" style="float: left;">首页banner</label>
                  </div>
                  <div class="activelyOne-photo">
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachmentBanner"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemoveBanner"
                      :multiple="true"
                      :file-list="systemBannerList"
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
                <td class="zhuti-photo" style="height: auto;">
                  <div class="words" style="overflow: hidden">
                    <label for="" style="float: left;">logo</label>
                  </div>
                  <div class="activelyOne-photo">
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachmentLogo"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemoveLogo"
                      :file-list='systemLogoList'
                      :multiple="true"
                      :limit = 1
                      :on-exceed = 'onExceed'
                      class="photo"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>150*54 png. jpg格式</p>
                  </div>
                </td>
                <td class="zhuti-photo" style="height: auto;">
                  <div class="words" style="overflow: hidden">
                    <label for="" style="float: left;">活动底图</label>
                  </div>
                  <div class="activelyOne-photo">
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachmentActivity"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemoveActively"
                      :file-list='systerActivelyList'
                      :limit = 1
                      :on-exceed = 'onExceed'
                      :multiple="true"
                      class="photo"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>230*124 png. jpg格式</p>
                  </div>
                </td>
                <td class="zhuti-photo" style="height: auto;">
                  <div class="words" style="overflow: hidden">
                    <label for="" style="float: left;">推荐底图</label>
                  </div>
                  <div class="activelyOne-photo">
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachmentRecommend"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemoveRecommend"
                      :file-list='systemRecommendList'
                      :limit = 1
                      :on-exceed = 'onExceed'
                      :multiple="true"
                      class="photo"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>230*124 png. jpg格式</p>
                  </div>
                </td>
                <td class="zhuti-photo" style="height: auto;">
                  <div class="words" style="overflow: hidden">
                    <label for="" style="float: left;">席位底图</label>
                  </div>
                  <div class="activelyOne-photo">
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachmentSeat"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemoveSeat"
                      :file-list= 'systemSeatList'
                      :limit = 1
                      :on-exceed = 'onExceed'
                      :multiple="true"
                      class="photo"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>230*124 png. jpg格式</p>
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
import headerTitle from "../../components/header/header"
    export default {
        name: "system",
      inject:['reload'],
      components:{headerTitle},
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          img_list:[],    //上传图片文件
          systemBannerList:[],//banner
          systemLogoList: [],//logo
          systemLogo: '',
          systerActivelyList: [],//活动底图
          systerActively: '',
          systemRecommendList: [],//推荐底图
          systemRecommend: '',
          systemSeatList: [],//推荐席位
          systemSeat: '',
          isLoading: true ,
          SystemID: '',
          // formData: new FormData()
        }
      },
      methods: {
        /**@图片添加 */

        //首页banner
        addAttachmentBanner(params, file, fileList) {
          this.baseImg(params.file)
        },
        //添加logo
        addAttachmentLogo(params){
          this.systemLogo = params.file
        },

        //添加活动底图
        addAttachmentActivity(params){
          this.systerActively= params.file
        },

        //添加推荐底图
        addAttachmentRecommend(params){
          this.systemRecommend = params.file
        },

        //添加席位
        addAttachmentSeat(params){
          this.systemSeat = params.file
        },


        /**@图片格式转换 */
        //图片转换Base64格式
        baseImg(files) {

          let reader = new FileReader();
          let imgFile;
          reader.readAsDataURL(files);
          reader.onload = e => {
            imgFile = e.target.result;
            let arr = imgFile.split(",");
            let obj = {};
            obj.url = "data:image/jpeg;base64," + arr[1];
            obj.image = files;
            var arrey = []
           this.systemBannerList.push(obj)
          //  return arrey
          };
        },
        
        /**@图片删除 */

        //banner删除
        handleRemoveBanner(file, fileList) {
          if(file.id){
            this.isLoading = true
            this.systemBannerList = fileList
            this.deleteSystemBannerimage(file.id)
          }else{
            this.systemBannerList = fileList
            this.$message({  message: '删除成功', type: 'success'});
          }
        },
        //接口删除
        deleteSystemBannerimage(ID){
          this.$http.delete(this.$conf.env.deleteSystemBannerimage + ID).then( res =>{
            this.isLoading = false
            if(res.status == '200'){
              this.$message({  message: '删除成功', type: 'success'});
              this.getSystemData()
            }
          }).catch( err =>{
            this.isLoading = false
            this.$message.error('网络错误');
          })
        },

        //删除logo
        handleRemoveLogo(file, fileList){
          this.systemLogo = ''
          this.systemLogoList = []
          this.$message({  message: '删除成功', type: 'success'});
        },

        //删除活动底图
        handleRemoveActively(){
          this.systerActivelyList = []
          this.systerActively = ''
          this.$message({  message: '删除成功', type: 'success'});

        },
        //删除推荐底图
        handleRemoveRecommend(){
          this.systemRecommendList = []
          this.systemRecommend = ''
          this.$message({  message: '删除成功', type: 'success'});
        },
        //删除席位底图
        handleRemoveSeat(){
          this.systemSeatList = []
          this.systemSeat = ''
          this.$message({  message: '删除成功', type: 'success'});
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

        //创建系统管理
        submit(){
          if(!this.VerificationData()) return
          var formData = new FormData()
          this.systemLogo.type ? formData.append('logo', this.systemLogo) : formData.append('logo', '')
          this.systerActively.type ? formData.append('activity_img', this.systerActively) : formData.append('activity_img', '')
          this.systemRecommend.type ? formData.append('recommend_img', this.systemRecommend) : formData.append('recommend_img', '')
          this.systemSeat.type ? formData.append('seat_img', this.systemSeat) : formData.append('seat_img', '')

          this.systemBannerList.forEach( Element =>{
            if(!Element.id){
               formData.append('sys_images', Element.image)
            }
          })
          this.isLoading = true
          this.SystemID ? this.upDataSetSystemData(formData) : this.addsetSystemData(formData) 
          
        },
        
        addsetSystemData(formData){
          this.$http.post(this.$conf.env.setSystemData, formData, true).then( res =>{
            this.isLoading = false
            if(res.status == '201'){
              this.$message({  message: '添加成功', type: 'success'});
              this.reload()
            }
          }).catch( err =>{
            this.isLoading = false
            this.$message.error('网络错误');
          })
        },

        upDataSetSystemData(formData){
          this.$http.put(this.$conf.env.setSystemData + this.SystemID + '/', formData, true).then( res =>{
            this.isLoading = false
            if(res.status == '200'){
              this.$message({  message: '修改成功', type: 'success'});
              this.reload()
            }
          }).catch( err =>{
            this.isLoading = false
            this.$message.error('网络错误');
          })
        },

        //数据校验
        VerificationData(){
          if(
              !this.systemLogo ||  
              !this.systerActively || 
              !this.systemRecommend || 
              !this.systemSeat || 
              this.systemBannerList.length == 0 
          ){
              this.$message({ message: '请完善您的信息', type: 'warning'});
              return false
          }else{
            
              return true
          }
        },
        
        
        //获取系统详情
        getSystemData(){
          this.$http.get(this.$conf.env.getSystemData).then(res =>{
           this.isLoading = false
            if(res.status == '200'){
              if(!res.data) return
              if(res.data.id){this.SystemID = res.data.id}
               this.systemLogo = res.data.logo ? res.data.logo:''
              this.systemLogoList = res.data.logo ? [{'url': res.data.logo}] : []
              this.systerActively =  res.data.activity_img ?  res.data.activity_img : ''
              this.systerActivelyList = res.data.activity_img ? [{'url': res.data.activity_img}] : []
              this.systemRecommend = res.data.recommend_img ? res.data.recommend_img : ''
              this.systemRecommendList = res.data.recommend_img ? [{'url':res.data.recommend_img}]: []
              this.systemSeat = res.data.seat_img ? res.data.seat_img : ''
              this.systemSeatList = res.data.seat_img ? [{'url': res.data.seat_img}]: []
               if(res.data.sys_images &&res.data.sys_images.length>0){
                res.data.sys_images.forEach(element =>{
                  element.url = element.image
                })
              }
              this.systemBannerList = res.data.sys_images ? res.data.sys_images: []
            }
          }).catch( err =>{
            this.isLoading = false
            this.$message.error('网络错误');
          })
        },
        
        

      },
      mounted(){
        this.getSystemData()
      }
    }
</script>


<style lang="scss" >

  .system-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
    .el-date-editor{
    margin: 0 !important;
      }
      .el-date-editor{
          height:auto !important;
      }
      .el-upload-list__item-status-label{
            margin: 0 !important;
            line-height: initial;
    }

    /*头部*/
    .view-box{
      width: 100%;
      height:100%;
      background: #fff;
      box-shadow:0px 3px 10px 0px rgba(119,119,119,0.1);
      border-radius:3px;
      .addshopp-box{
        width: 100%;
        height:100%;
        padding:.28rem;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        .el-button{
          position: absolute;
          right: .67rem;
          bottom: .33rem;
          background: rgba(127,99,244,1);
          border-color: #7F63F4;
          width:1.71rem;
          height:.39rem;
          font-size: .18rem;
        }

        .addshopp-tit{
          width: 100%;
          height:.4rem;
          overflow: hidden;
          p{
            overflow: hidden;
            img{
              cursor: pointer;
            }
          }
          span{
            font-size:.22rem;
            color:rgba(70,74,83,1);
            line-height: .4rem;
            margin-left: 12px;
            float: left;
            font-weight: 600;
          }
          img{
            float: left;
            width: .22rem;
            height:.22rem;
            margin-top: .1rem;
          }
        }
        .addshopp-void{
          width: 8.8rem;
          height:100%;
          float: left;
          .one-lei{
            width: 100%;
            overflow: hidden;
          }
          table{
            margin-left: .22rem;
            tbody{
              tr{
                td{
                  height:.98rem;
                  display: flex;
                  align-items: center;
                  label{
                    font-size:.18rem;
                    font-weight:bold;
                    color:rgba(70,74,83,1);
                    margin-right: .08rem;
                  }
                  input{
                    height:.49rem;
                    border:1px solid #DDDFE1;
                    border-radius: 3px;
                    background:rgba(33,141,250,0);
                    font-size:.15rem;
                    color:#999;
                    line-height:.49rem;
                    text-indent: .19rem;
                  }
                  .daig-name{
                    width: 3.12rem;
                  }
                  .anim-price{
                    width: 1.28rem;
                    margin-right: .33rem;
                  }
                  .anim-num{
                    width: 1.01rem;
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
                    background: url("../../assets/img/addphoto.png") no-repeat;
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
        }
      }
    }
    header{
      width: 100%;
      height:.98rem !important;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding-top:.24rem;
      padding-right:.66rem;
      background: #fff;
    }
    .header{
      width: 100%;
      height:100%;
      overflow: hidden;
      .search-box{
        position: relative;
        overflow: hidden;
        float: left;
        .search-ipt{
          width: 3.51rem;
          height:.5rem;
          background:rgba(243,243,243,1);
          border-radius:3px;
          float: left;
        }
        .img-box{
          width: .55rem;
          height:.5rem;
          background: #F3F3F3;
          float: left;
          img{
            width: .13rem;
            height: .13rem;
            display: block;
            margin:0 auto;
            margin-top: .18rem;
          }
        }
      }
      .header-back{
        float: right;
        overflow: hidden;
        cursor: pointer;
        margin-top:.1rem;
        .image-box{
          float: left;
          img{
            width: .29rem;
            height:.29rem;
            display: block;
          }
        }
        span{
          float: left;
          font-size:.19rem;
          color:rgba(127,99,244,1);
          margin-left: .15rem;
        }
      }
    }

    /*表单*/








































  }
</style>
