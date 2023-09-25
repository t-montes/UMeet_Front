// FriendsPage.js
import React, { useState, useEffect } from "react";
import Carousel from "@itseasy21/react-elastic-carousel";
import "./FriendsPage.css";
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

function FriendsPage() {
  // Estado para el texto de búsqueda
  const [searchText, setSearchText] = useState('');

  // Estado para los pares de amigos filtrados
  const [filteredFriendPairs, setFilteredFriendPairs] = useState([]);

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

  const carouselClass = filteredFriendPairs.length > 1 ? 'carousel-multiple-sections' : 'carousel-single-section';

  // Verificar si no hay resultados de búsqueda
  const noResults = filteredFriendPairs.length === 0;

  return (
    <>
      <SearchBar onSearchChange={handleSearchChange}/>
      <div className="FriendsPage">
        {noResults ? (
          // Mostrar un mensaje en la mitad de la ventana cuando no hay resultados
          <div className="FriendsPage_no-results-message">
            No se encontraron resultados
          </div>
        ) : (
          // Mostrar el carrusel si hay resultados
          <Carousel
            className={carouselClass}
            breakPoints={breakPoints}
            renderArrow={({ type, onClick }) => (
              <button onClick={onClick} className={`FriendsPage_custom-arrow-${type}`}>
                {type === 'PREV' ? <img className="FriendsPage_img1" src={flechaIzq} alt="flechaIzq" /> : <img className="FriendsPage_img2" src={flechaDer} alt="flechaDer" />}
              </button>
            )}
            paginationClassName="custom-pagination"
            renderPagination={({ pages, activePage, onClick }) => (
              <div className="FriendsPage_pagination-container">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => onClick(page)}
                    className={`FriendsPage_custom-pagination-dot ${activePage === page ? "active" : ""
                      }`}
                  ></button>
                ))}
              </div>
            )}
          >
            {filteredFriendPairs.map((pair, index) => (
              <div key={index} className="FriendsPage_friend-pair-container">
                {pair.map((friend, friendIndex) => (
                  <div key={friendIndex} className="FriendsPage_friend-container">
                    <div className="FriendsPage_friends">
                      <img
                        className="FriendsPage_friend-image"
                        src={friend.image}
                        alt={friend.name}
                      />
                    </div>
                    <div className="FriendsPage_friend-name">
                      {friend.name}
                    </div>
                  </div>
                ))}
                {index < filteredFriendPairs.length - 1 && <div className="FriendsPage_friend-space"></div>}
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}

export default FriendsPage;