import React, { memo } from "react";
import {
  WEIXIN_IMG_URL,
  QQ_IMG_URL,
  WEIBO_IMG_URL,
  DOUYIN_IMG_URL,
  KUAISHOU_IMG_URL,
} from "@/common/contants";

import { ContactWrapper } from "./style";

export default memo(function Contact() {
  return (
    <ContactWrapper>
      <h3>联系我们</h3>
      <div className="main">
        <div>
          <div>
            <img src={WEIXIN_IMG_URL} alt="" />
          </div>
          <div>微信</div>
        </div>
        <div>
          <div>
            <img src={QQ_IMG_URL} alt="" />
          </div>
          <div>QQ</div>
        </div>
        <div>
          <div>
            <img src={WEIBO_IMG_URL} alt="" />
          </div>
          <div>微博</div>
        </div>
        <div>
          <div>
            <img src={DOUYIN_IMG_URL} alt="" />
          </div>
          <div>抖音</div>
        </div>
        <div>
          <div>
            <img src={KUAISHOU_IMG_URL} alt="" />
          </div>
          <div>快手</div>
        </div>
      </div>
    </ContactWrapper>
  );
});
