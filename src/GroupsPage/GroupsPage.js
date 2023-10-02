import "./GroupsPage.css";

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";

import Carousel from "@itseasy21/react-elastic-carousel";
import GroupCard from "../GroupCard/GroupCard";

import flechaDer from "../assets/flechaDerecha.png";
import flechaIzq from "../assets/felchaIzquierda.png";

const GroupsPage = () => {
  const { loadGroups } = useContext(AppContext);

  const [groupCardPairs, setGroupCardPairs] = useState([]);

  useEffect(() => {
    loadGroups().then((groups) => {
      const cardsPairs = [];
      for (let i = 0; i < groups.length; i += 2) {
        cardsPairs.push(groups.slice(i, i + 2));
      }
      setGroupCardPairs(cardsPairs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 585, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 808, itemsToShow: 3, pagination: false },
    { width: 1200, itemsToShow: 3, pagination: false },
  ];

  return (
    <div className="GroupsPage-carousel-wrapper">
      <Carousel
        breakPoints={breakPoints}
        renderArrow={({ type, onClick }) => (
          <button
            onClick={onClick}
            className={`GroupsPage-custom-arrow-${type}`}
          >
            {type === "PREV" ? (
              <img
                className="GroupsPage-img1"
                src={flechaIzq}
                alt="flechaIzq"
              />
            ) : (
              <img
                className="GroupsPage-img2"
                src={flechaDer}
                alt="flechaDer"
              />
            )}
          </button>
        )}
        paginationClassName="GroupsPage-custom-pagination"
        renderPagination={({ pages, activePage, onClick }) => (
          <div className="GroupsPage-pagination-container">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onClick(page)}
                className={`GroupsPage-custom-pagination-dot ${
                  activePage === page ? "active" : ""
                }`}
              ></button>
            ))}
          </div>
        )}
      >
        {groupCardPairs.map((pair, index) => (
          <div key={index} className="GroupsPage-group-pair-container">
            {pair.map((card, friendIndex) => (
              <div key={friendIndex} className="GroupsPage-group-container">
                <GroupCard
                  key={friendIndex}
                  colorFondo={card.colorFondo}
                  textoCentral={card.textoCentral}
                  imagenesPerfil={card.imagenesPerfil}
                  colorTexto={card.colorTexto}
                />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default GroupsPage;
