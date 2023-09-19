import './GroupsPage.css';
import React, { useContext } from 'react';
//import { useParams } from 'react-router-dom';
import CardUsuario from '../GroupCard/GroupCard';
import AppContext from '../AppContext';

const GroupsPage = () => {

    const ctx = useContext(AppContext);
    const { groups } = ctx;

    //const { id } = useParams(); // id of the group

    // const cardsData = [
    //     { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    //     { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    //     { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    //     { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    //     { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    //     { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: [userImage1, userImage2, userImage3]},
    // ];

    return (
        <div className="grid-container">  {}
            {groups.map((card, index) => (
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
