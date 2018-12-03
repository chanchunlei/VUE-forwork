import Vue from 'vue'  //引入vue
import App from './App' //引入视图容器
import VueRouter from 'vue-router'//使用路由
import routes from './routers'  //路由配置文件
import ElementUI from 'element-ui'  //引入element-ui
import 'element-ui/lib/theme-chalk/index.css' //使用element的css
import babelpolyfill from 'babel-polyfill'  //引入babel-polyfill
import Vuex from 'vuex' //引入vuex
import store from './vuex/store' //引入vuex文件夹中的store
// 注册全局组件
// Vue.component("users",Users)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)
const router = new VueRouter({
  mode: 'history',//去掉#号
  routes
})
/*
router.beforeEach((to,from,next) => {
  if(to.path == '/login'){
       sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if(!user && to.path != '/login'){
   next({ path: '/login' })
  } else {
   next()
  }

})
*/

new Vue({ //实例化对象
  el: '#app',/*最后效果将会替换页面中id为app的div元素*/
  router,//使用路由
  store,
  components: { App },
  template: '<App/>'//告知当前页面想使用App这个组件
})
/*
main.js此文件为整个项目的逻辑文件
index.html整个项目的逻辑主文件
import用于导入需要以来的文件，例如上方组件中，
想要引入App组件，那么首先要使用import引入这个组件文件
*/
