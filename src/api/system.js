import request from '@/utils/request'

export function getSysInfo(){
  return request({
    url: 'api/system',
    method: 'get'
  })
}

export function test(){
  return request({
    url: 'info',
    method: 'post'
  })
}