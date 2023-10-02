import React, { useState, useEffect, useContext } from "react";
import "./DropdownMenu.css";
import AppContext from "../AppContext";

function DropdownMenu() {
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

  const { loadNotifications } = useContext(AppContext);

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
            timeAgo={`${parseInt(notification.time)} ${notification.unit} ago`}
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
        Cargar más
      </button>
    </div>
  );
}

export default DropdownMenu;