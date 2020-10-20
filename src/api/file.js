import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: 'api/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function getFileList() {
  return request({
    url: 'api/getFileList',
    method: 'post'
  })
}

export function deleteFile(data) {
  return request({
    url: 'api/deleteFile',
    method: 'post',
    data
  })
}