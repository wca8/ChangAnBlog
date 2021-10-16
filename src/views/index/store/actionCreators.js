import {
  changeArticleCategoryAction,
  changeArticleListAction,
  changeArticleCommentListAction
} from "./changeAction";

import { getArticleCategory, getArticleList } from "@/service/index";
import {getArticleComment} from '@/service/article'
export function getArticleCategoryAction() {
  return async (dispatch, getState) => {
    const res = await getArticleCategory();
    dispatch(changeArticleCategoryAction(res.data));
  };
}

export function getArticleListAction(id,page) {
  return async (dispatch, getState) => {
    console.log(id,page);
    const res = await getArticleList(id,page);
    console.log(res);
    if (res.data === undefined) {
      dispatch(changeArticleListAction([]));
      return;
    }
    dispatch(changeArticleListAction(res.data.result));
  };
}

export function getArticleCommentListAction(obj) {
  return async (dispatch, getState) => {
    const res = await getArticleComment(obj);
   
    if (res.data === undefined) {
      dispatch(changeArticleCommentListAction([]));
      return;
    }
    dispatch(changeArticleCommentListAction(res.data));
  };
}

