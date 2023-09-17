import "./Backdrop.css";
import React from "react";

/**
 * Backdrop component, background space to close the side menu
 * @param {function} props.click: function to close the side menu
 * @returns 
 */
const Backdrop = props => <div className="backdrop" onClick={props.click} />;

export default Backdrop;
