import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateEventComponent from './EventCreateMenu';
import AppContext from '../AppContext';

describe('CreateEventComponent', () => {
  const mockClose = jest.fn();

  const mockLangSet = {
    CreateEvent: 'Create Event',
    EventName: 'Event Name',
    Location: 'Location',
    Link: 'Link',
    PrivateEvent: 'Private Event',
    MinutesBefore: 'minutes before',
    StartTime: 'Start Time',
    EndTime: 'End Time',
    Create: 'Create',
  };

  const wrapper = ({ children }) => (
    <AppContext.Provider value={{ langSet: mockLangSet, lang: 'en' }}>
      {children}
    </AppContext.Provider>
  );

  beforeEach(() => {
    render(<CreateEventComponent onClose={mockClose} />, { wrapper });
  });

  it('renders without crashing', () => {
    expect(screen.getByText(mockLangSet.CreateEvent)).toBeInTheDocument();
  });

  it('renders the appropriate language set', () => {
    expect(screen.getByText(mockLangSet.CreateEvent)).toBeInTheDocument();
    expect(screen.getByLabelText(mockLangSet.EventName)).toBeInTheDocument();
    expect(screen.getByLabelText(mockLangSet.Location)).toBeInTheDocument();
    expect(screen.getByLabelText(mockLangSet.Link)).toBeInTheDocument();
    expect(screen.getByText(mockLangSet.Create)).toBeInTheDocument();
  });

});
