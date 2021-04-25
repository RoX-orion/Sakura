import request from '@/utils/request'

export function getLoginHistory(data){
    return request ({
        url: 'login-history',
        method: 'get',
        params: {
          count: data.count,
          page: data.page
        }
    })
}

export function getSysInfo(){
    return request({
      url: 'system',
      method: 'get'
    })
  }
  
  export function getStaticInfo(){
    return request({
      url: 'staticInfo',
      method: 'get'
    })
  }
  
  export function getDatabaseLiveInfo(data){
    return request({
      url: 'getDatabaseLiveInfo',
      method: 'post',
      data
    })
  }
  
  export function getProcessInfo() {
    return request({
      url: 'getProcessInfo',
      method: 'post'
    })
  }

  export function getThreadInfo() {
      return request({
          url: 'api/getThreadInfo',
          method: 'post'
      })
  }