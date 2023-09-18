import React from 'react';
import './GroupCreateMenu.css';
import userImage1 from '../assets/icon7.png';
import userImage2 from '../assets/icon8.png';
import userImage3 from '../assets/icon9.png';

const GroupCreateMenu = () => {
  return (
    <div className="container">
      <h2 className="title">Nuevo Grupo</h2>
      
      <div className="fieldContainer">
        <label className="label">Nombre</label>
        <input className="input" placeholder="Nombre del grupo" />
      </div>

      <div className="fieldContainer">
        <label className="label">Miembros</label>
        <div className="membersContainer">
          <img className="member" src={userImage1} alt="Miembro 1" />
          <img className="member" src={userImage2} alt="Miembro 2" />
          <img className="member" src={userImage3} alt="Miembro 3" />
        </div>
      </div>

      <button className="button">Guardar</button>
    </div>
  );
}

export default GroupCreateMenu;
