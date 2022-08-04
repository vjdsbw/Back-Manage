import request from '@/utils/request'


// 获取新闻信息

export function getNews(id) {
  return request({
    url: '/api/snews',
    method: 'get',
    params: { id },
  })
}

//增加数据
export function createNews(data) {
  return request({
    url: '/api/snews/create',
    method: 'post',
    data,
  })
}


// 删除新闻信息
export function deleteNews(num) {
  console.log(num)
  return request({
    url: `/api/snews/delete?num=${num}`,
    method: 'get',
  })
}

//获取新闻详情
export function getNewsData(num) {
  console.log(num, '111')
  return request({
    url: `/api/snews/newsList?num=${num}`,
    method: 'get',
  })
}

//修改新闻
export const exitNews = data => {
  return request({
    url: `/api/snews/exit`,
    method: 'post',
    data,
  })
}
