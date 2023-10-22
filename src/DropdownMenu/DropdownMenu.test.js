import { render, screen, act } from "@testing-library/react";
import DropdownMenu from "./DropdownMenu";
import AppContext from "../AppContext";

jest.mock("../AppContext");

describe("<DropdownMenu />", () => {
    let mockLoadNotifications;

    beforeEach(() => {
        mockLoadNotifications = jest.fn();
        AppContext.useContext = jest.fn().mockReturnValue({
            loadNotifications: mockLoadNotifications,
            langSet: {
                LoadMore: "Load More"
            },
            lang: "en"
        });
        mockLoadNotifications.mockClear();
    });

    test("loads notifications", async () => {
        mockLoadNotifications.mockResolvedValue([
            { name: "Test Notification 1", time: "2", unit: "hours" },
            { name: "Test Notification 2", time: "5", unit: "minutes" },
        ]);

        await act(async () => {
            render(
                <AppContext.Provider value={{
                    loadNotifications: mockLoadNotifications,
                    langSet: {
                        LoadMore: "Load More"
                    },
                    lang: "en"
                }}>
                    <DropdownMenu />
                </AppContext.Provider>
            );
        });

        const notification1 = screen.getByText("Test Notification 1");
        const notification2 = screen.getByText("Test Notification 2");

        expect(notification1).toBeInTheDocument();
        expect(notification2).toBeInTheDocument();
    });

    test("formats time based on the given language context", async () => {
        mockLoadNotifications.mockResolvedValue([
            { name: "Test Notification 1", time: "2", unit: "hours" },
        ]);

        await act(async () => {
            render(
                <AppContext.Provider value={{
                    loadNotifications: mockLoadNotifications,
                    langSet: {
                        LoadMore: "Load More"
                    },
                    lang: "en"
                }}>
                    <DropdownMenu />
                </AppContext.Provider>
            );
        });

        const timeFormat = screen.getByText("2 hours ago");
        expect(timeFormat).toBeInTheDocument();
    });
});