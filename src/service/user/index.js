import request from "../request";

export function getUserTokenStatus(token) {
  return request({
    url: "/user/check-token",
    params: {
      token
    },
  });
}

export function emailLogin(obj){
  return request({
    url:'/user/email/login',
    method:'post',
    params:{
      ...obj
    }
  })
}

export function nameLogin(obj){
  return request({
    url:'/user/username/login',
    method:'post',
    params:{
      ...obj
    }
  })
}

export function getUserDetail(token){
  return request({
    url:'/user/detail',
    params:{
      token
    }
  })
}