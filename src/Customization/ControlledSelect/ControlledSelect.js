import React, { useState, useContext } from 'react';
import AppContext from '../../AppContext';

function ControlledSelect() {
  const { langSet } = useContext(AppContext);
  const [value, setValue] = useState('Lunes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form>
        <select value={value} onChange={handleChange}>
          {langSet.daysList.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
    </form>
  );
}

export default ControlledSelect;