import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomComponent from './GroupPage';

jest.mock('../Timetable/Timetable', () => () => <div>Timetable</div>);

describe('CustomComponent', () => {
  const mockData = {
    textoCentral: 'Sample Text',
    colorFondo: 'red',
    colorTexto: 'white',
    imagenesPerfil: ['image1.jpg', 'image2.jpg']
  };

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/test', state: mockData }]}>
        <Routes>
          <Route path="/test" element={<CustomComponent />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('renders the passed text with the correct styles', () => {
    const textBox = screen.getByText('Sample Text');
    expect(textBox).toBeInTheDocument();
    expect(textBox).toHaveStyle({ backgroundColor: 'red', color: 'white' });
  });

  it('renders the Timetable component', () => {
    expect(screen.getByText('Timetable')).toBeInTheDocument();
  });

  it('renders the provided images in the second imagesContainer2', () => {
    const images = screen.getAllByAltText(/^[0-1]$/);
    expect(images).toHaveLength(2 * 2);
  });

});
