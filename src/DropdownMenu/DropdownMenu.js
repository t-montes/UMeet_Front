import React, { useState } from "react";
import "./DropdownMenu.css";
import { notifications } from "./notifications"; // Importa el objeto notifications desde notificaciones.js

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

  // Obtiene las notificaciones, notificationTimes y timeUnits del objeto notifications
  const { items } = notifications;
  const notificationTimes = items.map((item) => parseInt(item.time));
  const timeUnits = items.map((item) => item.unit);

  const [visibleNotifications, setVisibleNotifications] = useState(5);
  const [menuOpen] = useState(false);

  const loadMoreNotifications = () => {
    const nextVisibleNotifications = visibleNotifications + 3;
    if (nextVisibleNotifications <= notifications.items.length) {
      setVisibleNotifications(nextVisibleNotifications);
    }
  };

  return (
    <div className={`dropdown ${menuOpen ? 'open' : ''}`}>
      <div className="dropdown_content">
        {notifications.items.slice(0, visibleNotifications).map((notification, index) => (
          <DropdownItem key={index} centered timeAgo={`${notificationTimes[index]} ${timeUnits[index]} ago`}>
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