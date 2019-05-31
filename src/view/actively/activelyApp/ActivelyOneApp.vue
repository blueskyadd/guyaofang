<template>
    <div class="activelyApp">
        <headerApp :title="actively.activelyName"/>
        <div class="actively_main">
            <div>
                <img v-for="(item,  index) in actively.activelyPosterImg" :key="index" :src="item.url" alt="">
                <div>
                </div>
            </div>
        </div>
        <div class="actively_footer">
            <div>
                <span>
                    <i><img src="../../../assets/img/active.png" alt=""></i>
                    {{actively.activelyLinkPhone}}
                </span>
                <span>剩余人数: {{actively.activelyPeopleNumber}}人</span>
            </div>
            <div>立即参与</div>
        </div>
    </div> 
</template>
<script>
import headerApp from "../../../components/header/headerApp.vue";
export default {
    name:'activeOneApp',
    components: {headerApp},
    props:{
        actively:{
            type:Object,
            required:true
        }
    }
}
</script>
<style lang="scss" scoped>
.activelyApp{
    height: 100%;
    position: relative;
    .actively_main{
        padding: .64rem 0 .9rem;
        height:6.3rem;
        overflow: hidden;
        overflow-y: scroll;
    }
    .actively_footer{
        background: #FF803A;
        height: .9rem;
        position: absolute;
        width: 100%;
        bottom: 0;
        display: flex;
        line-height: .9rem;
        div:first-child{
            background:#fff;
            font-size:.18rem;
            color:rgba(45,102,96,1);
            width:3rem;
            padding-left: .2rem;
            span:first-child{
                margin-right: .15rem;
                display: block;
                line-height: .9rem;
                float: left;
                width: 1.5rem;
                height: .9rem;
                i{
                    font-style: normal;
                    display: block;
                    width: .32rem;
                    float: left;
                    margin-top: .25rem;
                }
            }
            span:last-child{
                float: left;
                width: 1.35rem;
            }
            span{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        div:last-child{
            color: #fff;
            font-size: .2rem;
            padding: 0rem .31rem;
        }

    }
}
</style>
