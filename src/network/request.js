import axios from 'axios'

export function request(config) {

  // 1.创建实例
  const instance = axios.create({
    baseURL: 'http://xxxxxxx',
    timeout: 5000
  })

  // 2.1 axios的拦截器 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.真正发生请求
  return instance(config)

}
