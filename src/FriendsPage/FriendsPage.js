import React from "react";
import ReactDOM from "react-dom";
import Carousel from "@itseasy21/react-elastic-carousel";
import "./FriendsPage.css";
import flechaDer from '../assets/flechaDerecha.png';
import flechaIzq from '../assets/felchaIzquierda.png';

import { friends } from "./friends";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];

function FriendsPage() {
  const friendPairs = [];
  for (let i = 0; i < friends.items.length; i += 2) {
    friendPairs.push(friends.items.slice(i, i + 2));
  }

  return (
    <>
      <div className="FriendsPage">
        <Carousel
          breakPoints={breakPoints}
          renderArrow={({ type, onClick }) => (
            <button onClick={onClick} className={`custom-arrow-${type}`}>
              {type === 'PREV' ? <img className="img1" src={flechaIzq} alt="flechaIzq" /> : <img className="img2" src={flechaDer} alt="flechaDer" />}
            </button>
          )}
          paginationClassName="custom-pagination"
          renderPagination={({ pages, activePage, onClick }) => (
            <div className="pagination-container">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => onClick(page)}
                  className={`custom-pagination-dot ${activePage === page ? "active" : ""
                    }`}
                ></button>
              ))}
            </div>
          )}
        >
          {friendPairs.map((pair, index) => (
            <div key={index} className="friend-pair-container">
              {pair.map((friend, friendIndex) => (
                <div key={friendIndex} className="friend-container">
                  <div className="friends">
                    <img
                      className="friend-image"
                      src={friend.image}
                      alt={friend.name}
                    />
                  </div>
                  <div className="friend-name">
                    {friend.name}
                  </div>
                </div>
              ))}
              {index < friendPairs.length - 1 && <div className="friend-space"></div>}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default FriendsPage;