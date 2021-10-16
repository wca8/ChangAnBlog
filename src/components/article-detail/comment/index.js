import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { CommentArticleWrapper } from "./style";
import { useToken } from "@/hooks/index";

import { setArticleComment, getArticleComment } from "@/service/article";
import { Button } from "antd";
import { Input, message } from "antd";
import { getArticleCommentListAction } from "@/views/index/store/actionCreators";
import { Comment, Tooltip, Avatar } from "antd";
import { handleComment, deDuplication, sumPage, caSort } from "@/utils/comment";
import AntdComment from "./child/antdComment";
import { Empty } from "antd";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { TextArea } = Input;

export default memo(function CommentArtivle(props) {
  const { id, flagFun, num } = props;
  const [value, setvalue] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const [commentList, setcommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, settotalPage] = useState(sumPage(num));
  const [coments, setcoments] = useState([]);
  const [flag, setflag] = useState(false);
  let { articleCommentList } = useSelector(
    (state) => ({
      articleCommentList: state.getIn(["index", "articleCommentList"]),
    }),
    shallowEqual
  );

  
  useEffect(() => {
    console.log(`page${page}============================`);
    if (articleCommentList.length == 0) return false;
    console.log("articleCommentList变化啦---------------------");
    console.log(articleCommentList);
    setcoments(deDuplication([...coments, ...articleCommentList]));
    const _flag = articleCommentList.every((item) => {
      return item.pid > 0;
    });  
    if (_flag) {
      setflag(true);
    }
  }, [articleCommentList]);


  useEffect(()=>{
    const _flag = articleCommentList.every((item) => {
      return item.pid > 0;
    });
    if (flag&&_flag) {
      setPage(page + 1);
    }
  },[flag])

  useEffect(() => {
    let newComments = handleComment(coments);
    setcommentList(caSort(newComments));
  }, [coments]);

 
  let obj = {
    refId: id,
    type: 3,
  };

  useEffect(() => {
    dispatch(getArticleCommentListAction(obj));
  }, [dispatch]);

  const onChange = (event) => {
    let value = event.target.value;
    setvalue(value);
  };

  // 刷新评论
  const refreshComment = (page) => {
    //bug处理 当页码大于总页数时
    if(page>totalPage&&totalPage!=0){
      setPage(totalPage)
      page=totalPage
    }
    console.log('asdsadasd');
    let obj = {
      refId: id,
      type: 3,
      page,
    };
    dispatch(getArticleCommentListAction(obj));
  };

  const SubmitComment = async () => {
    // 判断token是否有效
    const token = await useToken();
    // 判断输入内容是否为空
    if (value.trim().length < 1) {
      message.error("输入内容不得为空!");
      return;
    }

    if (token) {
      let obj = {
        content: value,
        token,
        refId: id,
      };
      const res = await setArticleComment(obj);
      if (res.code == 0) {
        for (var i = 1; i <= page; i++) {
          refreshComment(i);
        }
        flagFun();
        message.success("留言成功!");
      }
    } else {
      history.push("/login");
    }
  };

  // 点击加载更多评论
  let timer = null;
  const loadMoreClick = () => {
    console.log("加載更多");
    clearTimeout(timer);
    timer = setTimeout(() => {
      setPage(page + 1);
    }, 500);
  };

  useEffect(() => {
    console.log("刷新", page);
    if (flag) {
      refreshComment(page);
      setflag(false);
    } else {
      for (let i = 1; i <= page; i++) {
        refreshComment(i);
      }
    }
  }, [page]);

  return (
    <CommentArticleWrapper>
      <TextArea
        placeholder="请留下友善的评论！"
        allowClear
        autosize={{ minRows: 6 }}
        showCount="true"
        onChange={onChange}
        className="textarea"
        onPressEnter={SubmitComment}
      />
      <Button
        size="middle"
        className="submitBtn"
        onClick={SubmitComment}
        type="primary"
      >
        发布评论
      </Button>
      <h2>{page}</h2>
      <h2>总页数{totalPage}</h2>
      <div className="comment_list">
        {articleCommentList.length > 0 ? (
          <div>
            <AntdComment
              id={id}
              page={page}
              refreshComment={refreshComment}
              flagFun={flagFun}
              arr={commentList}
            ></AntdComment>
            {page < totalPage ? (
              <Button onClick={(e) => loadMoreClick()} className="loadMore">
                加载更多...
              </Button>
            ) : (
              <Empty
                description="已经到底部啦，暂无更多评论数据!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        ) : (
          <Empty description="暂无评论数据!" />
        )}
      </div>
    </CommentArticleWrapper>
  );
});
