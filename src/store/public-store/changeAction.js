import * as actionTypes from "./constants";

const changeTokenStatusAction = (tokenStatus) => ({
  type: actionTypes.TOKEN_STATUS,
  tokenStatus
});

const changeUserDetailAction = (userDetail) => ({
  type: actionTypes.USER_DETAIL,
  userDetail
});



const changeFooterHeightAction = (footerHeight) => ({
  type: actionTypes.FOOTER_HEIGHT,
  footerHeight
});




export { 
    changeTokenStatusAction,
    changeUserDetailAction,
    changeFooterHeightAction 

 };
