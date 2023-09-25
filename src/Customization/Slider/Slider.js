import React, { useState } from 'react';
import "./Slider.css";

function Slider() {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    setSliderValue(newValue);
  };

  return (
    <div className="slider_range-div">
      <input
        type="range"
        min="1"
        max="100"
        value={sliderValue}
        className="slider_range"
        id="myRange"
        onChange={handleSliderChange}
      />
      <p className="slider_range-value">{sliderValue}px</p>
    </div>
  );
}

export default Slider;