import request from '@/utils/request'



export function test(){
  return request({
    url: 'info',
    method: 'post'
  })
}