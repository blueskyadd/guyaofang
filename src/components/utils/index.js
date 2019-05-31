{/* <template>
    <div>
        <el-button :plain="true" @click="open2">成功</el-button>
        <el-button :plain="true" @click="open3">警告</el-button>
        <el-button :plain="true" @click="open">消息</el-button>
        <el-button :plain="true" @click="open4">错误</el-button>  
    </div>
</template>
<script>
export default {
     methods: {
      //Message 消息提示
      news(data) {
        this.$message(data);
      },
      successNews(data) {
        this.$message({
          message: data,
          type: 'success'
        });
      },
      warningNews(data) {
        this.$message({
          message: data,
          type: 'warning'
        });
      },
      errNews(data) {
        this.$message.error(data);
      }
    }
}
</script>
<style lang="scss" scoped>

</style> */}
import Vue from 'vue'
import { ToastPlugin } from 'vux';
Vue.use(ToastPlugin)

export default {
    /**
     * 获取链接参数
     * @param {string} name 参数名
     * @param {string} url 链接：可不传，不传时默认为当前页面链接
     */
    getQueryString(name, url) {
        var u = url != undefined || url != null ? url : window.location.href;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = u.slice(u.indexOf('?')).substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    /**
     * 写入Cookie
     * @param {string} name Cookie名称
     * @param {string} value Cookie值
     * @param {string} expiredays 过期时间：大于1是设置的销毁时间，单位是秒，例如1小时后销毁，就可以设置60*60
     */
    setCookie(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=yiguo.com";
    },
    /**
     * 获取Cookie
     * @param {string} name Cookie名称
     */
    getCookie(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=");
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) end = document.cookie.length;
                return decodeURIComponent(document.cookie.substring(start, end));
            }
        }
        return "";
    },
    /**
     * 清除cookie
     * @param {string} name Cookie名称
     */
    clearCookie(name) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + -1);
        document.cookie = name + "=" + encodeURIComponent("") + ((-1 == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;domain=yiguo.com";
    },
    clearToast(msg, time, width) {
        Vue.$vux.toast.show({ text: msg, position: 'middle', time: time || 2000, type: 'text', width: width || '5rem' })
    }
}
