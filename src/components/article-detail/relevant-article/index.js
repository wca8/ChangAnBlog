import React, { memo } from "react";
import { RelevantArticleWrapper } from "./style";
import { Route, Link, useHistory } from "react-router-dom";
export default memo(function RelevantArticle(props) {
  const { articleList } = props;
  console.log(articleList);
  return (
    <RelevantArticleWrapper>
      <div className="content">
        {articleList.map((item, index) => {
          return (
            <div key={item.id} className="item">
              <Link
                key={item.id}
                to={`/articleDetail?id=${item.id}&categoryId=${item.categoryId}`}
                target="_blank"
              >
                <div title={item.title} className="title overflow">
                  {item.title}
                </div>
                <div className="like">
                  <div>
                    <i className="iconfont icon-yueduliang"></i>
                    {item.views}
                  </div>
                  <div>
                    <i className="iconfont icon-liuyan"></i>
                    {item.commentNumber}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </RelevantArticleWrapper>
  );
});
