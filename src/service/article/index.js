import request from "../request";
import { PAGE_SIZE } from "@/common/contants";
import axios from "axios";
export function setArticleLike(token, id) {
  return request({
    url: "/cms/news/useful",
    method: "post",
    params: {
      token,
      id,
    },
  });
}

export function setArticleFav(token, newsId) {
  return request({
    url: "/cms/news/fav/add",
    method: "post",
    params: {
      token,
      newsId,
    },
  });
}

export function setArticleComment(obj, type = 3) {
  return request({
    url: "/comment/add",
    method: "post",
    params: {
      ...obj,
      type,
    },
  });
}

export function getArticleComment(obj, pageSize = PAGE_SIZE) {
  return request({
    url: "/comment/list",
    method: "post",
    params: {
      ...obj,
      pageSize,
    },
  });
}

export function setUserWriteArticle(obj,token) {
  return axios({
    url: "https://user.api.it120.cc/user/apiExtNews/save",
    headers:{
      'X-Token':token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method:'post',
    params:{
      ...obj
    }
  });
}
