import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getLinksList, getOfficialLinks } from "@/service/footer";
import { LinksWrapper } from "./style";

import {
  XINLIZHAN_LOGO_URL,
  LOGO_URL,
  XINLIZHAN_URL,
  YIPIANYUE_URL,
} from "@/common/contants";

export default memo(function Links() {
  const [LinksList, setLinksList] = useState([]);
  const [officaLinks, setofficaLinks] = useState([]);

  useEffect(() => {
    getLinksList().then((res) => {
      console.log(res);
      setLinksList(res.data);
    });
    getOfficialLinks().then((res) => {
      console.log(res);
      setofficaLinks(res.data);
    });
  }, []);

  return (
    <LinksWrapper>
      <h3>友情链接</h3>
      <div className="official">
        <div>
          <a target="_blank" href={XINLIZHAN_URL}>
            <img src={XINLIZHAN_LOGO_URL} alt="" />
          </a>
        </div>
        <div>
          <a target="_blank" href={YIPIANYUE_URL}>
            <img src={LOGO_URL} alt="" />
          </a>
        </div>
      </div>

      <div className="friend_links">
        {LinksList.map((item, index) => {
          return (
            <div key={item.id}>
              <a target="_blank" href={item.linkUrl}>
                {item.title}
              </a>
            </div>
          );
        })}
      </div>
    </LinksWrapper>
  );
});
