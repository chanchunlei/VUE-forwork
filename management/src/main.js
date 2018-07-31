// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'    //使用路由
import  ElementUI from 'element-ui'  // 引入饿了么ui
import 'element-ui/lib/theme-chalk/index.css'  //饿了么ui样式

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
