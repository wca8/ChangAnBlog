import React, { Component } from "react";
import axios from "axios";

import UEditor from "../ueditor";
import { WriteArticleWrapper } from "./style";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input, Button, Select, Upload, message } from "antd";
import { getArticleCategory } from "@/service/index";
import { setOfficialLogin } from "@/service/user";
import { setUserWriteArticle } from "@/service/article";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

export default class AddMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      categoryList: [],
      title: "",
      desc: "",
      category: "",
      keywords: "",
      ypyToken: "",
      pic: "",
      uploadTips: "上传封面图片",
      uid: "",
    };

    this.uid=props.location.search&&props.location.search.split('=')[1]

  }

  async componentDidMount() {
      
    // 1.修改DOM
    document.title = "一片月-文章管理";
   
    setOfficialLogin().then((res) => {
      console.log(res);
      this.setState({
        ypyToken: res.data.data,
      });
    });

    getArticleCategory().then((res) => {
      const list = res.data.filter((item) => {
        return item.id != 57390;
      });
      this.setState({
        categoryList: list,
      });
    });

    
  }

  async componentWillUnmount() {
   
    console.log("调用了Cpn的componentWillUnmount方法");
  }

  render() {
    let { content, categoryList, category, pic, uploadTips, desc } = this.state;

    return (
      <WriteArticleWrapper>
        <div className="top-info">
          <div className="title">
            <div className="title-item">文章管理</div>
            <Input
              onChange={(e) => {
                this.inputChange(e, "title");
              }}
              maxLength={30}
              placeholder="文章标题(30字内)"
            />
          </div>
          <div className="submit-btn">
            <Button
              onClick={() => {
                this.submitClick();
              }}
              className="publish-article"
              size="middle"
              type="primary"
            >
              发布内容
            </Button>
            <Avatar size={38} icon={<UserOutlined />} />
          </div>
        </div>
        <div className="desc">
          <Input
            onChange={(e) => {
              this.inputChange(e, "desc");
            }}
            placeholder="文章描述"
          />
          <Input
            onChange={(e) => {
              this.inputChange(e, "keywords");
            }}
            placeholder="关键词"
          />
          <Select
            placeholder="文章类型"
            style={{ width: 120 }}
            onChange={(value) => {
              this.categoryChange(value);
            }}
          >
            {categoryList.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Upload
            disabled={pic.length > 0}
            showUploadList={false}
            customRequest={(info) => {
              this.customRequest(info);
            }}
          >
            <Button icon={<UploadOutlined />}>{uploadTips}</Button>
          </Upload>
        </div>

        <UEditor
          className="UEditor"
          content={content}
          onChange={this.handleUEditorChange}
          editorHandle={this.editorHandle}
          ue={this.ue}
        />
      </WriteArticleWrapper>
    );
  }
  submitClick() {
    let { content, category, pic, keywords, desc, title, ypyToken } =
      this.state;
    this.tips(title, "标题不能为空!");
    this.tips(keywords, "关键词不能为空!");
    this.tips(desc, "文章描述不能为空!");
    this.tips(category, "请选择文章类型!");
    this.tips(content, "文章详情不能为空!");
    this.tips(pic, "请上传文件封面图!");

    let obj = {
      content,
      descript: desc,
      title,
      categoryId: category,
      keywords,
      pic,
    };
    setUserWriteArticle(obj, ypyToken).then((res) => {
      console.log(res);
    });
  }

  tips(type, tips) {
    if (type.length == 0) {
      message.error(tips);
      return;
    }
  }

  customRequest(file) {
    console.log(file);
    let fd = new FormData();
    fd.append("upfile", file.file);

    axios({
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Token": this.state.ypyToken,
      },
      url: "https://user.api.it120.cc/fileUpload",
      method: "post",
      data: fd,
    }).then((res) => {
      console.log(res);
      if (res.data.code == 0) {
        message.success("封面图上传成功!");
      } else {
        message.error("封面图上传失败!");
      }

      this.setState({
        pic: res.data.data.url,
        uploadTips: "封面图X1",
      });
    });
  }

  handleUEditorChange = (content) => {
    this.setState({
      content,
    });
    console.log(content);
  };

  categoryChange(value) {
    this.setState({
      category: value,
    });
  }

  inputChange(e, type) {
    const value = e.target.value;
    console.log(value);
    switch (type) {
      case "title":
        this.setInputValue(type, value);
        break;
      case "desc":
        this.setInputValue(type, value);
        break;
      case "keywords":
        this.setInputValue(type, value);
        break;
      default:
        return;
    }
  }

  setInputValue(type, value) {
    this.setState({
      [type]: value,
    });
  }

  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     console.log("执行了组件的componentDidUpdate方法");
  //   }
}
