import './GroupsPage.css';
import React, { useContext } from 'react';
//import { useParams } from 'react-router-dom';
import CardUsuario from '../GroupCard/GroupCard';
import AppContext from '../AppContext';

const GroupsPage = () => {

    const ctx = useContext(AppContext);
    const { groups } = ctx;

    //const { id } = useParams(); // id of the group

    // TODO: Delete this sample data

    return (
        <div className="grid-container">
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
