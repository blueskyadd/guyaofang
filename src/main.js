// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import http from "./track/http.js";
import 'element-ui/lib/theme-chalk/index.css'
import conf from "./config/index.js";
import $ from 'jquery'

Vue.use(ElementUI)

Vue.prototype.$http = http
Vue.prototype.$conf = conf
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
