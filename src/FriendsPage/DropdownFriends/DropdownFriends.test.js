import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropdownFriends from './DropdownFriends';
import AppContext from '../../AppContext';

const mockLangSet = {
  "AddFriends": "Agregar amigos",
  "MyFriends": "Ver amigos"
};

describe('<DropdownFriends />', () => {
  it('renders without crashing', () => {
    render(
      <AppContext.Provider value={{ langSet: mockLangSet }}>
        <DropdownFriends />
      </AppContext.Provider>
    );
  });

  it('closes the dropdown when an item is clicked', () => {
    const { getByText, queryByText } = render(
      <AppContext.Provider value={{ langSet: mockLangSet }}>
        <DropdownFriends />
      </AppContext.Provider>
    );

    expect(getByText("Agregar amigos")).toBeInTheDocument();

    fireEvent.click(getByText("Agregar amigos"));

    const dropdown = document.querySelector('.dropdown_friends');
    expect(dropdown.classList.contains('open')).toBe(false);
  });
});