import React from "react";
import { useNavigate } from 'react-router-dom';

const GroupCard = ({
  colorFondo,
  colorTexto,
  textoCentral,
  imagenesPerfil,
}) => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/group/${textoCentral}`, { state: { textoCentral, colorFondo, colorTexto, imagenesPerfil } });
    }
      
  return (
    <div  onClick={handleCardClick}
      style={{
        backgroundColor: colorFondo,
        borderRadius: "15px",
        width: "90%",
        maxWidth: "500px",
        height: "350px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2em",
        textAlign: "center",
        color: colorTexto,
        margin: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          display: "flex",
        }}
      >
        {imagenesPerfil.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={"User " + (index + 1)}
            style={{
              width: "20%", // width relative to the parent container
              aspectRatio: "1/1", // to maintain the aspect ratio
              objectFit: "cover", // to make sure the image covers the area
              borderRadius: "50%",
              border: "2px solid white",
              zIndex: 3 - index,
              marginLeft: index === 0 ? "0" : "-10%", // overlap is relative to the parent container
            }}
          />
        ))}
      </div>
      <span>{textoCentral}</span>
    </div>
  );
};

export default GroupCard;
