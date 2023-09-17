import "./Toolbar.css";
import React from "react";
import SideMenu from "../Sidemenu/Sidemenu";
import logo from "../../assets/large-logo.png";

const Toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_navigator">
      <div />
      <div className="toggle-btn">
        <SideMenu click={props.drawerToggleClickHandler} />
      </div>
      <div className="toolbar_logo">
        <a href="/">
            <img src={logo} alt="Umeet Logo" />
        </a>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="/user">User</a>
          </li>
          <li>
            <a href="/music">Music</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
