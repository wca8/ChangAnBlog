import axios from "axios";
import { Spin } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { BASE_URL, TIMEOUT } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  retry: 6,
  retryDelay: 1000,
});

// 当前正在请求的数量
let requestCount = 0

// 显示loading
function showLoading () {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        document.body.appendChild(dom)
        ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
    }
    requestCount++
}

// 隐藏loading
function hideLoading () {
    requestCount--
    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading'))
    }
}


instance.interceptors.request.use(
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 3.params/data序列化的操作
    showLoading()
    return config;
  },
  (err) => {}
);

instance.interceptors.response.use(
  (res) => {
    hideLoading ()
    return res.data;
  },
  (err) => {
    hideLoading ()
    console.log(err)
    var config = err.config;
    // 如果配置不存在或未设置重试选项，则拒绝

    if (!config || !config.retry) return Promise.reject(err);

    // 设置变量以跟踪重试次数

    config.__retryCount = config.__retryCount || 0;

    // 检查我们是否已经注销了总重试次数

    if (config.__retryCount >= config.retry) {
      // 剔除错误

      return Promise.reject(err);
    }

    // 增加重试次数

    config.__retryCount += 1;

    // 创建新的异步对象来处理重试请求

    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, config.retryDelay || 1);
    });


    return backoff.then(function() {
      return instance(config);
    });
  }
);

export default instance;
