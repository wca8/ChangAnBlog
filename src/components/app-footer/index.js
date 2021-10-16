import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { FooterWrapper } from "./style";
import { setFooterHeightAction } from "@/store/public-store/actionCreators";

import Contact from "./child/contact";
import Links from "./child/links";
import Copyright from "./child/copyright";
export default memo(function AppFooter() {
  const dispatch = useDispatch();
  const footerRef = useRef();
  useEffect(() => {
    const footerHeight = footerRef.current.offsetHeight;
    dispatch(setFooterHeightAction(footerHeight));
  });
  return (
    <FooterWrapper ref={footerRef}>
      <Contact></Contact>
      <Links></Links>
      <Copyright></Copyright>
    </FooterWrapper>
  );
});
