import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({//路由模块懒加载
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../views/login.vue'],resolve)
    },
    {
      path: '/',
        redirect: '/default'
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['../views/index.vue'],resolve),
      meta: {
        title: '自述文件',
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      },
      children:[
        {
          path: '/default',
          component: resolve => require(['../components/usechart/default.vue'],resolve),
          meta: {
            title: '系统首页',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'default',
        },
        {
          path: '/default/member',
          component: resolve => require(['../components/memberList/member.vue'],resolve),
          meta: {
            title: '会员规模',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/default/contribution',
          component: resolve => require(['../components/memberList/contribution.vue'],resolve),
          meta: {
            title: '会员贡献',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/default/memberList',
          component: resolve => require(['../components/memberList/memberList.vue'],resolve),
          meta: {
            title: '会员列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/default/record',
          component: resolve => require(['../components/memberList/record.vue'],resolve),
          meta: {
            title: '交易记录',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/default/groupAdd',
          component: resolve => require(['../components/membership/addGroup.vue'],resolve),
          meta: {
            title: '人群新增',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/default/grouplist',
          component: resolve => require(['../components/membership/groupList.vue'],resolve),
          meta: {
            title: '群列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {  //使用的还是会员列表，但是有参数传输
          path: '/default/groupmember/:cid',
          component: resolve => require(['../components/membership/groupMember.vue'],resolve),
          meta: {
            title: '群成员列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'groupmember'
        },
        {  //使用的还是会员列表，但是有参数传输
          path: '/default/groupdetail/:cid',
          component: resolve => require(['../components/membership/groupDetail.vue'],resolve),
          meta: {
            title: '群详情',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'groupdetail'
        },
        {
          path: '/set',
          component: resolve => require(['../components/admin/set.vue'],resolve),
          meta: {
            title: '管理员列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'set'
        },
        {
          path: '/set/roleList',
          component: resolve => require(['../components/admin/list.vue'],resolve),
          meta: {
            title: '角色列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'roleList'
        },
        {
          path: '/set/roleList/authority/:id/:name',
          component: resolve => require(['../components/admin/authority.vue'],resolve),
          meta: {
            title: '设置权限',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'authority'
        },
        {
          path: '/403',
          name: 'NoPower',
          component: resolve => require(['../components/403.vue'],resolve),
          meta: {
            title: '403',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/404',
      name: 'NotFound',
      component: resolve => require(['../views/404.vue'],resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
