import axios from 'axios'
import store from "../Vuex/store";
import router from "../router/router";
axios.interceptors.request.use(//请求前
  config => {
    if(store.state.token){//判断token是否存在
      config.headers.Authorization = `Bearer ${store.state.token}`;//拼接token
    }
    store.commit('LOADING');//加载动画
    // const isEXCLE = file.type === ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel");
    // if (!isEXCLE) {
    //   config.responseType: 'json',
    // }
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(//请求结束
  response => {
    store.commit('LOADING_DONE');//加载结束
    switch (Number(response.data.code)) {//请求失败状态返回值
      case 201://操作失败
        store.commit('LOGOUT');
        break;
      case 403:// 返回 403 账号密码错误
        store.commit('LOGOUT');
        break;
      case 404:// 404 请求地址错误
        router.push('/404');
        break;
      case 504://无权限
        router.push('/403');
        break;
      case 505:// token认证失败
        store.commit('LOGOUT');
        break;
      case 530://请求数据格式错误
        //console.log('请求数据格式错误');
        break;
    }
    //console.log(response);
    return response;
  },
  error => {
    if (error.response) {
      switch (Number(error.response.data.code)) {//请求失败状态返回值
        case 201://操作失败
              store.commit('LOGOUT');
              break;
        case 403:// 返回 403 账号密码错误
              store.commit('LOGOUT');
              break;
        case 404:// 404 请求地址错误
              router.push('/404')
              break;
        case 504://无权限
              router.push('/403')
              break;
        case 505:// token认证失败
              store.commit('LOGOUT');
              break;
        case 530://请求数据格式错误
             //console.log('请求数据格式错误');
              break;
      }
    }
    console.log(error.response)
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });
