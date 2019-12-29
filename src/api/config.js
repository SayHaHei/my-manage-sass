import axios from "axios";
//创建一个axios实例
const service = axios.create({
  timeout: 3000 //请求超时时间
});
//添加请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log(err);
  }
);
//添加响应拦截器
service.interceptors.response.use(
  resp => {
    let res = {};
    res.status = resp.status;
    res.data = resp.data;
    return res;
  },
  err => {
    console.log(err);
  }
);

export default service;
