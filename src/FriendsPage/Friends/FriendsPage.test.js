import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import FriendsPage from './FriendsPage';
import AppContext from '../../AppContext';

// Mocks
const mockLoadFriends = jest.fn();

jest.mock('@itseasy21/react-elastic-carousel', () => (props) => <div data-testid="carousel">{props.children}</div>);

jest.mock('../../SearchBar/SearchBar', () => (props) => <input data-testid="search-bar" onChange={(e) => props.onSearchChange(e.target.value)} />);

const mockFriends = [
  { name: 'John', image: 'image1.jpg' },
  { name: 'Doe', image: 'image2.jpg' },
  { name: 'Jane', image: 'image3.jpg' },
];

describe('<FriendsPage />', () => {
  beforeEach(() => {
    mockLoadFriends.mockResolvedValue(mockFriends);
  });

  it('loads and displays friends on mount', async () => {
    const { getByText } = render(
      <AppContext.Provider value={{ loadFriends: mockLoadFriends }}>
        <FriendsPage />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('John')).toBeInTheDocument();
      expect(getByText('Doe')).toBeInTheDocument();
      expect(getByText('Jane')).toBeInTheDocument();
    });
  });

  it('filters friends based on search text', async () => {
    const { getByText, getByTestId } = render(
      <AppContext.Provider value={{ loadFriends: mockLoadFriends }}>
        <FriendsPage />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('John')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(getByTestId('search-bar'), { target: { value: 'Jane' } });
    });

    await waitFor(() => {
      expect(getByText('Jane')).toBeInTheDocument();
      expect(() => getByText('John')).toThrow();
      expect(() => getByText('Doe')).toThrow();
    });
  });

  it('shows no results message if no friends are found based on search text', async () => {
    const { getByText, getByTestId } = render(
      <AppContext.Provider value={{ loadFriends: mockLoadFriends }}>
        <FriendsPage />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('John')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(getByTestId('search-bar'), { target: { value: 'Unknown' } });
    });

    await waitFor(() => {
      expect(getByText('No se encontraron resultados')).toBeInTheDocument();
    });
  });
});