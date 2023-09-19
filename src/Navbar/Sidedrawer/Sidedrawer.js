import "./Sidedrawer.css";
import React, { useContext } from "react";
import AppContext from "../../AppContext";

const Sidedrawer = props => {

  const ctx = useContext(AppContext);
  const { langSet } = ctx;

  let drawerClasses = ["side-drawer"];

  if (props.show) {
    drawerClasses = ["side-drawer", "open"];
  }
  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <li>
          <a href="/">{langSet["MySchedule"]}</a>
        </li>
        <li>
          <a href="/friends">{langSet["Friends"]}</a>
        </li>
        <li>
          <a href="/groups">{langSet["Groups"]}</a>
        </li>
      </ul>
    </nav>
  );
};
export default Sidedrawer;
