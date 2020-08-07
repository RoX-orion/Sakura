import request from '@/utils/request'

export function getLoginHistory(page){
    var begin = (page-1) * 20
    var end = page * 20
    return request ({
        url: 'api/login-history',
        method: 'get',
        params: { begin, end }
    })
}