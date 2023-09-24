import './GroupsPage.css';

import React from 'react';
import Carousel from "@itseasy21/react-elastic-carousel";

import CardUsuario from '../GroupCard/GroupCard';

import userImage1 from '../assets/icon7.png';
import userImage2 from '../assets/icon8.png';
import userImage3 from '../assets/icon9.png';
import flechaDer from '../assets/flechaDerecha.png';
import flechaIzq from '../assets/felchaIzquierda.png';

const cardsData = {items:[
    { colorFondo: "#4A6FA5" , colorTexto:"white", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    { colorFondo: "#4A6FA5" , colorTexto:"white", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    { colorFondo: "#4A6FA5" , colorTexto:"white", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
]};

const GroupsPage = () => {

    const groupCardPairs = [];
    for (let i = 0; i < cardsData.items.length; i += 2) {
      groupCardPairs.push(cardsData.items.slice(i, i + 2));
    }
  
    const breakPoints = [
        { width: 1, itemsToShow: 1, pagination: false},
        { width: 585, itemsToShow: 2, itemsToScroll: 2, pagination: false },
        { width: 808, itemsToShow: 3, pagination: false },
        { width: 1200, itemsToShow: 3, pagination: false }
      ];

    return (
        <div className="GroupsPage-carousel-wrapper">
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
                    {groupCardPairs.map((pair, index) => (
                    <div key={index} className="GroupsPage-group-pair-container">
                        {pair.map((card, friendIndex) => (
                            <div key={friendIndex} className="GroupsPage-group-container">
                                <CardUsuario 
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
