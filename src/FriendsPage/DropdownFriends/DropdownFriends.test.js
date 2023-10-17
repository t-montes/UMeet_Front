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

    // Asumimos que el menú desplegable está abierto por defecto
    expect(getByText("Agregar amigos")).toBeInTheDocument();

    // Simula el cierre del menú desplegable haciendo clic en un elemento
    fireEvent.click(getByText("Agregar amigos"));

    // Asegurarte de que el menú esté cerrado aquí
    // Debido a la estructura del componente, el texto todavía podría estar presente pero no visible.
    // Por lo tanto, en lugar de verificar el contenido del texto, vamos a verificar si la clase 'open' está presente o no.
    const dropdown = document.querySelector('.dropdown_friends');
    expect(dropdown.classList.contains('open')).toBe(false);
  });

  it('logs the clicked item', () => {
    const mockClick = jest.spyOn(console, 'log');
    const { getByText } = render(
      <AppContext.Provider value={{ langSet: mockLangSet }}>
        <DropdownFriends />
      </AppContext.Provider>
    );

    fireEvent.click(getByText("Agregar amigos"));
    expect(mockClick).toHaveBeenCalledWith('Hiciste clic en "Agregar amigos"');

    fireEvent.click(getByText("Ver amigos"));
    expect(mockClick).toHaveBeenCalledWith('Hiciste clic en "Ver amigos"');
  });
});