import request from '@/utils/request'

/**
 * 登录API
 */
export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/api/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息，每次刷新网页vuex值会丢失因此会调用
 */
export function getInfo() {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/api/info',
    method: 'get'
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}

export function changeUserInfo(data){
  return request({
    url: 'api/changeUserInfo',
    method: 'post',
    data
  })
}
