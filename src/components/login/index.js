import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Route, Link, useHistory } from "react-router-dom";

import { LoginWrapper } from "./style";
import { Tabs } from "antd";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Radio, message } from "antd";

import storage from "@/utils/storage";
import { emailLogin } from "@/service/user";
import { setUserDetailAction } from "@/store/public-store/actionCreators";
import { Switch } from "antd";

export default memo(function Login() {
  const { TabPane } = Tabs;
  const [mailAccount, setmailAccount] = useState("");
  const [mailPassword, setmailPassword] = useState("");
  const [nameAccount, setnameAccount] = useState("");
  const [namePassword, setnamePassword] = useState("");
  const [isRememberPassword, setisRememberPassword] = useState(true);
  const [key, setkey] = useState(1);

  const history = useHistory();
  const dispath = useDispatch();

  function callback(key) {
    console.log(key);
    setkey(key);
  }
  const loginClick = async () => {
    console.log(key);
    if (key == 1) {
      // 邮箱登录
      console.log(mailAccount, mailPassword);
      let obj = {
        deviceId: "一片月",
        deviceName: "长安",
        pwd: mailPassword,
        email: mailAccount,
      };
      const res = await emailLogin(obj);
      if (res.code == 0) {
        storage.set("token", res.data.token);
        message.info("登录成功,正在跳转首页!");
        dispath(setUserDetailAction(res.data.token));
        history.push("/index");
      } else {
        message.info("账号或密码错误!");
      }
    } else {
      //用户名登录
      console.log(nameAccount, namePassword);
    }
  };

  const inputChange = (event, type) => {
    let value = event.target.value;
    switch (type) {
      case "mail":
        setmailAccount(value);
        break;
      case "mailPass":
        setmailPassword(value);
        break;
      case "name":
        setnameAccount(value);
        break;
      case "namePass":
        setnamePassword(value);
        break;
      default:
        return;
    }
  };

  const changeSwitch = (checked) => {
    console.log(checked);
  };
  return (
    <LoginWrapper>
      <div className="content">
        <div className="logo"></div>
        <div className="form">
          <Tabs
            className="tabs"
            tabBarGutter={150}
            centered="true"
            defaultActiveKey="1"
            onChange={callback}
          >
            <TabPane tab="邮箱登录" key="1">
              <Input
                defaultValue={mailAccount}
                size="large"
                placeholder="邮箱账号"
                className="account"
                onChange={(e) => inputChange(e, "mail")}
                prefix={<UserOutlined />}
              />
              <Input.Password
                defaultValue={mailPassword}
                size="large"
                className="password"
                onChange={(e) => inputChange(e, "mailPass")}
                prefix={<CopyOutlined />}
                placeholder="密码"
              />
              记住密码
              <Switch defaultChecked onChange={changeSwitch} />
              <Button
                onClick={(e) => loginClick()}
                className="login-btn"
                type="primary"
                size="large"
              >
                立即登录
              </Button>
            </TabPane>
            <TabPane tab="用户名登录" key="2">
              <Input
                defaultValue={nameAccount}
                size="large"
                placeholder="用户名账号"
                className="account"
                onChange={(e) => inputChange(e, "name")}
                prefix={<UserOutlined />}
              />

              <Input.Password
                defaultValue={namePassword}
                size="large"
                className="password"
                onChange={(e) => inputChange(e, "namePass")}
                prefix={<CopyOutlined />}
                placeholder="密码"
              />
              <Button
                onClick={(e) => loginClick()}
                className="login-btn"
                type="primary"
                size="large"
              >
                立即登录
              </Button>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </LoginWrapper>
  );
});
