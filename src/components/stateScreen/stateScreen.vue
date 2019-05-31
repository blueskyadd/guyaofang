<template>
    <div class="stateScreen">
        <div class="left">
            <p class="yishuFont">订单</p>
            <!--表格部分-->
            <div class="manage-table">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="seat"
                    label="位置">
                </el-table-column>
                <el-table-column
                    prop="goods"
                    label="商品">
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                    <el-button @click.native.prevent="handleClick(scope.row,scope.$index)" type="text" size="small">完成</el-button>
                    </template>
                </el-table-column>
                </el-table>
          </div>
        </div>
        <div class="center">
          <p class="yishuFont">订单</p>
          <div class="IndentBox">
            <div class="indent" v-for="(val,index) in OrderListB" :key="index">
              <div class="info">
                <div class="one"><p class="name">{{val.address.name}}</p><span class="haoma">{{val.address.mobile}}</span></div>
                <div class="two"><p class="ear">{{val.address.area}}</p></div>
                <div class="san">{{val.address.street}}</div>
              </div>
              <div class="shopp_List">
                <el-collapse>
                  <el-collapse-item :title="val.address.name" name="1">
                    <div v-for="item in val.order_details">{{item.good}} x{{item.num}}</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <!--              显示隐藏-->
              <div class="faishBox">
                <div class="finsh">
                  <span class="tang"> <el-radio v-model="val.radio" label="1">堂客</el-radio></span>
                  <span class="wan" :class="val.radio == 1?'active':''" v-on:click="TKwan(index,val.id,val.radio)">完成</span>
                </div>
                <div class="yes">
                  <span class="hao"> <el-radio v-model="val.radio" label="2">订单号</el-radio></span>
                  <input type="text" class="input" :disabled="val.radio == 1? true : false" v-model="val.OrderHao">
                  <span class="que" :class="val.radio == 2?'active':''" v-on:click="SendHuo(index,val.id,val.radio,val.OrderHao)">确认发货</span>
                </div>
              </div>
              <div>

                <!--              显示隐藏  订单号-->
                <div class="yiwan" style="display: none;">
                  <span class="tang"><span class="dingdan">订单号</span><span class="dingdan">156456454132132</span></span>
                  <span class="wan">已发货</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="right">
            <div class="top">
                <p class="yishuFont">席位</p>
                <div class="seat">
                  <div class="seatSroll">
                    <span>
                      <div class="Image_BoxScroll">
                        <img src="../../assets/img/denglu.png" alt="" srcset="">
                         <div class="meng">
                          <img src="../../assets/img/changeZ.png" alt="">
                        </div>
                      </div>
                      <em>1号桌</em>

                    </span>
                    <span>
                      <div class="Image_BoxScroll">
                        <img src="../../assets/img/denglu.png" alt="" srcset="">
                         <div class="meng">
                          <img src="../../assets/img/changeZ.png" alt="">
                        </div>
                      </div>
                      <em>1号桌</em>

                    </span>
                    <span>
                      <div class="Image_BoxScroll">
                        <img src="../../assets/img/denglu.png" alt="" srcset="">
                         <div class="meng">
                          <img src="../../assets/img/changeZ.png" alt="">
                        </div>
                      </div>
                      <em>1号桌</em>

                    </span>
                    <span>
                      <div class="Image_BoxScroll">
                        <img src="../../assets/img/denglu.png" alt="" srcset="">
                         <div class="meng">
                          <img src="../../assets/img/changeZ.png" alt="">
                        </div>
                      </div>
                      <em>1号桌</em>

                    </span>
                    <span>
                      <div class="Image_BoxScroll">
                        <img src="../../assets/img/denglu.png" alt="" srcset="">
                         <div class="meng">
                          <img src="../../assets/img/changeZ.png" alt="">
                        </div>
                      </div>
                      <em>1号桌</em>

                    </span>
                  </div>
                </div>
            </div>
            <div class="bottom">
                <p class="yishuFont">今日茶单</p>
                <div class="tea">
                    <div class="Tex_box">
                     <div class="teaSlect_Box" v-for="(val,index) in TodayTeaList" :key="index">
                         <span :class="val.putaway === true?'active':''" v-on:click="SelectTea(index)"></span>
                         <div class="Image_Box">
                           <img :src="val.front_image" alt="">
                           <p>{{val.name}}</p>
                         </div>
                       </div>
                    </div>
                </div>
              <el-button type="primary" round v-on:click="SendTeaList">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
  import '../../assets/style/fontS.css'
  import { Loading } from 'element-ui';
