import './GroupsPage.css';
import React from 'react';
//import { useParams } from 'react-router-dom';
import CardUsuario from '../GroupCard/GroupCard';
import userImage1 from '../assets/icon7.png';
import userImage2 from '../assets/icon8.png';
import userImage3 from '../assets/icon9.png';

const GroupsPage = () => {

    //const { id } = useParams(); // id of the group

    const cardsData = [
        { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
        { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
        { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
        { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
        { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
        { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    ];

    return (
        <div className="grid-container">  {}
            {cardsData.map((card, index) => (
                <CardUsuario 
                    key={index}
                    colorFondo={card.colorFondo}
                    textoCentral={card.textoCentral}
                    imagenesPerfil={card.imagenesPerfil}
                />
            ))}
        </div>
    );
};

export default GroupsPage;
