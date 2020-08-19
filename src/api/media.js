import request from '@/utils/request'

/**
 * 添加卡片
 * @param {卡片信息} data 
 */
export function addCard(data){
  return request({
    url: 'api/addCard',
    method: 'post',
    data
  })
}

/**
 * 
 * @param {分页数据} data 
 */
export function getCard(data){
  return request({
    url: 'api/getCard',
    method: 'post',
    data
  })
}

export function bilibili(){
  return request({
    url: 'api/bilibili',
    method: 'post'
  })
}