<template>
    <div class="bigboxclass" v-show="flag">
        <div class="box"></div>
        <div class="model">
            <div class="header">
                <p>编辑分类</p>
                <span @click="close()"><img src="../../assets/img/close.png" style="cursor: pointer;" alt="" srcset=""></span>
            </div>
            <el-main style="padding:0;">
            <div class="view-box">
                <div class="table-box">
                <div class="manage-tit">
                    <img src="../../assets/img/add.png" alt=""  @click="addProjectClassifity">
                </div>
                    <!--表格部分-->
                <div class="manage-table">
                    <el-table
                    v-loading ='isLoading'
                    :data="projectCategory"
                    @cell-mouse-enter="show"
                    @cell-mouse-leave="leave"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        width="150px"
                        align="center"
                        label="分类名称">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="150px"
                        label="选中图">
                        <template slot-scope="scope">
                            <img :src="scope.row.click_img" width="40" height="40" class="head_pic"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="150px"
                        label="默认图">
                        <template slot-scope="scope">
                            <img :src="scope.row.img" width="40" height="40" class="head_pic"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop=""
                        label="操作">
                        <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small"  v-show="scope.row.flag" ><img src="../../assets/img/bianji.png" alt="" srcset=""></el-button>
                        <el-button @click="del(scope.row)" type="text" size="small"  v-show="scope.row.flag"><img src="../../assets/img/del.png" alt="" srcset=""></el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
                </div>
            </div>
            </el-main>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bianji2',
    data(){
      return{
        flag: true,
        tableData: [],
        classifityTitle: '',
        projectCategory:[],
        isLoading: true
      }
    },
    mounted(){
        this.getprojectCategory()
        this.$bus.$on('getprojectCategoryclose', this.getprojectCategory)
    },
    methods: {
       handleClick(row) {
           this.$emit('addProjectClassifity', row)
      },
      del(row) {
        this.isLoading = true
        this.$http.delete( this.$conf.env.deleteProjectCategory + row.id).then(res =>{
            if(res.status == '204'){
                this.$message({  message: '删除成功', type: 'success'}); 
                this.getprojectCategory()
            }else{
                this.isLoading = false
                this.$message.error('删除失败');
            }
            
        }).catch( err =>{
             this.isLoading = false
            this.$message.error('网络错误');
        })
      },
      close(){
          this.flag = false;
          this.$emit("change",false);
      },
      show(row){
        row.flag = true
        
      },
      leave(row){
        row.flag = false
      },
      addProjectClassifity(){
          this.$emit('addProjectClassifity',{'classifityName': '添加分类'})
      },
       getprojectCategory(){
           this.isLoading  = true
          this.$http.get(this.$conf.env.getprojectCategory).then( res =>{
              this.isLoading = false
            if(res.status == '200'){
              if(res.data && res.data.length > 0){
                    res.data.forEach( element =>{
                    element.flag = false
                })
                this.projectCategory = res.data
              }
            }
          }).catch( err =>{
              this.isLoading = false
               this.$message.error('网络错误');
          })
        },
        
    },
}
</script>
<style lang="scss" >
    .bigboxclass{
        position: fixed;
        width: 200%;
        height: 100%;
        left: -10rem;
        z-index: 12;
        ::-webkit-scrollbar {
            display: none;
        }
        .box{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.4);
        }
        .model{
            width: 12.2rem;
            height: 8.11rem;
            border-radius: .05rem;
            position: fixed;
            left: 0; right: 0; top: 0; bottom: 0;
            background:rgba(244,244,244,1);
            margin: auto;
            overflow: hidden;
            overflow-y: scroll;
            .header{
                height: .5rem;
                background: rgba(159,136,255,1);
                display: flex;
                justify-content: space-between;
                p{
                    font-size: .16rem;
                    color:rgba(255,254,254,1);
                    margin-top: .18rem;
                    margin-left: .33rem;
                }
                span{
                    margin-top: .21rem;
                    margin-right: .3rem;
                    img{
                        display: block;
                        width: .17rem;
                        height: .17rem;
                    }
                }
            }
            /*主体*/
            .view-box{
            width: 100%;
            height:100%;
            padding:.24rem .32rem .53rem .32rem;
            box-sizing: border-box;
            height: 100%;
            overflow-y: scroll;
            .table-box{
                width: 100%;
                height:100%;
                .manage-tit{
                width: 100%;
                overflow: hidden;
               
                img{
                    display: block;
                    float: right;
                    // margin-bottom: .4rem;
                    width: .94rem;
                    height:.4rem;
                     cursor: pointer;
                }
                }
                /*表格部分*/
                .manage-table{
                width: 100%;
                height:8.1rem;
                .el-table__header{
                    tr{
                        th{
                            background: #F2F5F8 !important;
                        }
                        .fen{
                            width: 5rem;
                        }
                    }
                }
                }
            }
            }
        }
        .bigbox .model .view-box .table-box .manage-table{
            height:6.1rem !important;
        }
        .el-main{
            height: 7.61rem;
            overflow: hidden
        }
    }
    
</style>
