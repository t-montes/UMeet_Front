import "./Toolbar.css";
import React, { useContext } from "react";
import SideMenu from "../Sidemenu/Sidemenu";
import logo from "../../assets/large-logo.png";
import AppContext from "../../AppContext";

const Toolbar = props => {

  const ctx = useContext(AppContext);
  const { lang, langSet, setLang } = ctx;

  const changeLang = () => {
    if (lang === 'es') {
      setLang('en');
    } else {
      setLang('es');
    }
  }

  return (
  <header className="toolbar">
    <nav className="toolbar_navigator">
      <div />
      <div className="toggle-btn">
        <SideMenu click={props.drawerToggleClickHandler} />
      </div>
      <div className="toolbar_logo">
        <a href="/" title={langSet["UMeetLogo"]}>
            <img src={logo} alt="Umeet Logo"/>
        </a>
      </div>
      {/*<div className="spacer" />*/}
      <div className="toolbar_navigation-items toolbar_navigation-center">
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
      </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
            <button title={langSet["Notifications"]}><i className="fa fa-bell"></i></button>
          </li>
          <li>
            <button title={langSet["Language"]} onClick={changeLang}>
              <i className="fa fa-globe"></i>&nbsp;{lang.toUpperCase()}
            </button>
          </li>
          <li className="toolbar-user-button">
            <a title={langSet["Profile"]} href="/friends">t.tamaio</a>
          </li>
          <li className="toolbar-settings-button">
            <a title={langSet["Settings"]} href="/friends"><i className="fa fa-gear"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)};

export default Toolbar;
