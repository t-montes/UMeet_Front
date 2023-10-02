import React from "react";
import Timetable from "../Timetable/Timetable";
import { useLocation } from "react-router-dom";
import "./GroupPage.css"; // Importa el archivo CSS en tu componente

function CustomComponent({ route, navigation }) {
  const location = useLocation();
  const { textoCentral, colorFondo, colorTexto, imagenesPerfil } =
    location.state || {};

  return (
    <div className="container">
      <div className="firstRow">
        <div
          style={{ backgroundColor: colorFondo, color: colorTexto }}
          className="textBox"
        >
          {textoCentral}
        </div>
        <div className="imagesContainer">
          {imagenesPerfil.map((image, index) => (
            <img
              key={index}
              src={"../" + image}
              alt={`${index}`}
              className="image"
            />
          ))}
        </div>
      </div>
      <Timetable />
      <div className="imagesContainer2">
        {imagenesPerfil.map((image, index) => (
          <img
            key={index}
            src={"../" + image}
            alt={`${index}`}
            className="image"
          />
        ))}
      </div>
    </div>
  );
}

export default CustomComponent;
