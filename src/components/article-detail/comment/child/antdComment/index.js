import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { Comment, Avatar, Tooltip } from "antd";
import moment from "moment";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AntdCommentWrapper } from "./style";
import { Input, Button, message } from "antd";
import { useToken } from "@/hooks/index";
import { setArticleComment, getArticleComment } from "@/service/article";
import { ReactEmojiEditor } from 'react-emotor'

const { TextArea } = Input;
const { Panel } = Collapse;

export default memo(function AntdComment(props) {
  const {id, arr ,flagFun,refreshComment,page} = props;
  const [replyValue, setreplyValue] = useState("");
  const history = useHistory();


  const onChange = (e) => {
    setreplyValue(e.target.value);
  };

  const SublitReply = async (pid) => {
    // 判断token是否有效
    const token = await useToken();
    
    if (replyValue.trim().length < 1) {
      message.error("输入内容不得为空!");
      return;
    }

    if (token) {
      let obj = {
        content: replyValue,
        token,
        pid,
        refId: id,
      };
      const res = await setArticleComment(obj);
      if (res.code == 0) {
        for(var i=1;i<=page;i++){
          
          refreshComment(i);
          console.log(i);
        }
        
        flagFun();
        message.success("留言成功!");
      }
    } else {
      history.push("/login");
    }

    console.log(id+"--------"+pid+"-------------"+ replyValue);
    setreplyValue("");
  };



  return (
    <AntdCommentWrapper>
      {arr.length>0? (
        arr.map((item, index) => {
        return (
          <div key={item.id}>
            {item.id}
            <Comment
              actions={[
                <span key="comment-nested-reply-to">
                  <Collapse
                    ghost={true}
                    bordered={false}
                    accordion={true}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header="回复TA"
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <TextArea
                        className="TextArea"
                        placeholder="你想对TA说点啥?"
                        allowClear
            
                        value={replyValue}
                        onChange={onChange}
                      />
                     
                     
                      <Button
                        onClick={(e) => SublitReply(item.id)}
                        size="small"
                      >
                        提交回复
                      </Button>
                    </Panel>
                  </Collapse>
                
                </span>
              ]}
              author={item.commentUserInfo.nick}
              avatar={
                <Avatar src={item.commentUserInfo.avatarUrl} alt="Han Solo" />
              }
              content={item.content}
              datetime={
                <Tooltip
                  title={moment(item.dateAdd).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(item.dateAdd).fromNow()}</span>
                </Tooltip>
              }
            >
              {item.children.length > 0 ? (
                <Comment1 name={item.commentUserInfo.nick} page={page} id={id} flagFun={flagFun} refreshComment={refreshComment} arr={item.children}></Comment1>
              ) : (
                <div></div>
              )}
            </Comment>
          </div>
        );
      })):(<div>
        
      </div>)
     
    
    }
    </AntdCommentWrapper>
  );
});

function Comment1(props) {
  const {id, arr ,flagFun,refreshComment,page,name} = props;
  const [replyValue, setreplyValue] = useState("");
  const history = useHistory();

 
  const onChange = (e) => {
    setreplyValue(e.target.value);
  };

  const SublitReply = async (pid) => {
    // 判断token是否有效
    const token = await useToken();
    
    if (replyValue.trim().length < 1) {
      message.error("输入内容不得为空!");
      return;
    }

    if (token) {
      let obj = {
        content: replyValue,
        token,
        pid,
        refId: id,
      };
      const res = await setArticleComment(obj);
      if (res.code == 0) {
        for(var i=1;i<=page;i++){
          
          refreshComment(i);
          console.log(i);
        }
        
        flagFun();
        message.success("留言成功!");
      }
    } else {
      history.push("/login");
    }
    setreplyValue("");
  };

  return (
    <div>
      {arr.map((item, index) => {
        return (
          <div key={item.id}>
            {item.id}
            <Comment
              actions={
               
               [<Collapse
                    ghost={true}
                    bordered={false}
                    accordion={true}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header="回复TA"
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <TextArea
                        className="TextArea"
                        placeholder="你想对TA说点啥?"
                        allowClear
            
                        value={replyValue}
                        onChange={onChange}
                      />
                     
                     
                      <Button
                        onClick={(e) => SublitReply(item.id)}
                        size="small"
                      >
                        提交回复
                      </Button>
                    </Panel>
                  </Collapse>]
              }
              author={item.commentUserInfo.nick}
              avatar={
                <Avatar src={item.commentUserInfo.avatarUrl} alt="Han Solo" />
              }
              content={`@${name}回复: `+item.content}
              datetime={
                <Tooltip
                  title={moment(item.dateAdd).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(item.dateAdd).fromNow()}</span>
                </Tooltip>
              }
            >
              {item.children.length > 0 ? (
                <Comment2 name={item.commentUserInfo.nick}   page={page} id={id} flagFun={flagFun} refreshComment={refreshComment} arr={item.children}></Comment2>
              ) : (
                <div></div>
              )}
            </Comment>
          </div>
        );
      })}
    </div>
  );
}

function Comment2(props) {
  const {id, arr ,flagFun,refreshComment,page,name} = props;
  const [replyValue, setreplyValue] = useState("");
  const history = useHistory();


  const onChange = (e) => {
    setreplyValue(e.target.value);
  };

  const SublitReply = async (pid) => {
    // 判断token是否有效
    const token = await useToken();
    
    if (replyValue.trim().length < 1) {
      message.error("输入内容不得为空!");
      return;
    }

    if (token) {
      let obj = {
        content: replyValue,
        token,
        pid,
        refId: id,
      };
      const res = await setArticleComment(obj);
      if (res.code == 0) {
        for(var i=1;i<=page;i++){
          refreshComment(i);
          console.log(i);
        }
        
        flagFun();
        message.success("留言成功!");
      }
    } else {
      history.push("/login");
    }

    console.log(id+"--------"+pid+"-------------"+ replyValue);
    setreplyValue("");
  };

  return (
    <div>
      {arr.map((item, index) => {
        return (
          <div key={item.id}>
            {item.id}
            <Comment
             actions={
              [<Collapse
                    ghost={true}
                    bordered={false}
                    accordion={true}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                  >
                    <Panel
                      header="回复TA"
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <TextArea
                        className="TextArea"
                        placeholder="你想对TA说点啥?"
                        allowClear
            
                        value={replyValue}
                        onChange={onChange}
                      />
                     
                     
                      <Button
                        onClick={(e) => SublitReply(item.id)}
                        size="small"
                      >
                        提交回复
                      </Button>
                    </Panel>
                  </Collapse>]
              }
              author={item.commentUserInfo.nick}
              avatar={
                <Avatar src={item.commentUserInfo.avatarUrl} alt="Han Solo" />
              }
              content={`@${name}回复: `+item.content}
              datetime={
                <Tooltip
                  title={moment(item.dateAdd).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(item.dateAdd).fromNow()}</span>
                </Tooltip>
              }
            >
              {item.children.length > 0 ? (
                <Comment1 name={name} page={page} id={id} flagFun={flagFun} refreshComment={refreshComment} arr={item.children}></Comment1>
              ) : (
                <div></div>
              )}
            </Comment>
          </div>
        );
      })}
    </div>
  );
}