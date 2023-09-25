import React, { useState } from 'react';
import { days } from './days.js';

function ControlledSelect() {
  const [value, setValue] = useState('Lunes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form>
        <select value={value} onChange={handleChange}>
          {days.items.map((day) => (
            <option key={day.name} value={day.name}>
              {day.name}
            </option>
          ))}
        </select>
    </form>
  );
}

export default ControlledSelect;