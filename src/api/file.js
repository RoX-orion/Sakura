import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: 'uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function getFileList() {
  return request({
    url: 'getFileList',
    method: 'post'
  })
}

export function deleteFile(data) {
  return request({
    url: 'deleteFile',
    method: 'post',
    data
  })
}