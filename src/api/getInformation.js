import request from '@/utils/request'

export function getLoginHistory(){
    return request ({
        url: 'api/login-history',
        method: 'get'
    })
}