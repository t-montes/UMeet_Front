import React, { useState, useEffect, useContext } from "react";
import "./DropdownMenu.css";
import AppContext from "../AppContext";
import moment from "moment"; // Asegúrate de instalar 'moment' con npm o yarn

function DropdownMenu() {
  const { loadNotifications, langSet } = useContext(AppContext);

  function formatTimeAgo(notificationDate) {
    const now = moment();
    const date = moment(notificationDate);
    const duration = moment.duration(now.diff(date));
    
    if (langSet.lang === 'es') {
      // Formato en español, ajustar según sea necesario
      return duration.humanize() + ' atrás';
    } else {
      // Formato en inglés
      return duration.humanize() + ' ago';
    }
  }

  function DropdownItem(props) {
    return (
      <div className="dropdown_menu-item">
        <div className="dropdown_menu-item-content">
          <div className={`dropdown_notification-text ${props.centered ? 'centered' : ''}`}>
            {props.children}
          </div>
          <div className="dropdown_notification-time">
            {props.timeAgo}
          </div>
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
            key={notification.id}
            centered
            timeAgo={formatTimeAgo(notification.date)}
          >
            {notification.text}
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