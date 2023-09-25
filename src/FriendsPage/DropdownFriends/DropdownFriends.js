import React, { useState } from "react";
import "./DropdownFriends.css";

function DropdownFriends() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = (item) => {
    // Implementa la lógica para manejar los clics en los elementos del menú aquí
    console.log(`Hiciste clic en "${item}"`);
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
                <a href="/friends/add">Agregar amigos</a>
            </div>
          </div>
        </div>
        <div
          className="dropdown_friends-item"
          onClick={() => handleMenuItemClick("Ver amigos")}
        >
          <div className="dropdown_friends-item-content">
            <div className="dropdown_friends-notifications-text">
                <a href="/friends">Ver amigos</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropdownFriends;