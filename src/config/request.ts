// @ts-ignore
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

// todo 目前是本地
const baseURL = '192.168.4.56'
export const service: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // todo
  // baseURL
});

service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 处理未授权错误，例如重定向到登录页面
    }
    return Promise.reject(error);
  }
);
