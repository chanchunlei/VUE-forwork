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
          component: resolve => require(['../components/alone/default.vue'],resolve),
          meta: {
            title: '系统首页',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'default',
        },
        {
          path: '/journaling',
          component: resolve => require(['../components/alone/journaling.vue'],resolve),
          meta: {
            title: '报表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'journaling',
        },
        {
          path: '/ranking',
          component: resolve => require(['../components/alone/ranking.vue'],resolve),
          meta: {
            title: '商品排行',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'ranking',
        },
        {
          path: '/default/member',
          component: resolve => require(['../components/memberList/member.vue'],resolve),
          meta: {
            title: '会员规模',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'membershipSize'
        },
        {
          path: '/default/contribution',
          component: resolve => require(['../components/memberList/contribution.vue'],resolve),
          meta: {
            title: '会员贡献',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'memberContribution'
        },
        {
          path: '/default/memberList',
          component: resolve => require(['../components/memberList/memberList.vue'],resolve),
          meta: {
            title: '会员列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'memberList'
        },
        {
          path: '/default/transaction/:strBncCode',
          component: resolve => require(['../components/memberList/transaction.vue'],resolve),
          meta: {
            title: '交易信息',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'transaction'
        },
        {
          path: '/default/record/:strBncCode',
          component: resolve => require(['../components/memberList/record.vue'],resolve),
          meta: {
            title: '会员详情',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'record'
        },
        {
          path: '/default/groupAdd',
          component: resolve => require(['../components/membership/addGroup.vue'],resolve),
          meta: {
            title: '人群新增',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'groupAdd'
        },
        {
          path: '/default/grouplist',
          component: resolve => require(['../components/membership/groupList.vue'],resolve),
          meta: {
            title: '群列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'groupList'
        },
        {
          path: '/default/groupmember/:cid',
          component: resolve => require(['../components/membership/groupMember.vue'],resolve),
          meta: {
            title: '群成员列表',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'groupmember'
        },
        {
          path: '/default/groupdetail/:cid',
          component: resolve => require(['../components/membership/groupDetail.vue'],resolve),
          meta: {
            title: '群详情',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'groupdetail'
        },
        {
          path: '/default/cardHistory',
          component: resolve => require(['../components/cardCenter/cardHistory.vue'],resolve),
          meta: {
            title: '发券记录',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'cardHistory'
        },
        {
          path: '/default/couponDistribution',
          component: resolve => require(['../components/cardCenter/couponDistribution.vue'],resolve),
          meta: {
            title: '优惠券分布',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'couponDistribution'
        },
        {
          path: '/default/couponDetail',
          component: resolve => require(['../components/cardCenter/couponDetail.vue'],resolve),
          meta: {
            title: '优惠券详情',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'couponDetail'
        },
        {
          path: '/default/cardGroupDetail/:log_id',
          component: resolve => require(['../components/cardCenter/cardGroupDetail.vue'],resolve),
          meta: {
            title: '发券详情',
            requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
          },
          name: 'cardGroupDetail'
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
          },
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
