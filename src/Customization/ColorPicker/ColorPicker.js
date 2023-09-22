import React from "react";
import "./ColorPicker.css";

function InputColorPicker() {
  const handleColorChange = (e) => {
  };

  return (
    <div className="main">
      <input
        type="color"
        onChange={handleColorChange}
        className="color-picker"
      />
    </div>
  );
}

export default InputColorPicker;