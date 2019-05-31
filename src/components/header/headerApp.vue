<template>
    <div class="headerApp">
        <img src="../../assets/img/iphoneBG.png" alt="">
        <span class="el-icon-arrow-left"></span>
        <h3 class="Mask"></h3>
        <h3>{{title}}</h3>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
.headerApp{
    height: .64rem;
    background: #fff;
    position: absolute;
    z-index:  11;
    width: 4.61rem;
    span{
        font-size: .35rem;
        position: absolute;
        line-height: .44rem;
        font-size: .35rem;
        left: 0;
        bottom: 0;
    }
    .Mask{
        background: linear-gradient(90deg,rgba(0,0,0,0) 60%,rgba(255,255,255,1) 100%);
        height: .44rem;
        position: absolute;
        width: 2.7rem;
        margin-left: 1rem;
        top: .2rem;
    }
    h3{
        font-size: .36rem;
        font-family: SimHei;
        font-weight: bold;
        color: #333333;
        line-height: .44rem;
        text-align: center;
        width: 2.7rem;
        margin-left: 1rem;
        overflow: hidden;
        height: .44rem;
    }
    img{
        height: auto !important;
    }
}

</style>

