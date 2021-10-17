import axios from "axios";
import request from "../request";

export function getUserTokenStatus(token) {
  return request({
    url: "/user/check-token",
    params: {
      token,
    },
  });
}

export function emailLogin(obj) {
  return request({
    url: "/user/email/login",
    method: "post",
    params: {
      ...obj,
    },
  });
}

export function nameLogin(obj) {
  return request({
    url: "/user/username/login",
    method: "post",
    params: {
      ...obj,
    },
  });
}

export function getUserDetail(token) {
  return request({
    url: "/user/detail",
    params: {
      token,
    },
  });
}

export function setOfficialLogin() {
  return axios({
    url:"https://user.api.it120.cc/login/key", 
    method: "post",
    params: {
      merchantNo: "	2101262089656468",
      merchantKey: "8437bd27b8ec8c381de0077fac4876e0",
    },
  });
}
