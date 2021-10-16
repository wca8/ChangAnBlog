import React, { memo } from "react";

import { BackTopWrapper } from "./style";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useScrollPosition } from "@/hooks";
export default memo(function BackTop() {
  const position = useScrollPosition();

  const jumpTop = () => {
    let timer = null;
    try {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 350;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {position > 800 ? (
        <BackTopWrapper onClick={jumpTop}>
          <ArrowUpOutlined />
        </BackTopWrapper>
      ) : (
        <div></div>
      )}
    </div>
  );
});
