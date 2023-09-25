import './GroupCreateMenu.css';
import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

import userImage1 from '../assets/icon7.png';
import userImage2 from '../assets/icon8.png';
import userImage3 from '../assets/icon9.png';
import AppContext from "../AppContext";

const GroupCreateMenu = ({onClose}) => {

  const ctx = useContext(AppContext);
  const { langSet } = ctx;

  return (
    <Box
      sx={{
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: '100%', 
        maxWidth: '550px', 
        bgcolor: 'white',
        p: 2,
        outline: 'none',
      }}
    >
    <div className="container">
    <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: '1px', right: '1px' }}
        >
          <CloseIcon />
        </IconButton>
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
    </Box>
  );
}

export default GroupCreateMenu;
