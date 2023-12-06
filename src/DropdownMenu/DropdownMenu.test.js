import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import AppContext from "../AppContext";
import moment from "moment";

jest.mock('../AppContext');

describe("<DropdownMenu />", () => {
    const mockLoadNotifications = jest.fn();
    const langSet = {
        LoadMore: "Load More"
    };
    const mockContextValue = {
        loadNotifications: mockLoadNotifications,
        langSet: langSet,
        lang: "en"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("loads notifications and formats time based on the given language context", async () => {
        const twoHoursAgo = moment().subtract(2, 'hours').toISOString();
        const fiveMinutesAgo = moment().subtract(5, 'minutes').toISOString();

        mockLoadNotifications.mockResolvedValue([
            { id: "uuid-1", text: "Test Notification 1", date: twoHoursAgo, redirection: null, user: { name: "User 1" }},
            { id: "uuid-2", text: "Test Notification 2", date: fiveMinutesAgo, redirection: null, user: { name: "User 2" }}
        ]);

        await act(async () => {
            render(
                <AppContext.Provider value={mockContextValue}>
                    <DropdownMenu />
                </AppContext.Provider>
            );
        });

        const notification1 = screen.getByText("Test Notification 1");
        const notification2 = screen.getByText("Test Notification 2");
        const timeFormat1 = screen.getByText("2 hours ago");
        const timeFormat2 = screen.getByText("5 minutes ago");

        expect(notification1).toBeInTheDocument();
        expect(notification2).toBeInTheDocument();
        expect(timeFormat1).toBeInTheDocument();
        expect(timeFormat2).toBeInTheDocument();
    });

    test("loads more notifications on button click", async () => {
        const notifications = new Array(10).fill().map((_, i) => ({
            id: `uuid-${i}`,
            text: `Test Notification ${i}`,
            date: new Date().toISOString(),
            redirection: null,
            user: { name: `User ${i}` }
        }));

        mockLoadNotifications.mockResolvedValue(notifications);

        await act(async () => {
            render(
                <AppContext.Provider value={mockContextValue}>
                    <DropdownMenu />
                </AppContext.Provider>
            );
        });

        // Initially, only the first 5 notifications should be visible
        expect(screen.getAllByText(/Test Notification/).length).toBe(5);

        const loadMoreButton = screen.getByText(langSet.LoadMore);
        fireEvent.click(loadMoreButton);

        // After clicking, more notifications should be visible
        await act(async () => {});
        expect(screen.getAllByText(/Test Notification/).length).toBeGreaterThan(5);
    });
});
