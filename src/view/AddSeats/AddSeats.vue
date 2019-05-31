<template>
  <div class="seats-box" v-loading.fullscreen.lock="isLoading">
    <el-main> 
      <div class="view-box">
        <div class="addshopp-box">
          <div class="addshopp-dai">
            <div class="addshopp-tit">
              <p>
                <img src="../../assets/img/goback.png" alt="" @click="$parent.isAddSeats = true,$parent.seatsID = -1 ">
                <span>添加席位</span>
              </p>
            </div>
            <table>
              <tbody>
              <tr>
                <td>
                  <el-radio-group v-model="location">
                    <el-radio-button label="1">大厅</el-radio-button>
                    <el-radio-button label="2">雅间</el-radio-button>
                  </el-radio-group>
                </td>
                <td>
                  <label for="">席位名称</label>
                  <input type="text" placeholder="填写席位名称 " class="daig-name" v-model="seatName">
                </td>
                <td class="zhuti-photo" style="height: auto;">
                  <label for="" style="margin-top:.2rem">席位照片</label>
                  <div class="activelyOne-photo">
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachment"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :multiple="true"
                      :file-list='seatsImgList'
                      :limit = 1
                      :before-upload="beforeAvatarUpload"
                        accept="image/png, image/jpeg"
                      :on-exceed = 'onExceed'
                      class="photo"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <p>200*200 png. jpg格式</p>
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
      name: "AddSeats",
      inject:['reload'],
      props:{
        seatsID:{
          type: Number,
          required: true
        }
      },
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          img_list:[],    //上传图片文件
          location:'1',
          seatName: '',//茶坊名字
          seatsImgList: [],
          seatsImg: '',
          isLoading: false
        }
      },
      methods: {
        addAttachment (params) {
          this.seatsImg = params.file
        },
        handleRemove(file, fileList) {
          this.seatsImgList = []
          this.seatsImg = ''
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
        
        submit(){
          if(!this.VerificationData()) return
          var params = new FormData()
          params.append('location', this.location)
          params.append('name', this.seatName)
          this.seatsImgList.length >0 ? params.append('image', '') :params.append('image', this.seatsImg)
          this.isLoading = true
          this.seatsID != -1 ? this.updataSeatData(params) : this.addSeatData(params)
        },
        addSeatData(params){
          this.$http.post(this.$conf.env.addSeatData, params, true).then( res =>{
            this.isLoading = false
            // if(res.status)
            this.$message({  message: '添加成功', type: 'success'});
              this.reload()
          }).catch( err =>{
            this.isLoading = false
             this.$message.error('网络错误');
          })
        },
        updataSeatData(params){
          
          this.$http.put(this.$conf.env.addSeatData + this.seatsID + '/', params, true).then( res =>{
            if(res.status == '200'){
            this.$message({  message: '修改成功', type: 'success'});
              this.reload()
            }else{
              this.$message({ message: '修改失败', type: 'warning'});
            }
          }).catch( err =>{
             this.isLoading = false
             this.$message.error('网络错误');
          })

        },
        VerificationData(){
          if(!this.seatName || !this.seatsImg){
            this.$message({ message: '请完善您的信息', type: 'warning'});
            return false
          }else{
            return true
          }
        },
        getSeatData(){
          this.$http.get(this.$conf.env.addSeatData + this.seatsID + '/').then( res =>{
            this.isLoading = false
            if(res.status == '200'){
              if(!res.data) return
              this.location = res.data.location
              this.seatName = res.data.name ? res.data.name : ''
              this.seatsImg = res.data.image ? res.data.image : ''
              this.seatsImgList = res.data.image ? [{'url': res.data.image}] : []

            }
          }).catch( err =>{
            this.isLoading = false
            this.$message.error('网络错误');
          })
        },
        onExceed(){
           this.$message.error('最多添加一张图片');
        }
      },
      mounted(){
        if(this.seatsID != -1){
          this.isLoading = true
          this.getSeatData()
        }
      }
    }
</script>

<style lang="scss">
  .seats-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
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
          }
          img{
            float: left;
            width: .22rem;
            height:.22rem;
            margin-top: .1rem;
          }
        }
        .addshopp-dai{
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
                    span{
                      height: .33rem;
                      line-height: .33rem;
                      width: .94rem;
                      border-radius: 17px;
                      padding: 0;
                      font-size: .16rem;
                    }
                    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                      background: #7F63F4;
                      border-color: #7F63F4;
                    }
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
