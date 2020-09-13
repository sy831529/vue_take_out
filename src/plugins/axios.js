"use strict";

import Vue from 'vue';
import axios from "axios";
import router from "../router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

// http request 拦截器
_axios.interceptors.request.use(
    // 这里的config包含每次请求的内容
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = token
        console.log(config);
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
);

// http response 拦截器
_axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        if (error.response.status===401) {
            // 返回 401 清除token信息并跳转到登录页面
            // Message({
            //   showClose: true,
            //   center: true,
            //   type: 'error',
            //   message: 'token已失效！请重新登录',
            // });
              alert('token已失效！请重新登录', 'warning:', {
                  confirmButtonText: '确定',
                  callback: action => {
                      _this.$message({
                          center: true,
                          type: 'warning',
                          message: 'token已失效！请重新登录',
                      });
                  }
              });
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              router.replace('/');
        }
      }
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
);
Vue.use(Plugin)

export default Plugin;
