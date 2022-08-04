import request from '@/utils/request'

//注册接口
export const Registered = data => {
  return request({
    url: '/api/registered',
    method: 'post',
    data,
  })
}

// 获取注册用户信息
export const GetUserinfo = () => {
  return request({
    url: '/api/userinfo',
    method: 'get',
  })
}
