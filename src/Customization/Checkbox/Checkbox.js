import React, { useState } from 'react';

function CheckBox() {
  const [state, setState] = useState({
    isGoing: true,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <form>
      <input
        name="isGoing"
        type="checkbox"
        checked={state.isGoing}
        onChange={handleInputChange}
      />
      <br />
    </form>
  );
}

export default CheckBox;