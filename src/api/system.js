import request from '@/utils/request'

export function getSysInfo(){
  return request({
    url: 'api/system',
    method: 'get'
  })
}

export function test(){
  return request({
    url: 'api/login-history',
    method: 'get'
  })
}