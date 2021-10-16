import {
  changeTokenStatusAction,
  changeUserDetailAction,
  changeFooterHeightAction,

} from "./changeAction";

import { getUserTokenStatus, getUserDetail } from "@/service/user";

export function getUserTokenAction(token) {
  return async (dispatch, getState) => {
    const res = await getUserTokenStatus(token);
    if (res.code == 2000) {
      dispatch(changeTokenStatusAction(false));
      return;
    }
    dispatch(changeTokenStatusAction(true));
    console.log(res);
  };
}

export function setUserDetailAction(token) {
  return async (dispatch, getState) => {

    console.log(token);
    const res = await getUserDetail(token);
    console.log(res);
    dispatch(changeUserDetailAction(res.data.base));

  };
}

export function setFooterHeightAction(height) {
  return async (dispatch, getState) => {
    dispatch(changeFooterHeightAction(height));

  };
}
