import React, { useState, useEffect, useContext } from "react";
import "./DropdownMenu.css";
import AppContext from "../AppContext";

function DropdownMenu() {

  const { loadNotifications, langSet, lang } = useContext(AppContext);

  function formatTimeAgo(time, unit) {
    if (lang === 'es') {
      return `Hace ${time} ${unit}`;
    } else {
      return `${time} ${unit} ago`;
    }
  }

  function DropdownItem(props) {
    return (
      //Cambiar el primer div por "a" cuando funcione lo demás de notificaciones
      <div className="dropdown_menu-item">
        <div className="dropdown_menu-item-content">
          <div className={`dropdown_notification-text ${props.centered ? 'centered' : ''}`}>{props.children}</div>
          <div className="dropdown_notification-time">{props.timeAgo}</div>
        </div>
      </div>
    );
  }

  const [notifications, setNotifications] = useState([]);
  const [visibleNotifications, setVisibleNotifications] = useState(5);
  const [menuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const loadedNotifications = await loadNotifications();
      setNotifications(loadedNotifications);
    })();
  }, [loadNotifications]);

  const loadMoreNotifications = () => {
    const nextVisibleNotifications = visibleNotifications + 3;
    if (nextVisibleNotifications <= notifications.length) {
      setVisibleNotifications(nextVisibleNotifications);
    }
  };

  return (
    <div className={`dropdown ${menuOpen ? 'open' : ''}`}>
      <div className="dropdown_content">
        {notifications.slice(0, visibleNotifications).map((notification, index) => (
          <DropdownItem
            key={index}
            centered
            timeAgo={formatTimeAgo(parseInt(notification.time), notification.unit)}
          >
            {notification.name}
          </DropdownItem>
        ))}
      </div>
      <button
        className="dropdown_item-button dropdown_load-more-button"
        onClick={loadMoreNotifications}
        type="button"
      >
        {langSet["LoadMore"]}
      </button>
    </div>
  );
}

export default DropdownMenu;