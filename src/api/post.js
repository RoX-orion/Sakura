import request from '@/utils/request'

export function addPost(data) {
  return request({
    url: 'post',
    method: 'post',
    data
  })
}

export function getPostList(data) {
  return request({
    url: 'postList',
    method: 'get',
    params: {
      page: data.page,
      count: data.count
    }
  })
}

export function savePost(data) {
  return request({
    url: 'post',
    method: 'put',
    data
  })
}

export function addTerm(data) {
  return request({
    url: 'addTerm',
    method: 'post',
    data
  })
}

export function getTerm() {
  return request({
    url: 'getTerm',
    method: 'get',
  })
}