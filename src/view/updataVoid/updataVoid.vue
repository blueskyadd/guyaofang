<template>
  <div class="systemMain-box" v-loading.fullscreen.lock="isLoading">
    <headerTitle/>
    <el-main>
      <div class="view-box">
        <div class="addshopp-box">
          <div class="addshopp-void">
            <div class="addshopp-tit">
              <p>
                <span>大屏管理</span>
              </p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td class="zhuti-photo" style="height: auto;">
                    <div class="words" >
                      <label for style="float: left;">视频上传</label>
                    </div>
                    <div class="activelyOne-photo">
                      <!-- <video :src='videoImg' v-if="videoImg"  controls="controls"></video> -->
                      <el-upload
                        action="string"
                        ref="upload"
                        id="upload"
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
                        <img width="100%" :src="dialogImageUrl" alt>
                      </el-dialog>
                    </div>
                    <div class="video_list">
                      <ul>
                        <li v-for="(item, index) in img_list" :key="item.id">
                          <div><i>{{index+1}}、</i>{{item.name}}</div>
                          <span @click="handleRemove(item, index)">删除</span>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <el-button type="primary" @click="setSystemVideo">确定</el-button>
        </div>
      </div>
    </el-main>
  </div>
</template>


<script>
import headerTitle from "../../components/header/header"
export default {
  name: "updataVoid",
  components:{headerTitle},
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      img_list: [], //上传图片文件
      videoImg: "",
      videoImgFile: [],
      isLoading: true
    };
  },
  inject: ["reload"],
  methods: {
    addAttachment(params) {
      var windowURL = window.URL || window.webkitURL;
      var obj = {
        name: params.file.name,
        uid: params.file.uid,
        image: params.file
      };
      this.img_list.push(obj);
      this.$message({ message: "上传成功", type: "success" });
    },
    handleRemove(item, index) {
      if (item.id) {
        this.isLoading = true;
        this.deleteSystemVideo(item.id);
      } else {
        this.img_list.splice(index, 1);
        this.$message({ message: "删除成功", type: "success" });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    setSystemVideo() {
      this.isLoading = true
      var params = new FormData();
      this.img_list.forEach(element => {
        if (!element.id) {
          params.append("video", element.image);
        }
      });
      this.$http
        .post(this.$conf.env.setSystemVideo, params, true)
        .then(res => {
          if (res.status == "201") {
            this.$message({ message: "提交成功", type: "success" });
            this.getDsystemVideo();
          }else{
            this.isLoading = false;
             this.$message({ message: '提交失败', type: 'warning'});
          }
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    deleteSystemVideo(ID) {
      this.$http
        .delete(this.$conf.env.setSystemVideo + ID + "/")
        .then(res => {
          if (res.status == "202") {
            this.$message({ message: "删除成功", type: "success" });
            this.getDsystemVideo();
          } else {
            this.isLoading = false;
            this.$message({ message: '删除失败', type: 'warning'});
          }
        })
        .catch(err => {
          this.$message.error("网络错误");
          this.isLoading = false;
        });
    },
    getDsystemVideo() {
      this.$http
        .get(this.$conf.env.setSystemVideo)
        .then(res => {
          this.isLoading = false;
          res.data.forEach((element, index) => {
            element.url = element.video;
          });

          this.img_list = res.data;
        })
        .catch(err => {
          this.isLoading = false;
          this.$message.error("网络错误");
        });
    },
    onExceed() {
      this.$message.error("一次只能添加一张");
    }
  },
  mounted() {
    this.getDsystemVideo();
  }
};
</script>


<style lang="scss" >
.systemMain-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .el-upload-list {
    display: none !important;
  }
    
  .el-upload-list__item-status-label {
    margin: 0 !important;
    line-height: initial;
  }
  /* 视频部分*/
  .video_list {
    width: 1.6em;
    height: 1.2rem;
    border: 1px solid #7F63F4;
    /* float: left; */
        margin: .5rem 0 0 0.13rem;
    padding: .07rem .01rem 0 .07rem;

    ul {
      display: block !important;
      font-size: 0.05rem;
      overflow: hidden;
      height: 100%;
      overflow-y: scroll;
      padding-right: .23rem;
      li {
        width: 100% !important;
        height: 0.3rem !important;
        float: left;
        line-height: .3rem;
        color: #7F63F4;
        div{
          width: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left
        }
        span {
          float: right;
          color: red;
        }
      }
       &::-webkit-scrollbar {/*滚动条整体样式*/
        width: .08rem;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background:  #7F63F4;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px #fff;
        border-radius: 0;
        background: #fff;
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
          font-weight: 600;
        }
        img {
          float: left;
          width: 0.22rem;
          height: 0.22rem;
          margin-top: 0.1rem;
        }
      }
      .addshopp-void {
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
                  margin-right: 0.24rem;
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
                  margin-top: -.45rem;

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
