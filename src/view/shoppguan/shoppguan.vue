<template>
    <div class="shoop-box">
      <el-header>
        <div class="header">
          <div class="search-box">
            <div class="img-box">
              <img src="../../assets/img/Icon.png" alt="">
            </div>
            <input type="text" class="search-ipt" placeholder="搜索..."/>
          </div>
          <div class="header-back">
            <div class="image-box">
              <img src="../../assets/img/back.png" alt="">
            </div>
            <span>退出</span>
          </div>
        </div>
      </el-header>

      <el-main>
        <div class="view-box">
          <div class="addshopp-box">
            <div class="addshopp-left">
              <div class="addshopp-tit">
                <p>
                  <img src="../../assets/img/goback.png" alt="">
                  <span>添加商品</span>
                </p>
              </div>
              <div class="one-lei">
                <!--分类-->
                <div class="fenlei">
                <i>分类</i>
                <el-select class="select-nav" v-model="value" placeholder="请选择" style="width: 1.46rem; font-size:.15rem;float: left;height:.49rem;min-height: 40px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                  <img src="../../assets/img/0c05a25c35cd22ea2d3e50d8b41ba32.png" alt="">
              </div>
                <div class="dengji">
                  <span class="denngji-tit">优先级</span>
                  <el-radio-group v-model="radio2">
                    <el-radio :label="0">A</el-radio>
                    <el-radio :label="1">B</el-radio>
                    <el-radio :label="2">C</el-radio>
                    <el-radio :label="3">D</el-radio>
                    <el-radio :label="4">E</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="tow-lei">
                <i>状态</i>
                <el-radio-group v-model="radio1">
                  <el-radio :label="0">期货</el-radio>
                  <el-radio :label="1">现货</el-radio>
                </el-radio-group>
              </div>
              <div class="three-lei">
                <i class="shopp-name-tit">商品名称</i>
                <input type="text" placeholder="填写商品名称" class="shopp-name">
              </div>
              <div class="four-lei">
                <label for="">原价</label>
                <input type="text" placeholder="填写原价" class="old-price">
                <label for="">现价</label>
                <input type="text" placeholder="填写原价">
              </div>
              <div class="five-lei">
                <label for="">商品介绍</label>
                <input type="text" placeholder="填写商品介绍">
                <i>0/30</i>
              </div>
              <div class="six-lei">
                <label for="">商品照片</label>
                <div class="box">
                  <el-upload
                    action="string"
                    ref="upload"
                    list-type="picture-card"
                    :http-request="addAttachment"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :multiple="true"
                    class="photo"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <span class="image-tit">注：不得少于4张</span>
                  <em>750*750 png. jpg格式</em>
                </div>
              </div>
              <div class="seven-lei">
                <label for="">商品照片</label>
                <div class="box">
                  <div>
                    <el-upload
                      action="string"
                      ref="upload"
                      list-type="picture-card"
                      :http-request="addAttachment"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :multiple="true"
                      class="photo"
                      :tip="12132"
                      :trigger="1231231"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </div>

                  <em>750*750 png. jpg格式</em>
                </div>
              </div>
              <div class="ok-send">
                <div class="yulan">
                  <a href="javascript:void(0)" class="queding-but">确定</a>
                  <a href="javascript:void(0)" class="yulan-but">预览</a>
                </div>
              </div>
            </div>
            <div class="addshopp-right">
              <div class="iphone-shou">
                <div class="iphone-tit">
                  <img src="../../assets/img/iphoneBG.png" alt="">
                </div>
                <div class="iphone-cen">
                  <div class="cen-tit">
                    <span class="goback"></span>
                    <p>还要多久才能和你捡起</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>




    </div>
</template>

