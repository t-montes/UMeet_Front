// AddFriendsPage.js
import React, { useState, useEffect } from "react";
import Carousel from "@itseasy21/react-elastic-carousel";
import "./AddFriendsPage.css";
import flechaDer from '../../assets/flechaDerecha.png';
import flechaIzq from '../../assets/felchaIzquierda.png';
import SearchBar from '../../SearchBar/SearchBar';
import { friends } from "../friends";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

function AddFriendsPage() {
  // Estado para el texto de búsqueda
  const [searchText, setSearchText] = useState('');

  // Estado para los pares de amigos filtrados
  const [filteredFriendPairs, setFilteredFriendPairs] = useState([]);

  // Estado local para el estado de cada botón de amigo
  const [friendButtonStates, setFriendButtonStates] = useState({});

  // Manejar cambios en el texto de búsqueda
  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    // Filtrar amigos basados en el texto de búsqueda
    const filteredFriends = friends.items.filter(friend =>
      friend.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Crear pares de amigos filtrados
    const newFriendPairs = [];
    for (let i = 0; i < filteredFriends.length; i += 2) {
      newFriendPairs.push(filteredFriends.slice(i, i + 2));
    }

    // Actualizar el estado de los pares de amigos filtrados
    setFilteredFriendPairs(newFriendPairs);
  }, [searchText]);  // Dependencia en searchText para re-ejecutar useEffect cuando searchText cambie

  // Función para manejar el clic en el botón
  const handleButtonClick = (friendName) => {
    setFriendButtonStates((prevState) => ({
      ...prevState,
      [friendName]: true, // Cambia el estado del botón a true cuando se hace clic
    }));
  };

  const carouselClass = filteredFriendPairs.length > 1 ? 'carousel-multiple-sections' : 'carousel-single-section';

  // Verificar si no hay resultados de búsqueda
  const noResults = filteredFriendPairs.length === 0;

  return (
    <>
      <SearchBar onSearchChange={handleSearchChange}/>
      <div className="AddFriendsPage">
        {noResults ? (
          // Mostrar un mensaje en la mitad de la ventana cuando no hay resultados
          <div className="AddFriendsPage_no-results-message">
            No se encontraron resultados
          </div>
        ) : (
          // Mostrar el carrusel si hay resultados
          <Carousel
            className={carouselClass}
            breakPoints={breakPoints}
            renderArrow={({ type, onClick }) => (
              <button onClick={onClick} className={`custom-arrow-${type}`}>
                {type === 'PREV' ? <img className="AddFriendsPage_img1" src={flechaIzq} alt="flechaIzq" /> : <img className="AddFriendsPage_img2" src={flechaDer} alt="flechaDer" />}
              </button>
            )}
            paginationClassName="custom-pagination"
            renderPagination={({ pages, activePage, onClick }) => (
              <div className="AddFriendsPage_pagination-container">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => onClick(page)}
                    className={`AddFriendsPage_custom-pagination-dot ${activePage === page ? "active" : ""
                      }`}
                  ></button>
                ))}
              </div>
            )}
          >
            {filteredFriendPairs.map((pair, index) => (
              <div key={index} className="AddFriendsPage_friend-pair-container">
                {pair.map((friend, friendIndex) => (
                  <div key={friendIndex} className="AddFriendsPage_friend-container">
                    <div className="AddFriendsPage_friends">
                      <img
                        className="AddFriendsPage_friend-image"
                        src={friend.image}
                        alt={friend.name}
                      />
                    </div>
                    <div className="AddFriendsPage_friend-name">
                      {friend.name}
                    </div>
                    <button
                      className={`AddFriendsPage_add-button ${friendButtonStates[friend.name] ? "added" : ""}`}
                      onClick={() => handleButtonClick(friend.name)}
                      disabled={friendButtonStates[friend.name]}
                    >
                      {friendButtonStates[friend.name] ? "Agregado" : "Agregar"}
                    </button>
                  </div>
                ))}
                {index < filteredFriendPairs.length - 1 && <div className="AddFriendsPage_friend-space"></div>}
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default AddFriendsPage;