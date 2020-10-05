import request from '@/utils/request'

export function getLoginHistory(data){
    return request ({
        url: 'api/login-history',
        method: 'post',
        data
    })
}

export function getSysInfo(){
    return request({
      url: 'api/system',
      method: 'get'
    })
  }
  
  export function getStaticInfo(){
    return request({
      url: 'api/getStaticInfo',
      method: 'post'
    })
  }
  
  export function getDatabaseLiveInfo(data){
    return request({
      url: 'api/getDatabaseLiveInfo',
      method: 'post',
      data
    })
  }
  
  export function getProcessInfo() {
    return request({
      url: 'api/getProcessInfo',
      method: 'post'
    })
  }

  export function getThreadInfo() {
      return request({
          url: 'api/getThreadInfo',
          method: 'post'
      })
  }