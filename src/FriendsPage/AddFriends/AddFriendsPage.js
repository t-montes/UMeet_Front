import "./AddFriendsPage.css";
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

function AddFriendsPage() {
  const { token, userId, loadNoFriends, langSet } = useContext(AppContext);
  const [allFriends, setAllFriends] = useState([]);
  const [filteredFriendPairs, setFilteredFriendPairs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [friendButtonStates, setFriendButtonStates] = useState({});

  useEffect(() => {
    loadNoFriends().then((friends) => {
      setAllFriends(friends);
    });
  }, [loadNoFriends]);

  useEffect(() => {
    const filteredFriends = allFriends.filter(friend =>
      friend.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const newFriendPairs = [];
    for (let i = 0; i < filteredFriends.length; i += 2) {
      newFriendPairs.push(filteredFriends.slice(i, i + 2));
    }

    setFilteredFriendPairs(newFriendPairs);
  }, [searchText, allFriends]);

  const handleButtonClick = (nonFriendId) => {
    const url = `http://localhost:3001/api/v1/users/${userId}/friends/${nonFriendId}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Friend added:', data);
        setFriendButtonStates((prevState) => ({
            ...prevState,
            [nonFriendId]: true,
        }));
    })
    .catch(error => console.error('Error:', error));
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const carouselClass = filteredFriendPairs.length > 1 ? 'carousel-multiple-sections' : 'carousel-single-section';
  const noResults = filteredFriendPairs.length === 0;

  return (
    <>
      <SearchBar onSearchChange={handleSearchChange}/>
      <div className="AddFriendsPage">
        {noResults ? (
          <div className="AddFriendsPage_no-results-message">
            {langSet["NoResults"]}
          </div>
        ) : (
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
                    className={`AddFriendsPage_custom-pagination-dot ${activePage === page ? "active" : ""}`}
                  ></button>
                ))}
              </div>
            )}
          >
            {filteredFriendPairs.map((pair, index) => (
              <div key={index} className="AddFriendsPage_friend-pair-container">
                {pair.map((friend, friendIndex) => (
                  <div key={friendIndex} className="AddFriendsPage_friend-container">
                    <img className="AddFriendsPage_friend-image" src={friend.image} alt={friend.name} />
                    <div className="AddFriendsPage_friend-name">{friend.name}</div>
                    <button
                        className={`AddFriendsPage_add-button ${friendButtonStates[friend.id] ? "added" : ""}`}
                        onClick={() => handleButtonClick(friend.id)}
                        disabled={friendButtonStates[friend.id]}
                    >
                        {friendButtonStates[friend.id] ? langSet["Added"] : langSet["Add"]}
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
