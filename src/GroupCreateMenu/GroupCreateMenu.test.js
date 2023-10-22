import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupCreateMenu from './GroupCreateMenu';
import AppContext from '../AppContext';

describe('GroupCreateMenu', () => {
  const mockClose = jest.fn();

  const mockLangSet = {
    NewGroup: 'New Group',
    Name: 'Name',
    GroupName: 'Enter Group Name',
    Members: 'Members',
    Save: 'Save'
  };

  const wrapper = ({ children }) => (
    <AppContext.Provider value={{ langSet: mockLangSet }}>
      {children}
    </AppContext.Provider>
  );

  beforeEach(() => {
    render(<GroupCreateMenu onClose={mockClose} />, { wrapper });
  });

  it('renders without crashing', () => {
    expect(screen.getByText(mockLangSet.NewGroup)).toBeInTheDocument();
  });

  it('renders the appropriate language set', () => {
    expect(screen.getByText(mockLangSet.NewGroup)).toBeInTheDocument();
    expect(screen.getByText(mockLangSet.Name)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(mockLangSet.GroupName)).toBeInTheDocument();
    expect(screen.getByText(mockLangSet.Members)).toBeInTheDocument();
    expect(screen.getByText(mockLangSet.Save)).toBeInTheDocument();
  });

  it('renders the member images', () => {
    expect(screen.getByAltText('Member 1')).toBeInTheDocument();
    expect(screen.getByAltText('Member 2')).toBeInTheDocument();
    expect(screen.getByAltText('Member 3')).toBeInTheDocument();
  });

});
