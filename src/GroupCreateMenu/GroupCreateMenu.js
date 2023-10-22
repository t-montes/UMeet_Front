import "./GroupCreateMenu.css";
import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

import userImage1 from "../assets/icon7.png";
import userImage2 from "../assets/icon8.png";
import userImage3 from "../assets/icon9.png";
import AppContext from "../AppContext";

const GroupCreateMenu = React.forwardRef(({ onClose }, ref) => {
  const ctx = useContext(AppContext);
  const { langSet } = ctx;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "550px",
        bgcolor: "white",
        p: 2,
        outline: "none",
      }}
    >
      <div className="GroupCreateMenu-container">
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: "1px", right: "1px" }}
        >
          <CloseIcon />
        </IconButton>
        <h2 className="GroupCreateMenu-title">{langSet["NewGroup"]}</h2>

        <div className="GroupCreateMenu-fieldContainer">
          <label className="GroupCreateMenu-label">{langSet["Name"]}</label>
          <input
            className="GroupCreateMenu-input"
            placeholder={langSet["GroupName"]}
          />
        </div>

        <div className="GroupCreateMenu-fieldContainer">
          <label className="GroupCreateMenu-label">{langSet["Members"]}</label>
          <div className="GroupCreateMenu-membersContainer">
            <img
              className="GroupCreateMenu-member"
              src={userImage1}
              alt="Member 1"
            />
            <img
              className="GroupCreateMenu-member"
              src={userImage2}
              alt="Member 2"
            />
            <img
              className="GroupCreateMenu-member"
              src={userImage3}
              alt="Member 3"
            />
          </div>
        </div>

        <button className="GroupCreateMenu-button">{langSet["Save"]}</button>
      </div>
    </Box>
  );
});

export default GroupCreateMenu;
