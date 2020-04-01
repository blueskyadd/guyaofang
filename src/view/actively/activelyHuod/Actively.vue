<template>
  <div class="activelyOne-box">
      <el-main>
      <div class="menu-box">
        <div class="menu">
          <div class="actively-one-tit">
            <img src="../../../assets/img/goback.png" class="menu-image" alt="" @click=" setParentData()">
            <span class="menu-words">{{activelyId == -1 ? '添加活动':'编辑活动'}}</span>
          </div>
        </div>
      </div>
    </el-main>
    <div class="activelyOne-left">
    
      <div class="tit-but" v-if="activelyId == -1">
        <a v-for="item in templateList" :key="item.id" @click="templateData  = item.id,$parent.activelyId = -1" :class="{active:templateData == item.id}">{{item.name}}</a>
      </div>
         <ActivelyOne v-if="templateData ==1" :activelyId='activelyId'/>
         <ActivelyTwo v-if="templateData ==2" :activelyId='activelyId'/>
         <ActivelyThree v-if="templateData ==3" :activelyId='activelyId'/>
    </div>
  </div>
</template>

<script>
import ActivelyOne from './ActivelyOne.vue'
import ActivelyTwo from './ActivelyTwo.vue'
import ActivelyThree from './ActivelyThree.vue'
export default {
  name: "actively",
  components :{ActivelyOne, ActivelyTwo, ActivelyThree},
  props:{
    activelyClassifity:{
      type: Number,
      required: true
    },
    activelyId:{
      type: Number,
      required: true
    }
  },
  data() {
    return {
        templateList:[{'name': '模板一', 'id': 1}, {'name': '模板二', 'id': 2}, {'name': '模板三', 'id': 3}],
        templateData: this.activelyClassifity
    };
  },
  methods:{
    setParentData(){
      this.$parent.isAddActively = true
      this.$parent.activelyClassifity = 1
      this.$parent.activelyId = -1
    }
  }
};
</script>

<style lang="scss" >

.el-date-editor .el-range__icon{
    margin: 0 !important;
}
.el-date-editor .el-range-separator{
    height:auto !important;
}
.activelyOne-box {
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 12px;
  padding: .28rem;
  background: #fff;
  overflow-y: scroll !important;
  .activelyOne-left {
    width: 100%;
    height: 100%;
    margin-left: 0.22rem;
    float: left;
    .Actively{
        width: 100%;
        // float: left;
    }
    .Actively>div{
        float: left;
    }
    .tit-but {
      width: 100%;
      overflow: hidden;
      padding: 0.28rem 0 .48rem;
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
    
  }
   .activelyOne-right{
      float:right !important;
      position: absolute;
      top: .52rem;
      right: .45rem;
      margin-right: .22rem;
      .activelyOne_app-show{
        width: 5.25rem;
        height:8.5rem;
        padding:.53rem .315rem .19rem .315rem;
        box-sizing: border-box;
        background: #D3D3D3;
            margin-right: .22rem;
        .activelyOne_app-box{
          width: 100%;
          height:100%;
          background: #fff;
          .activelyOne_app-tit{
            width: 100%;
            img{
              width: 100%;
              height: 100%;
              display: block;
            }
          }
        }
      }
    }
  .actively-one-tit{
          width: 100%;
          overflow: hidden;
          .menu-image{
            width: .22rem;
            height:.22rem;
            margin-right: 12px;
            float: left;
            margin-top: .06rem;
          }
          .menu-words{
            font-size:.22rem;
            color:rgba(70,74,83,1);
            float: left;
          }
        }

.el-upload-list__item-status-label{
      margin: 0 !important;
      line-height: initial;
    }
}
.activelyOne-box::-webkit-scrollbar {
            display: none;
        }

</style>





































  }
</style>
