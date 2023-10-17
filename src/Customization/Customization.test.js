import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Customization from './Customization';
import AppContext from '../AppContext';

const mockLangSet = {
    Personalize: "Personalize",
    ScheduleCustomization: "Schedule Customization",
    FirstDay: "First Day",
    LastDay: "Last Day",
    StartTime: "Start Time",
    EndTime: "End Time",
    TextSize: "Text Size",
    TextColor: "Text Color",
    daysList: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]  // Added this line
};

describe('<Customization />', () => {
    beforeEach(() => {
        render(
            <AppContext.Provider value={{ langSet: mockLangSet }}>
                <Customization />
            </AppContext.Provider>
        );
    });

    it('toggles the customization modal on button click', async () => {
        const button = screen.getByText('Personalize');

        fireEvent.click(button);
        
        await waitFor(() => {
            expect(screen.getByText('Schedule Customization')).toBeInTheDocument();
        });

        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.queryByText('Schedule Customization')).not.toBeInTheDocument();
        });
    });

    it('adds and removes the "active-customization" class to body', async () => {
        const button = screen.getByText('Personalize');
        
        fireEvent.click(button);
        await waitFor(() => {
            expect(document.body.classList.contains('active-customization')).toBeTruthy();
        });

        fireEvent.click(button);
        await waitFor(() => {
            expect(document.body.classList.contains('active-customization')).toBeFalsy();
        });
    });
});