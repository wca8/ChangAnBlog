import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ArticleDetailWrapper } from "./style";

import { getArticleDetail } from "@/service/index";

import { MY_ACCOUNT_ID, AVATAR_UTL } from "@/common/contants";
import RelevantArticle from "./relevant-article";
import LikeArticle from "./like";
import CommentArtivle from "./comment";
import { getArticleListAction } from "@/views/index/store/actionCreators";
import BackTop from "../back-top";
import storage from "@/utils/storage";

import { useScrollPosition } from "@/hooks";

export default memo(function ArticleDetail(props) {
  const titleRef = useRef();
  const rightRef = useRef();
  const likeRef = useRef();
  let arr = props.location.search.split("&");
  let id = arr[0].split("=")[1];
  let categoryId = arr[1].split("=")[1];

  const [articleInfo, setarticleInfo] = useState([]);
  const [contentHeight, setcontentHeight] = useState(0);

  let { articleList, footerHeight } = useSelector(
    (state) => ({
      articleList: state.getIn(["index", "articleList"]),
      footerHeight: state.getIn(["public", "footerHeight"]),
    }),
    shallowEqual
  );

  useEffect(() => {
    flagFun();
  }, []);

  const dispath = useDispatch();

  useEffect(() => {
    dispath(getArticleListAction(categoryId));
  }, [dispath]);

  // 获取文章详情
  const flagFun = () => {
    getArticleDetail(id).then((res) => {
      console.log(res);
      setarticleInfo(res.data);
    });
  };

  useEffect(() => {
    document.title = articleInfo.info&&articleInfo.info.title;
  });

  const position = useScrollPosition();

  useEffect(() => {
    // 设置主要内容高度
    setcontentHeight(titleRef.current.offsetHeight);
    const maxPosition = titleRef.current.offsetHeight - footerHeight;
    if (position > 100) {
      rightRef.current.classList.add("current");
      likeRef.current.classList.remove("likeCurrent");
    }

    if (position > maxPosition) {
      rightRef.current.classList.remove("current");
      likeRef.current.classList.add("likeCurrent");
    }
  });

  return (
    <ArticleDetailWrapper>
      <div ref={titleRef} className="left">
        {Object.keys(articleInfo).length > 0 ? (
          <div>
            <div className="title">{articleInfo.info.title}</div>
            <div className="time">
              <div>
                发布时间:
                {articleInfo.info.dateAdd}
              </div>
              <div>
                阅读:
                {articleInfo.info.views}
              </div>
            </div>

            <div className="cover-pic">
              <img src={articleInfo.info.pic} alt="" />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: articleInfo.info.content }}
              className="content"
            ></div>

            {/* 文章留言 */}
            <CommentArtivle
              num={articleInfo.info.commentNumber}
              flagFun={(e) => flagFun()}
              id={articleInfo.info.id}
            ></CommentArtivle>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div ref={rightRef} className="right">
        {Object.keys(articleInfo).length > 0 ? (
          <div>
            <div className="author">
              <h4>作者简介</h4>
              {articleInfo.info.userId == MY_ACCOUNT_ID ? (
                <div className="info">
                  <div>
                    <img src={AVATAR_UTL} alt="" />
                  </div>
                  <div>
                    <div className="name">
                      官方文章
                      <i className="iconfont icon-guanfang"></i>
                      <i className="iconfont icon-renzheng"></i>
                    </div>
                    <div className="sign">一手伸向技术，一手伸向生活!</div>
                  </div>
                </div>
              ) : (
                <div>2</div>
              )}
            </div>

            <div className="article">
              <h4>相关文章</h4>
              <RelevantArticle articleList={articleList}></RelevantArticle>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <LikeArticle
        ref={likeRef}
        contentHeight={contentHeight}
        flagFun={(e) => flagFun()}
        articleInfo={articleInfo}
      ></LikeArticle>

      <BackTop></BackTop>
    </ArticleDetailWrapper>
  );
});
