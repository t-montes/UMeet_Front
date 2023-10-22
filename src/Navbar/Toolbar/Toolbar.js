import "./Toolbar.css";
import React, { useContext, useState, useEffect, useRef } from "react";
import SideMenu from "../Sidemenu/Sidemenu";
import DropdownMenu from "../../DropdownMenu/DropdownMenu";
import DropdownFriends from "../../FriendsPage/DropdownFriends/DropdownFriends";
import logo from "../../assets/large-logo.png";
import AppContext from "../../AppContext";

const Toolbar = props => {
  const ctx = useContext(AppContext);
  const { lang, langSet, setLang, user } = ctx;

  const changeLang = () => {
    if (lang === 'es') {
      setLang('en');
    } else {
      setLang('es');
    }
  }

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Ref para el botón de notificaciones
  const notificationButtonRef = useRef(null);
  
  // Ref para el dropdownMenu
  const dropdownMenuRef = useRef(null);

  // Efecto para cerrar el DropdownMenu cuando se hace clic en cualquier parte excepto en el menú o el botón de notificaciones
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        open &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    // Agregar el manejador de eventos al documento
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Limpiar el manejador de eventos al desmontar el componente
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

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
      <div className="toolbar_navigation-items toolbar_navigation-center">
        <ul>
          <li>
            <a href="/">{langSet["MySchedule"]}</a>
          </li>
          <li>
            <div
                className="menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button>{langSet["Friends"]}</button>
                {/* <DropdownMenu /> */}
                {isDropdownVisible && <DropdownFriends />}
            </div>
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
            <button
              ref={notificationButtonRef}
              title={langSet["Notifications"]}
              onClick={toggleDropdown}
            >
              <i className="fa fa-bell"></i>
            </button>
            {open && (
              <div ref={dropdownMenuRef} data-testid="notifications-dropdown">
                <DropdownMenu />
              </div>
            )}
          </li>
          <li>
            <button title={langSet["Language"]} onClick={changeLang}>
              <i className="fa fa-globe"></i>&nbsp;{lang.toUpperCase()}
            </button>
          </li>
          <li className="toolbar-user-button">
            <a title={langSet["Profile"]} href="/">{user?.username}</a>
          </li>
          <li className="toolbar-settings-button">
            <a title={langSet["Settings"]} href="/settings"><i className="fa fa-gear"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)};

export default Toolbar;
