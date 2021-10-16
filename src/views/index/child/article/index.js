import React, { memo } from "react";
import { ArticleWrapper } from "./style";
import { Route, Link, useHistory } from "react-router-dom";

export default memo(function IndexArticle(props) {
  const { articleList,refresh } = props;
  const history = useHistory();
  // console.log(articleList);
  // const itemClick = (id) => {
  //   // console.log(id);
  //   // history.push(`/articleDetail/${id}`)
  //   // history.push(`/articleDetail?id=${id}`);
  // };

  return (
    <ArticleWrapper>
      <div className="article-content">
        {articleList.map((item, index) => {
          return (
            <Link
              key={item.id}
              to={`/articleDetail?id=${item.id}&categoryId=${item.categoryId}`}
              target="_blank"
            >
              <div className="item">
                <div>
                  <div className="category">
                    <div className="type">{item.keywords}</div>
                    <div className="time">{item.dateAdd}</div>
                  </div>
                  <div className="title overflow">{item.title}</div>
                  <div className="desc overflow">{item.descript}</div>
                  <div className="other_info">
                    <div className="views">
                      <i className="iconfont icon-yueduliang"></i>
                      {item.views + 1}
                    </div>
                    <div className="collect">
                      <i className="iconfont icon-shoucang"></i>
                      {item.numberFav}
                    </div>
                    <div className="like">
                      <i className="iconfont icon-31dianzan"></i>
                      {item.usefulNumber}
                    </div>
                  </div>
                </div>
                <div className="pic">
                  <img src={item.pic} alt="1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </ArticleWrapper>
  );
});
