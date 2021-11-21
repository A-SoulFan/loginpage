import axios from "axios";
import {message} from "ant-design-vue";

export const http = axios.create({
  baseURL: 'http://api.asoulfan.com/',
  timeout: 10000,
})

http.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
  if (config.method === 'get') {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use((response) => {
  // 处理响应数据
  if (response.headers['Set-Cookie']) {
    console.log(response.headers['Set-Cookie']);
    document.cookie= `cookie=${response.headers['Set-Cookie']}`
  }
  return response;
}, (error) => {
  // 处理响应错误
  message.error(error.message || error)
  return Promise.reject(error);
});



