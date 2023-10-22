import React, { useState, useContext } from "react";
import "./DropdownFriends.css";
import AppContext from "../../AppContext";

function DropdownFriends() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { langSet } = useContext(AppContext);

  const handleMenuItemClick = (item) => {
    setMenuOpen(false); // Cierra el menú después de hacer clic en un elemento
  };

  return (
    <div className={`dropdown_friends ${menuOpen ? "open" : ""}`}>
      <div className="dropdown_friends-content">
        <div
          className="dropdown_friends-item"
          onClick={() => handleMenuItemClick("Agregar amigos")}
        >
          <div className="dropdown_friends-item-content">
            <div className="dropdown_friends-notifications-text">
                <a href="/friends-add">{langSet["AddFriends"]}</a>
            </div>
          </div>
        </div>
        <div
          className="dropdown_friends-item"
          onClick={() => handleMenuItemClick("Ver amigos")}
        >
          <div className="dropdown_friends-item-content">
            <div className="dropdown_friends-notifications-text">
                <a href="/friends">{langSet["MyFriends"]}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownFriends;