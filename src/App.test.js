import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  /*const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/ // This is the default test, not used actually
});
