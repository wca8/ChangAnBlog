import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { LikeArticleWrapper } from "./style";

import { Route, Link, useHistory } from "react-router-dom";

import { getUserTokenAction } from "@/store/public-store/actionCreators";
import { useToken } from "@/hooks/index";
import storage from "@/utils/storage";

import { message } from "antd";
import { setArticleLike, setArticleFav } from "@/service/article";
import { Button, notification, Space } from 'antd';
const LikeArticle = forwardRef((props, ref) => {
  const { articleInfo, flagFun, contentHeight } = props;
  const dispath = useDispatch();
  const history = useHistory();

  const LikeClick = async (type) => {

    // 判断token是否有效
    const token = await useToken();
    let handleFun;
    if (token) {
      if (type == "like") {
        handleFun = setArticleLike;
      } else if (type == "fav") {
        handleFun = setArticleFav;
      }

      const res = await handleFun(token, articleInfo.info.id);
      if (res.code == 0) {
        flagFun();
        message.success("操作成功!");
      }
    } else {
      history.push("/login");
    }
  };
  const commentClick = () => {
    let time=null
    let top=window.scrollY
    time= setInterval(() => {
      top+=100
      if(top>(contentHeight-600)){
        clearInterval(time)
      }
      window.scrollTo(0,top) 
    },1);
  };

  const reportClick=()=>{
    notification['success']({
      message: '举报通知',
      description:
        '尊敬的一片月用户，我们已经收到啦您对此文章的举报，我们将会尽快何时，感谢您对营造绿色网络环境的贡献!',
    });
  }
  return (
    <LikeArticleWrapper ref={ref}>
      {Object.keys(articleInfo).length > 0 ? (
        <div className="content">
          <div onClick={(e) => LikeClick("like")} className="item">
            <i className="iconfont icon-31dianzan"></i>
            <div>{articleInfo.info.usefulNumber}</div>
          </div>
          <div onClick={ commentClick} className="item">
            <i className="iconfont icon-liuyan"></i>
            <div>{articleInfo.info.commentNumber}</div>
          </div>
          <div onClick={(e) => LikeClick("fav")} className="item">
            <i className="iconfont icon-shoucang"></i>
            <div>{articleInfo.info.numberFav}</div>
          </div>
          <div onClick={reportClick} className="item">
            <i className="iconfont icon-jubao"></i>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </LikeArticleWrapper>
  );
});

export default memo(LikeArticle);
