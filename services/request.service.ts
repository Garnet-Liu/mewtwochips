import axios from "axios";

import { auth } from "@/services/firebase-client.service";

// 创建 axios 请求实例
const requestService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 基础请求地址
  timeout: 600000, // 请求超时设置
});

// 是否正在请求刷新token接口的标记
let isRefreshing = false;
// 请求队列
let requests: ((token: string) => void)[] = [];

//刷新token方法
const refreshToken = () => {
  const user = auth.currentUser;
  if (user) {
    return user.getIdToken(true);
  } else {
    return Promise.reject(new Error("user is not login"));
  }
};

// 添加响应拦截器
requestService.interceptors.response.use((response) => {
  console.log("response", response);
  // 对响应数据做点什么
  return response?.data;
}, async (error) => {
  // 对响应错误做点什么
  // 接下来会在这里进行token过期的逻辑处理
  const config = error.config;
  const { statusCode } = error.response.data;
  //这里的code值是跟后端约定好的， 40009代表token已经过期
  if (statusCode === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      return refreshToken().then((token) => {
        requestService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        config.headers["Authorization"] = `Bearer ${token}`;
        requests.forEach((cb) => cb(token));
        requests = [];
        return requestService(config);
      }).catch(() => {
        requests = [];
        auth.signOut();
      }).finally(() => {
        isRefreshing = false;
      });
    } else {
      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((access_token: string) => {
          config.headers["Authorization"] = `Bearer ${access_token}`;
          resolve(requestService(config));
        });
      });
    }
  } else {
    return Promise.reject(error);
  }
});

export default requestService;