<script>
    export default {
      name: "shoppguan",
      data() {
        return {
          options: [{
            value: '0',
            label: '黄金糕'
          }, {
            value: '1',
            label: '双皮奶'
          }, {
            value: '2',
            label: '蚵仔煎'
          }, {
            value: '3',
            label: '龙须面'
          }, {
            value: '4',
            label: '北京烤鸭'
          }],
          value: '',
          radio2: 3,
          radio1: 0,
          dialogImageUrl: '',
          dialogVisible: false,
          img_list:[]    //上传图片文件
        }
      },
      methods: {
        addAttachment (params) {
          let formData = new FormData()
           formData.append('file', params.file)
           formData.append('type', 'SKU')
           formData.append('id', this.$route.params.id)
          var self = this,
            file = params.file,
              fileType = file.type,
            file_url = self.$refs.upload.uploadFiles[0].url;
            params.file.url = self.$refs.upload.uploadFiles[0].url;
            this.img_list.push(params.file)
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      }
    }
</script>

<style lang="scss" >
  .shoop-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;


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
            margin-left: 2px;
            float: left;
          }
          img{
            float: left;
            width: .22rem;
            height:.22rem;
            margin-top: .1rem;
          }
        }
        .addshopp-left{
          width: 8.8rem;
          height:100%;
          float: left;
          .one-lei{
            width: 100%;
            overflow: hidden;
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
    .fenlei{
      float: left;
      overflow: hidden;
      display: flex;
      align-items: center;
      i{
        font-size:.18rem;
        font-weight:bold;
        color:rgba(70,74,83,1);
        float: left;
        margin-right: .3rem;
      }
      .select-nav{
        input{
          width: 1.46rem;
          font-size: 0.15rem;
          height: 0.49rem;
        }
      }
      img{
        width: .28rem;
        height:.28rem;
        float: left;
        margin-left: .17rem;
      }
    }
    .dengji{
      float: right;
      overflow: hidden;
      display: flex;
      align-items: center;
      span{
        float: left;
        font-size:.18rem;
        color:rgba(70,74,83,1);
      }
      .denngji-tit{
        margin-right: .24rem;
      }
      .el-radio-group{
        float: left;
      }
    }

    /*第二行*/
    .tow-lei{
      width: 100%;
      display: flex;
      align-items: center;
      i{
        font-size:.18rem;
        font-weight:bold;
        color:rgba(70,74,83,1);
        line-height: .66rem;
        margin-right: .23rem;
      }
    }
    /*第三行*/
    .three-lei{
      width: 100%;
      overflow: hidden;
      .shopp-name-tit{
        font-size:.18rem;
        font-weight:bold;
        color:rgba(70,74,83,1);
        float: left;
        line-height: .49rem;
        margin-right: .08rem;
      }
      .shopp-name{
        width: 3.12rem;
        height:.49rem;
        line-height: .49rem;
        text-indent: .19rem;
        font-size: .15rem;
        color:#999999;
        float: left;
        background:rgba(33,141,250,0);
        border:1px solid rgba(221, 223, 225, 1);
        border-radius: 3px;
      }
    }
    /*四*/
    .four-lei{
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-top:.24rem;
      label{
        font-size:.18rem;
        font-weight:bold;
        color:rgba(70,74,83,1);
        float: left;
        margin-right: .08rem;
      }
      input{
        width:2.44rem;
        height:.49rem;
        background:rgba(33,141,250,0);
        border:1px solid rgba(221, 223, 225, 1);
        border-radius:3px;
        float: left;
        font-size:.15rem;
        color:rgba(153,153,153,1);
        line-height:.49rem;
        text-indent: .19rem;
      }
      .old-price{
        margin-right: .64rem;
      }

    }
    /*五*/
    .five-lei{
      display: flex;
      align-items: center;
      position: relative;
      margin-top:.24rem;
      label{
        font-size:.18rem;
        font-weight:bold;
        color:rgba(70,74,83,1);
        line-height:.49rem;
        margin-right: .09rem;
      }
      input{
        width: 5.6rem;
        height:.49rem;
        line-height:.49rem;
        text-indent: .19rem;
        font-size:.15rem;
        color:rgba(153,153,153,1);
        border:1px solid rgba(221, 223, 225, 1);
      }
      i{
        font-size:.12rem;;
        color:rgba(127,99,244,1);
        position: absolute;
        right: 2.45rem;
        bottom: .05rem;
      }
    }
    /*六*/
    .six-lei,.seven-lei{
      margin-top:.6rem;
      overflow: hidden;
      label{
        font-size:.18rem;
        font-weight:bold;
        color:rgba(70,74,83,1);
        margin-right: .11rem;
        white-space: nowrap;
        float: left;
      }
      .image-tit{
        font-size:.12rem;
        color:rgba(127,99,244,1);
        float: left;
        margin-top:.52rem;
        margin-left: .12rem;
      }
      em{
        font-size:.12rem;
        color:rgba(127,99,244,1);
        display: block;
        margin-top:.9rem;
      }
      .box{
        overflow: hidden;
        float: left;
      }
      .photo{
        float: left;
      }
      width: 100%;
      .el-upload--picture-card{
        width: .62rem;
        height:.62rem;
        border:1px solid rgba(127,99,244,1);
        border-radius:5px;
        background: #fff;
        i{
          font-size: .12rem;
          display: block;
          line-height: .62rem;
        }
      }
      .el-upload-list--picture-card{
        overflow: hidden;
        li{
          width: .8rem;
          height:.8rem;
          float: left;
        }
      }
    }
    /*七*/
    .seven-lei{

    }

    .ok-send{
      width: 100%;
      height:2.63rem;
      .yulan{
        width: 100%;
        height:100%;
        position: relative;
        .queding-but{
          width:1.71rem;
          height:.39rem;
          background:rgba(127,99,244,1);
          border-radius:3px;
          position: absolute;
          left: 4.86rem;
          bottom: .33rem;
          font-size:.18rem;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:.39rem;
          text-align: center;
        }
        .yulan-but{
          width:1.71rem;
          height:.39rem;
          background:rgba(127,99,244,1);
          border-radius:3px;
          position: absolute;
          left: 6.76rem;
          bottom: .33rem;
          font-size:.18rem;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:.39rem;
          text-align: center;
        }
      }
    }
    /*右侧*/
    .addshopp-right{
      width: 5.2rem;
      height:100%;
      float: right;
      background: #D3D3D3;
      box-sizing: border-box;
      padding:.53rem .25rem .21rem .25rem;
      .iphone-shou{
        width: 100%;
        height:100%;
        background: #fff;
      }
      .iphone-tit{
        width: 100%;
        height:.22rem;
        img{
          width: 100%;
          height:100%;
          display: block;
        }
      }
      .iphone-cen{
        width: 100%;
        .cen-tit{
          width: 100%;
          height:.4rem;
          position: relative;
          span{
            position: absolute;
            width:.25rem;
            height:.25rem;
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          p{
            /*width: 100%;*/
            /*height:.4rem;*/
            /*line-height: .4rem;*/
          }
        }
      }
    }




































  }
</style>
