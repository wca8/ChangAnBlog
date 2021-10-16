import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import TabControl from "./child/tabcontrol";
import IndexArticle from "./child/article";
import { Button } from "antd";
import { INIT_ARTICLE_CATEGORY_ID } from "@/common/contants";

import {
  getArticleCategoryAction,
  getArticleListAction,
} from "./store/actionCreators";

import { IndexWrapper, IndexMainWrapper } from "./style";
import { deDuplication } from "@/utils/comment";
import { message, Space } from "antd";
export default memo(function Index() {
  const [page, setpage] = useState(1);
  const [currentId, setcurrentId] = useState(INIT_ARTICLE_CATEGORY_ID);
  const [refresh, setrefresh] = useState(false);
  const [flag, setflag] = useState(false);
  const [articleListArr, setarticleListArr] = useState({
    57390: { page: 1, list: [] },
    56496: { page: 1, list: [] },
    56497: { page: 1, list: [] },
    56498: { page: 1, list: [] },
    56499: { page: 1, list: [] },
    56500: { page: 1, list: [] },
    56501: { page: 1, list: [] },
    56502: { page: 1, list: [] },
    56503: { page: 1, list: [] },
    57388: { page: 1, list: [] },
    57389: { page: 1, list: [] },
  });
  let { categoryList, articleList } = useSelector(
    (state) => ({
      categoryList: state.getIn(["index", "categoryList"]),
      articleList: state.getIn(["index", "articleList"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleCategoryAction());
    setArticleList(INIT_ARTICLE_CATEGORY_ID);
  }, [dispatch]);

  useEffect(() => {
    setrefresh(!refresh);
  }, []);

  const tabClick = (id) => {
    setArticleList(id);
    setcurrentId(id);
  };

  useEffect(() => {
    if (articleList.length == 0 && flag == true) {
      setflag(false);
      message.warning("已经到底啦呦,暂无更多数据!");
      return;
    }
    const newArr = { ...articleListArr };
    newArr[currentId].list.push(...articleList);
    newArr[currentId].list = deDuplication(newArr[currentId].list);
    setarticleListArr(newArr);
  }, [articleList]);

  const setArticleList = (id, page) => {
    dispatch(getArticleListAction(id, page));
  };

  let timer = null;
  const loadMoreArticleClick = () => {
    clearInterval(timer);
    timer = setTimeout(() => {
      const newArr = { ...articleListArr };
      newArr[currentId].page++;
      setarticleListArr(newArr);
      setflag(true);
    }, 800);
  };
  console.log(currentId, articleListArr[currentId]);

  useEffect(() => {
    setArticleList(currentId, articleListArr[currentId].page);
  }, [articleListArr[currentId].page]);
  return (
    <IndexWrapper>
      <TabControl
        tabClick={(id) => tabClick(id)}
        indexMenu={categoryList}
      ></TabControl>

      <IndexMainWrapper>
        <div className="left">
          <IndexArticle
            refresh={refresh}
            articleList={articleListArr[currentId].list}
          ></IndexArticle>
          <Button
            onClick={(e) => loadMoreArticleClick()}
            className="loadMoreArticle"
          >
            点击加载更多文章
          </Button>
        </div>

        <div className="right"></div>
      </IndexMainWrapper>
    </IndexWrapper>
  );
});
