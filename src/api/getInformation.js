import request from '@/utils/request'

export function getLoginHistory(data){
    return request ({
        url: 'api/login-history',
        method: 'post',
        data
    })
}