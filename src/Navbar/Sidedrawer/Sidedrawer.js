import "./Sidedrawer.css";
import React from "react";

const Sidedrawer = props => {
  let drawerClasses = ["side-drawer"];

  if (props.show) {
    drawerClasses = ["side-drawer", "open"];
  }
  return (
    <nav className={drawerClasses.join(" ")}>
      <ul>
        <li>
          <a href="/">Mi Horario</a>
        </li>
        <li>
          <a href="/">Amigos</a>
        </li>
        <li>
          <a href="/">Grupos</a>
        </li>
      </ul>
    </nav>
  );
};
export default Sidedrawer;
