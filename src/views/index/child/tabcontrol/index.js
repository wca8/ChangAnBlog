import React, { memo, useState } from "react";
import { TabcontrolWrapper } from "./style";
import { NavLink } from "react-router-dom";

export default memo(function TabControl(props) {
  let { indexMenu, tabClick } = props;

  const [currentIndex, setcurrentIndex] = useState(0);
  const itemClick = (index, id) => {
    setcurrentIndex(index);
    tabClick(id);
  };
  return (
    <TabcontrolWrapper>
      <div className="tab-control">
        {indexMenu.map((item, index) => {
          return (
            <div
              className={"item " + (index === currentIndex ? "active" : "")}
              onClick={(e) => itemClick(index, item.id)}
              key={item.id}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </TabcontrolWrapper>
  );
});
