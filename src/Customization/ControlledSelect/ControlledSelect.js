import React, { useContext } from 'react';
import AppContext from '../../AppContext';

function ControlledSelect({ value, onChange }) {
  const { langSet } = useContext(AppContext);

  const dayNameToNumber = (dayName) => {
    const dayNamesEnglish = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const index = langSet.daysList.indexOf(dayName);
    return index !== -1 ? index + 1 : dayNamesEnglish.indexOf(dayName) + 1;
  };

  const handleSelectChange = (event) => {
    onChange(dayNameToNumber(event.target.value));
  };

  return (
    <form>
      <select value={langSet.daysList[value - 1]} onChange={handleSelectChange}>
        {langSet.daysList.map((day, index) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </form>
  );
}

export default ControlledSelect;
