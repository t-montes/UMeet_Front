import './GroupCreateMenu.css';
import React, { useContext } from 'react';
import userImage1 from '../assets/icon7.png';
import userImage2 from '../assets/icon8.png';
import userImage3 from '../assets/icon9.png';
import AppContext from "../AppContext";

const GroupCreateMenu = () => {

  const ctx = useContext(AppContext);
  const { langSet } = ctx;

  // TODO: Make responsive!
  return (
    <div className="container">
      <h2 className="title">{langSet["NewGroup"]}</h2>
      
      <div className="fieldContainer">
        <label className="label">{langSet["Name"]}</label>
        <input className="input" placeholder={langSet["GroupName"]} />
      </div>

      <div className="fieldContainer">
        <label className="label">{langSet["Members"]}</label>
        <div className="membersContainer">
          <img className="member" src={userImage1} alt="Member 1" />
          <img className="member" src={userImage2} alt="Member 2" />
          <img className="member" src={userImage3} alt="Member 3" />
        </div>
      </div>

      <button className="button">{langSet["Save"]}</button>
    </div>
  );
}

export default GroupCreateMenu;
