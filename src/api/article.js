import request from '@/utils/request'

export function addArticle(data) {
  return request({
    url: 'api/addArticle',
    method: 'post',
    data
  })
}

export function saveArticle(data) {
  return request({
    url: 'api/saveArticle',
    method: 'post',
    data
  })
}