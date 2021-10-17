import React, { Component } from "react";
import { isToken } from "@/hooks/index";
import { withRouter } from "react-router-dom";
class UEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  async componentDidMount() {
    //   判断是否登录
    this.token();

    let script = document.createElement("script");
    script.setAttribute("src", "static/ueditor/ueditor.config.js");
    document.getElementsByTagName("head")[0].appendChild(script);
    script = document.createElement("script");
    script.setAttribute("src", "static/ueditor/ueditor.all.min.js");
    document.getElementsByTagName("head")[0].appendChild(script);

    script.onload = () => {
      let UE = window.UE;
      var ue = UE.getEditor("container", {
        UEDITOR_HOME_URL: "../static/ueditor/",
        serverUrl: "/ueditor",
        initialFrameHeight: 300,
        toolbars: [
          [
            "undo", //撤销
            "redo", //重做
            "bold", //加粗
            "italic", //斜体
            "underline", //下划线
            "strikethrough", //删除线
            "subscript", //下标
            "superscript", //上标
            "source", //源代码
            "blockquote", //引用
            "pasteplain", //纯文本粘贴模式
            "horizontal", //分隔线
            "removeformat", //清除格式
            "unlink", //取消链接
            "inserttitle", //插入标题
            "simpleupload", //单图上传
            "insertimage", //多图上传
            "link", //超链接
            "emotion", //表情
            "spechars", //特殊字符
            "searchreplace", //查询替换
            "map", //Baidu地图
            "insertvideo", //视频
            "justifyleft", //居左对齐
            "justifyright", //居右对齐
            "justifycenter", //居中对齐
            "justifyjustify", //两端对齐
            "fullscreen", //全屏
            "imagecenter", //居中
            "edittip ", //编辑提示
            "customstyle", //自定义标题
            "background", //背景
            "scrawl", //涂鸦
            "music", //音乐
            "inserttable", //插入表格
            "drafts", // 从草稿箱加载
            "charts", // 图表
            "fontfamily", //字体
            "fontsize", //字号
            "insertcode", //代码语言
            "insertorderedlist", //有序列表
            "insertunorderedlist", //无序列表
            "lineheight", //行间距
            "rowspacingtop", //段前距
            "rowspacingbottom", //段后距
            "forecolor", //字体颜色
            "backcolor", //背景色
            "preview", //预览
          ],
        ],
      });

      this.editor = ue;

      ue.addListener("contentChange", () => {
        this.props.onChange(ue.getContent());
      });
    };

   
  }

  async componentWillUnmount() {
    this.editor && this.editor.destroy();
    let child = document.getElementById("edui_fixedlayer");
    if (child) child.parentNode.removeChild(child);
  }

  async token() {
    const token = await isToken();
    if (!token) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <textarea
          id="container"
          name="blog"
          type="text/plain"
          onChange={() => {}}
          value={this.props.content}
          style={{ margin: "15px 0" }}
        ></textarea>
      </div>
    );
  }
}

export default withRouter(UEditor);
