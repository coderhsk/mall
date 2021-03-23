import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

