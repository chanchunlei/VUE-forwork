import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getters'
Vue.use(Vuex);
const state = {
  pathName: '/default',//导航显示部分
  loading: true,  //加载动画
  menu: false, //侧边栏的状态
  name: 'default',//切换nav时的name
  userName:'',//用户名
  token: '', //登录状态
  isLogin: false
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

})
