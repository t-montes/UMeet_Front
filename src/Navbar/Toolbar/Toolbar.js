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
        <a href="/">
            <img src={logo} alt="Umeet Logo"/>
        </a>
      </div>
      {/*<div className="spacer" />*/}
      <div className="toolbar_navigation-items toolbar_navigation-center">
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
            <a href="/"><i className="fa fa-bell"></i></a>
          </li>
          <li>
            <button onClick={changeLang}>
              <i className="fa fa-globe"></i>&nbsp;{lang.toUpperCase()}
            </button>
          </li>
          <li className="toolbar-user-button">
            <a href="/friends">t.tamaio</a>
          </li>
          <li className="toolbar-settings-button">
            <a href="/friends"><i className="fa fa-gear"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)};

export default Toolbar;
