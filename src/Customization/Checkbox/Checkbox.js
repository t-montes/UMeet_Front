// CheckBox.js
import React from 'react';

function CheckBox({ checked, onChange }) {
  return (
    <form>
      <input
        name="enableGrid"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </form>
  );
}

export default CheckBox;
