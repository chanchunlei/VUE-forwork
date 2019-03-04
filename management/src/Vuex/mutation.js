import router from "../router/router";

const NAV_SHOW = 'NAV_SHOW';
const LOGOUT = 'LOGOUT';
const LOGIN = 'LOGIN';
const MENU = 'MENU';
const LOADING = 'LOADING'
const LOADING_DONE = 'LOADING_DONE';
const TAGS_LIST = 'TAGS_LIST';
export default{
  [NAV_SHOW](state,pathName){//导航显示部分
    state.pathName = pathName;
  },
  [LOGIN](state){//登入
    state.userName = sessionStorage.getItem("userName");
    state.token = sessionStorage.getItem("token");
    sessionStorage.setItem("isLogin",true);
    state.isLogin= true;
  },
  [LOGOUT](state){//登出
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLogin");
    state.token = '';
    state.isLogin= false;
    router.replace({
      path: '/login'
    })
  },
  [MENU](state){//左侧菜单显示
    state.menu = !state.menu;
  },
  [LOADING](state){//加载中
    state.loading = true;
  },
  [LOADING_DONE](state){//加载结束
    state.loading = false;
  },
  [TAGS_LIST](state,newcache){//tags缓存
    state.cache = newcache;
  }
}
