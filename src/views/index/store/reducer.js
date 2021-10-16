import { Map } from "immutable";
import * as actionTypes from "./constants";

// const defaultState ={
//     topBanners: [],

// };

const defaultState = Map({
  categoryList: [],
  articleList: [],
  articleCommentList:[]
});

// function reducer(state = defaultState, action) {
//     switch (action.type) {
//         case actionTypes.CHANGE_TOP_BANNERS:
//             return {...state,topBanners:action.topBanners}
//         default:
//             return state;
//     }
// }
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.ARTICLE_CATEGORY_LIST:
      return state.set("categoryList", action.categoryList);
    case actionTypes.ARTICLE_LIST:
      return state.set("articleList", action.articleList);
    case actionTypes.ARRICLE_COMMENT_LIST:
      return state.set("articleCommentList", action.articleCommentList);
    default:
      return state;
  }
}

export default reducer;
