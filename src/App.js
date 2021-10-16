import React, { memo, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routes from "./router";

import store from "./store";
import { Provider } from "react-redux";

import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import { Spin } from 'antd';

import zhCN from 'antd/lib/locale/zh_CN';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader></AppHeader>
        <Suspense fallback={<Spin tip="加载中..." size="large"/>}>
          {renderRoutes(routes)}
        </Suspense>
        <AppFooter></AppFooter>
      </HashRouter>
    </Provider>
  );
}

export default App;
