import * as actionTypes from "./constants";

const changeArticleCategoryAction = (categoryList) => ({
  type: actionTypes.ARTICLE_CATEGORY_LIST,
  categoryList,
});

const changeArticleListAction = (articleList) => ({
  type: actionTypes.ARTICLE_LIST,
  articleList,
});

const changeArticleCommentListAction = (articleCommentList) => ({
  type: actionTypes.ARRICLE_COMMENT_LIST,
  articleCommentList,
});

export {
  changeArticleCategoryAction,
  changeArticleListAction,
  changeArticleCommentListAction,
};
