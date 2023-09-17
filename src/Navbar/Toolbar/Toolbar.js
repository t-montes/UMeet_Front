import "./Toolbar.css";
import React from "react";
import SideMenu from "../Sidemenu/Sidemenu";
import logo from "../../assets/large-logo.png";
import language_icon from "../../assets/language-icon.webp";

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
      {/*<div className="spacer" />*/}
      <div className="toolbar_navigation-items toolbar_navigation-disable">
        <ul>
          <li>
            <a href="/">Mi Horario</a>
          </li>
          <li>
            <a href="/friends">Amigos</a>
          </li>
          <li>
            <a href="/groups">Grupos</a>
          </li>
        </ul>
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <a href="/#">Español</a>
          </li>
          <li>
            <a href="/friends">t.tamaio</a>
          </li>
          <li>
            <a href="/friends"><i class="fa fa-gear"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