export default {
    name: 'stateScreen',
    data(){
        return {
            tableData: [{
            date: '1号桌',
            name: '白茶',
            num: 'X2',
            operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },{
              date: '1号桌',
              name: '白茶',
              num: 'X2',
              operation:''
            },],

          ff:[
            {
              radio:'1'
            },
            {
              radio:'1'
            },
            {
              radio:'1'
            },
            {
              radio:'1'
            },
            {
              radio:'1'
            },{
              radio:'1'
            }
          ],
          radio:'1',






          OrderListB:[],
          TodayTeaList:[],   //今日茶单
          loadIngs:null,
          Options:{
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          },   //加载
        }
    },
    methods: {
      handleClick(row,index) {
        let OrderID = {
          "pay_status": 3
        }
        this.$http.put(this.$conf.env.OrderListToady + row.order  + '/',OrderID).then(res => {
          if (res.status === 201) {
            this.tableData.splice(index,1)
          }
        }).catch(err => {
        })
      },


      // 堂客，完成订单
      TKwan(index,id,raiods){
        if (raiods === "2") {
          return false
        }
        let DataJson = {
          "express": true,   // 现场取货 True
          "express_num": '1'   //快递单号
        }
        this.$http.put(this.$conf.env.OrderPut + id  + '/',DataJson).then(res => {
          if (res.status === 201) {
            this.OrderListB.splice(index,1)
          }
        }).catch(err => {
        })
      },
      //发货
      SendHuo(index, id, x, hao) {
        if (x === "1") {
          return false
        }
        if(hao === ""){
          return false
        }

        let DataJson = {
          "express": false,   // 现场取货 True
          "express_num": hao   //快递单号
        }
        this.$http.put(this.$conf.env.OrderPut + id  + '/',DataJson).then(res => {
          if (res.status === 201) {
            this.OrderListB.splice(index,1)
          }
        }).catch(err => {
        })


        console.log(index,id,hao)
      },



      // 选择今日茶单
      SelectTea(index){
        this.TodayTeaList[index].putaway = !this.TodayTeaList[index].putaway
      },

      //提交今日茶单
      SendTeaList(){

        //加载
        this.loadIngs = Loading.service(this.Options);

        let Obj = {
          tea_list:[]
        };
        for(var i in this.TodayTeaList){
          if(this.TodayTeaList[i].putaway === true){
            Obj.tea_list.push(this.TodayTeaList[i].id)
          }
        }
        this.$http.post(this.$conf.env.SendListTea, Obj).then( res =>{

          if(res.status === 201){
            console.log(res.data)
            this.loadIngs.close();

          }
        }).catch( err =>{

        })
      },






      //请求快递订单   今日茶单   现场未处理订单
      OrderList(){
        console.log('执行')
        this.$http.get(this.$conf.env.OrderList).then( res =>{
        console.log('执行2')
          if(res.status === 200){
           console.log(res.data)

            for(var i in res.data.results){
              res.data.results[i].OrderHao = ""
            }


            this.OrderListB = res.data.results
          }
        }).catch( err =>{
        })

        this.$http.get(this.$conf.env.TodayListTea).then( res =>{
          if(res.status === 200){
            console.log(res.data)
            this.TodayTeaList = res.data


          }
        }).catch( err =>{
        })




        //请求现场未处理订单

        this.$http.get(this.$conf.env.OrderListToady).then( res =>{
          if(res.status === 200){
            console.log(res.data)
            this.tableData = res.data



            this.loadIngs.close();
          }
        }).catch( err =>{
        })


      },

    },
  created() {
      this.OrderList()
      this.loadIngs = Loading.service(this.Options);
  }
}
</script>
<style lang="scss">

    .el-icon-loading{
      font-size: 35px;
    }
    .el-loading-spinner i{
      color:rgba(186,138,197,1);
    }
    .el-loading-spinner .el-loading-text{

      color:rgba(186,138,197,1);
    }
    .stateScreen{
        width: 100% !important;
        height: 100% !important;
        background: url("../../assets/img/loginbj.png") no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-around;
        padding-top: .52rem;
        box-sizing: border-box;
        padding-right: .1rem;
        padding-left: .1rem;
        .yishuFont{
          font-family: haha;
          line-height: 1.34rem;
          text-align: center;
          font-size: .6rem;
          font-weight:400;
          color:rgba(186,138,197,1);
          text-align: center;
        }
        .left{
            width: 30%;
            height: 9.97rem;
            background: url("../../assets/img/1.png") no-repeat;
            background-size: cover;
            padding: 0 .34rem;
            .manage-table{
                width: 100%;
                height:86%;
              overflow: hidden;
              .el-table--enable-row-hover .el-table__body tr:hover>td {
                background: transparent !important;
              }
              tr{
                background: transparent !important;
                th{
                  background: transparent !important;
                }
              }
              .el-table{
                background: transparent !important;
                height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;


                &::-webkit-scrollbar {/*滚动条整体样式*/
                  width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
                  height: 4px;
                }
                &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                  border-radius: 5px;
                  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                  background:RGBA(214, 208, 233, 1);
                }
                &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                  border-radius: 0;
                  background: #fff;
                }
              }


            }

        }
        .center{
            width: 30%;
            height: 9.97rem;
            background: url("../../assets/img/2.png") no-repeat;
            background-size: cover;
          .IndentBox{
            overflow-x: hidden;
            overflow-y: scroll;
            height: 86%;
            width: 100%;
            .indent{
              width: 93%;
              box-sizing: border-box;
              border:1px solid rgba(214,208,233,1);
              border-radius:5px;
              margin-left: .18rem;
              padding: 0 .21rem .2rem .12rem;
              font-size: .2rem;
              margin-bottom: .15rem;
              .info{
                .one{
                  height: .4rem;
                  .name{
                    float: left;
                    line-height: .4rem;
                    color:rgba(51,51,51,1);
                    font-size:.2rem;
                  }
                  .haoma{
                    font-family:SimHei;
                    float: left;
                    margin-left: .22rem;
                    font-size:.18rem;
                    color:rgba(153,153,153,1);
                    line-height: .4rem;
                  }
                  .teaname{
                    float: right;
                    font-size:20px;
                    color:rgba(51,51,51,1);
                    line-height: .4rem;
                  }
                }
                .two{
                  height: .25rem;
                  .ear{
                    font-size: .16rem;
                    color: #000;
                    float: left;
                  }
                  .num{
                    font-size: .15rem;
                    color:rgba(102,102,102,1);
                    float: right;
                  }
                }
                .san{
                  font-size: .16rem;
                  color: #000;
                  line-height: .23rem;
                }
              }
              .shopp_List{
                  margin: .2rem 0;
                  .el-collapse-item__content{
                    color:rgba(167, 114, 179, 1);
                    background: transparent;
                      div{
                        text-indent: 10px;
                        line-height: 30px;
                      }
                  }
                  .el-collapse-item__wrap{
                    background: transparent;
                  }
                 .el-collapse-item__header{
                    background: transparent;
                   width: 20%;
                   text-indent: 10px;
                   color:rgba(167, 114, 179, 1);
                   border-bottom: 0;
                 }
              }
              .radio1{
                // color: rgba(167,114,179,1);
                margin-right: .07rem;
                width: .2rem;
                height: .2rem;
                vertical-align: middle;
              }

              .finsh{
                height: .35rem;
                margin-bottom: .06rem;
                .tang{
                  font-size:.18rem;
                  color:rgba(51,51,51,1);
                  line-height: .35rem;
                  float: left;
                  .el-radio__inner{
                    border: 2px solid rgba(167, 114, 179, 1);
                    width: 20px;
                    height: 20px;
                  }
                  .el-radio__input.is-checked .el-radio__inner{
                    background: #fff;
                  }
                  .el-radio__inner::after{
                    background:rgba(167, 114, 179, 1);
                    width: 10px;
                    height: 10px;
                  }
                  .el-radio__label{
                    font-size:.18rem;
                    font-family:SimHei;
                    color:rgba(51,51,51,1);
                  }

                }
              }
              .wan{
                width:.92rem;
                height:.33rem;
                background:rgba(153,153,153,1);
                border-radius:.05rem;
                color: #fff;
                line-height: .33rem;
                text-align: center;
                font-size: .18rem;
                float: right;
                cursor: pointer;
                &.active{
                  background:rgba(167, 114, 179, 1);
                }
              }
              .yiwan{
                // height: .4rem;
                margin-top: .18rem;
                .dingdan{
                  font-size: .18rem;
                  color:rgba(51,51,51,1);
                }
              }
              .yes{
                height: .35rem;
                // padding-bottom: .2rem;
                .hao{
                  color:rgba(51,51,51,1);
                  float: left;
                  line-height: .35rem;
                  .el-radio__inner{
                    border: 2px solid rgba(167, 114, 179, 1);
                    width: 20px;
                    height: 20px;
                  }
                  .el-radio__input.is-checked .el-radio__inner{
                    background: #fff;
                  }
                  .el-radio__inner::after{
                    background:rgba(167, 114, 179, 1);
                    width: 10px;
                    height: 10px;
                  }
                  .el-radio__label{
                    font-size:.18rem;
                    font-family:SimHei;
                    color:rgba(51,51,51,1);
                  }
                }
                .input{
                  width:2.66rem;
                  height:.36rem;
                  border:1px solid rgba(167,114,179,1);
                  border-radius:5px;
                  float: left;
                  background: none;
                  padding: 0 .1rem;
                  margin-left: .1rem;
                }
                .que{
                  width:.92rem;
                  height:.33rem;
                  border-radius:.05rem;
                  color: #fff;
                  line-height: .33rem;
                  text-align: center;
                  font-size: .18rem;
                  float: right;
                  background: #999999;
                  cursor: pointer;
                  &.active{
                    background:rgba(167,114,179,1);

                  }
                }
              }
            }
            &::-webkit-scrollbar {/*滚动条整体样式*/
              width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
              display: none;
            }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 5px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background:RGBA(214, 208, 233, 1);
            }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              border-radius: 0;
              background: #fff;
            }
          }

        }
        .right{
            width: 37%;
            height: 9.97rem;

            .top{
                width: 100%;
                box-sizing: border-box;
                height: 4.82rem;
                background: url("../../assets/img/3.png") no-repeat;
                background-size: cover;
                padding: 0 .2rem;
                .seat{
                    // overflow: hidden;
                  height: 3.5rem;
                  overflow: hidden;
                  .seatSroll{
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    span{
                      display: block;
                      float: left;
                      margin-right: .11rem;
                      text-align: center;
                      height: 1.2rem;
                      .Image_BoxScroll{
                        width: .72rem;
                        height: .73rem;
                        position: relative;
                        .meng{
                          width: .72rem;
                          height: .73rem;
                          position: absolute;
                          left: 0;
                          top: 0;
                          background:rgba(0,0,0,1);
                          opacity: 0;
                          border-radius: 5px;
                          transition:opacity .7s;
                          cursor: pointer;
                          img{
                            width: .32rem;
                            height: .32rem;
                            position: absolute;
                            left: 50%;
                            top:50%;
                            margin-left: -.16rem;
                            margin-top: -.16rem;
                            display: block;
                            opacity: 1;
                          }
                        }
                        img{
                          width: .72rem;
                          height: .73rem;
                          display: block;
                          border-radius: 5px;
                        }
                      }
                      .meng:hover{
                          opacity: .7;

                      }

                      em{
                        display: block;
                        font-size: .14rem;
                        color:rgba(51,51,51,1);
                        line-height: .3rem;
                      }

                    }
                    &::-webkit-scrollbar {/*滚动条整体样式*/
                      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
                      height: 4px;
                    }
                    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                      border-radius: 5px;
                      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                      background:RGBA(214, 208, 233, 1);
                    }
                    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                      border-radius: 0;
                      background: #fff;
                    }
                  }
                }
            }
            .bottom{
                width: 100%;
                box-sizing: border-box;
                height: 5.08rem;
                background: url("../../assets/img/4.png") no-repeat;
                background-size: cover;
                margin-top: .07rem;
                padding: 0 .33rem;
                position: relative;
                .tea{
                  width: 100%;
                  height:54%;
                  overflow: hidden;
                  .Tex_box{
                    height: 100%;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    .teaSlect_Box{
                      float: left;
                      overflow: hidden;
                      margin-left: .34rem;
                      span{
                        float: left;
                        width:.18rem;
                        height:.18rem;
                        border:1px solid rgba(186,138,197,1);
                        border-radius: .07rem;
                        margin-top: .22rem;
                        cursor: pointer;
                        &.active{
                          background: url("../../assets/img/checkeds.png") no-repeat;
                          background-size: cover;
                        }
                      }
                      .Image_Box{
                        width:.6rem;
                        margin-left: .17rem;
                        float: left;
                        img{
                          width:.6rem;
                          height:.6rem;
                          border-radius:5px;
                          display: block;
                        }
                        p{
                          font-size:.14rem;
                          font-family:haha;
                          color:rgba(51,51,51,1);
                          line-height:.28rem;
                          text-align: center;
                          white-space: nowrap;
                          width: .6rem;
                          text-overflow: ellipsis;
                          overflow: hidden;
                        }
                      }
                    }
                    &::-webkit-scrollbar {/*滚动条整体样式*/
                      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
                      height: 4px;
                    }
                    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                      border-radius: 5px;
                      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                      background:RGBA(214, 208, 233, 1);
                    }
                    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                      border-radius: 0;
                      background: #fff;
                    }
                  }
                }
              .el-button{
                position: absolute;
                right: 1rem;
                bottom: .5rem;
                padding: 12px 39px;

              }
            }
        }
    }
</style>
