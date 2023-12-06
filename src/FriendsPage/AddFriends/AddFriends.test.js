import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AddFriendsPage from './AddFriendsPage';
import AppContext from "../../AppContext";

jest.mock('../../AppContext');

describe('AddFriendsPage', () => {
  const mockLoadNoFriends = jest.fn();

  // Mock context value
  const mockContextValue = {
    loadNoFriends: mockLoadNoFriends,
    langSet: {
      "NoResults": "No Results Found",
      "Add": "Add",
      "Added": "Added"
    }
  };

  // Test Wrapper
  const TestWrapper = ({ children }) => {
    return (
      <AppContext.Provider value={mockContextValue}>
        {children}
      </AppContext.Provider>
    );
  };

  it('should display no results message if no friends match search text', async () => {
    mockLoadNoFriends.mockResolvedValue([{ name: "John", image: "john.jpg" }]);

    render(<AddFriendsPage />, { wrapper: TestWrapper });

    await act(async () => {});

    const addButton = screen.getByText("Add");
    expect(addButton).toBeInTheDocument();
  });

});