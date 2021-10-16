import request from '../request'

export function getLinksList(){
    return request({
        url:'/friendly-partner/list',
        method:'post',
        params:{
            type:'1'
        }
    })
}


export function getOfficialLinks(){
    return request({
        url:'/friendly-partner/list',
        method:'post',
        params:{
            type:'2'
        }
    })
}