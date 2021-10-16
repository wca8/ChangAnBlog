import { Map } from "immutable";
import * as actionTypes from "./constants";

const defaultState = Map({

  tokenStatus: false,
  userDetail: {},
  footerHeight: 400,

});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.TOKEN_STATUS:
      return state.set("tokenStatus", action.tokenStatus);
    case actionTypes.USER_DETAIL:
      return state.set("userDetail", action.userDetail);
    case actionTypes.FOOTER_HEIGHT:
      return state.set("footerHeight", action.footerHeight);

    default:
      return state;
  }
}

export default reducer;
