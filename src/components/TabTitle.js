import React from "react";

const TabTitle = ({ title, setSelectedTab, index }) => {
  return (
    <li className="list_title">
      <button onClick={() => setSelectedTab(index)}>{title}</button>
    </li>
  );
};

export default TabTitle;
