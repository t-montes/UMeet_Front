import "./FriendsPage.css";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../AppContext";
import Carousel from "@itseasy21/react-elastic-carousel";
import flechaDer from '../../assets/flechaDerecha.png';
import flechaIzq from '../../assets/felchaIzquierda.png';
import SearchBar from '../../SearchBar/SearchBar';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

function FriendsPage() {
  const { loadFriends } = useContext(AppContext);

  const [allFriends, setAllFriends] = useState([]);  // Estado para todos los amigos
  const [filteredFriendPairs, setFilteredFriendPairs] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // Obtener todos los amigos al montar el componente
  useEffect(() => {
    loadFriends().then((friends) => {
      setAllFriends(friends);  // Guardar todos los amigos en el estado
      setFilteredFriendPairs(createFriendPairs(friends));  // Establecer los pares de amigos iniciales
    });
  }, [loadFriends]);  // Agregamos loadFriends a las dependencias

  // Filtrar amigos cuando cambia searchText
  useEffect(() => {
    const filteredFriends = allFriends.filter(friend =>
      friend.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredFriendPairs(createFriendPairs(filteredFriends));
  }, [searchText, allFriends]);

  const createFriendPairs = (friendsList) => {
    const newFriendPairs = [];
    for (let i = 0; i < friendsList.length; i += 2) {
      newFriendPairs.push(friendsList.slice(i, i + 2));
    }
    return newFriendPairs;
  };

  const carouselClass = filteredFriendPairs.length > 1 ? 'carousel-multiple-sections' : 'carousel-single-section';
  const noResults = filteredFriendPairs.length === 0;

  return (
    <>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="FriendsPage">
        {noResults ? (
          <div className="FriendsPage_no-results-message">
            No se encontraron resultados
          </div>
        ) : (
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