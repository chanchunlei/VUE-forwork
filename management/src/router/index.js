import Vue from 'vue'
import Router from 'vue-router'
//import Login from '.././views/login.vue'
//import NotFound from '.././views/404.vue'
//import Home from '.././views/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',//去掉#号
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../views/login.vue'],resolve)
    },
    {
      path: '/404',
      name: 'NotFound',
      component: resolve => require(['../views/404.vue'],resolve)
    },
    {
      path: '/',
        redirect: '/default'
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../views/index.vue'],resolve),
      meta: {title: '自述文件'},
      children:[
        {
          path: '/default',
          component: resolve => require(['../components/indexCharts/default.vue'],resolve),
          meta: {title: '系统首页'}
        },
        {
          path: '/set',
          component: resolve => require(['../components/set.vue'],resolve),
          meta: {title: '设置'}
        },
        {
          path: '/user',
          component: resolve => require(['../components/user.vue'],resolve),
          meta: {title: '账户管理'}
        },
        {
          path: '/member',
          component: resolve => require(['../components/memberList/memberList.vue'],resolve),
          meta: {title: '会员列表'}
        },
        {
          path: '/baseCharts',
            component: resolve => require(['../components/charts/baseCharts.vue'],resolve),
          meta: {title: '会员分析'}
        },
        {
          path: '/details',
            component: resolve => require(['../components/memberList/details.vue'],resolve),
          meta: {title: '会员详情'}
        },
        {
          path: '/record',
            component: resolve => require(['../components/memberList/record.vue'],resolve),
          meta: {title: '交易记录'}
        },
        {
          path: '/groupAdd',
            component: resolve => require(['../components/membership/addGroup.vue'],resolve),
          meta: {title: '增加群'}
        },
        {
          path: '/grouplist',
            component: resolve => require(['../components/membership/groupList.vue'],resolve),
          meta: {title: '群列表'}
        },
        {  //使用的还是会员列表，但是有参数传输
          path: '/groupmember',
            component: resolve => require(['../components/membership/groupMember.vue'],resolve),
          meta: {title: '群成员列表'}
        }
      ]
    }
  ]
})
