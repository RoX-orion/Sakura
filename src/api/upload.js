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