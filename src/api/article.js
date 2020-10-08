import request from '@/utils/request'

export function addPost(data) {
  return request({
    url: 'api/addPost',
    method: 'post',
    data
  })
}

export function savePost(data) {
  return request({
    url: 'api/savePost',
    method: 'post',
    data
  })
}