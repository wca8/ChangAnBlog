import request from "../request";
import { SHOP_ID } from "@/common/contants";
export function getArticleCategory() {
  return request({
    url: "/cms/category/list",
    params:{
        shopId:SHOP_ID 
    }
  });
}

export function getArticleList(categoryId,page=1,pageSize=4) {
  return request({
    url: "/cms/news/list/v2",
    method:'post',
    params:{
      page,
      pageSize,
      categoryId,
    }
  });
}


export function getArticleDetail(id) {
  return request({
    url: "/cms/news/detail/v2",
    // method:'post',
    params:{
      id
    }
  });
}