import React, { memo } from "react";

import { CopyrightWrapper } from "./style";

export default memo(function Copyright() {
  return (
    <CopyrightWrapper>
      <div className="main">
          <div>鲁ICP备2021013178号</div>
          <div> Copyright © 2020-2021 一片月 版权所有</div>
       
      </div>
    </CopyrightWrapper>
  );
});
