import "./GroupCreateMenu.css";
import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";

import userImage1 from "../assets/icon7.png";
import userImage2 from "../assets/icon8.png";
import userImage3 from "../assets/icon9.png";
import AppContext from "../AppContext";

const GroupCreateMenu = React.forwardRef(({ onClose }, ref) => {
  const ctx = useContext(AppContext);
  const { token, langSet } = ctx;

  const [groupName, setGroupName] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [groupNameError, setGroupNameError] = useState(false);

  const validateFields = () => {
    if (!groupName) {
      setSnackbarMessage("Please enter an group name.");
      setSnackbarOpen(true);
      setGroupNameError(true);
      return false;
    } else {
      setGroupNameError(false);
    }
  
    return true;
  };

  const handleCreateClick = async () => {
    if (validateFields()) {
      try {
        // Datos para enviar en la petición POST
        const groupData = {
          name: groupName,
          topic: groupName,
        };
  
        // Opciones para la solicitud fetch
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Asegúrate de que el token esté disponible
          },
          body: JSON.stringify(groupData),
        };
  
        // Realiza la llamada a la API
        const response = await fetch('http://localhost:3001/api/v1/groups/', requestOptions);
  
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error en la solicitud POST');
        }
  
        // Opcional: manejar la respuesta
        const responseData = await response.json();
        console.log(responseData);
  
        // Cierra el componente solo si la petición fue exitosa
        onClose();

        window.location.reload();

      } catch (error) {
        console.error('Hubo un error al realizar la petición:', error);
      }
    }
  };
  

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
          <TextField
            className="GroupCreateMenu-input"
            placeholder={langSet["GroupName"]}
            value={groupName}
            onChange={(e) => {setGroupName(e.target.value); setGroupNameError(false);}}
            error={groupNameError}
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

        <button className="GroupCreateMenu-button"
          onClick={handleCreateClick}
        >
          {langSet["Save"]}
        </button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
});

export default GroupCreateMenu;
