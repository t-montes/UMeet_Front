import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as langs from '../langs';

/* -------------------------- SETUP -------------------------- */

beforeEach(() => {
    localStorage.setItem("lang", "en");
});

/* -------------------------- RENDERING -------------------------- */

test("renders navbar", () => {
    render(<App />);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
});

test("renders settings button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Settings"]);
    expect(button).toBeInTheDocument();
});

test("renders profile button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Profile"]);
    expect(button).toBeInTheDocument();
});

test("renders language button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Language"]);
    expect(button).toBeInTheDocument();
});

test("renders notifications button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Notifications"]);
    expect(button).toBeInTheDocument();
});

test("renders groups button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const buttons = screen.getAllByText(langSet["Groups"]);
    // should be 2, one in navbar and one in sidemenu
    expect(buttons.length).toBe(2);
});

test("renders friends button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByText(langSet["Friends"]);
    // should only be one, in navbar
    expect(button).toBeInTheDocument();

    // on hover, should show dropdown with 'myFriends' and 'AddFriends' buttons
    fireEvent.mouseEnter(button);

    const myFriends = screen.getAllByText(langSet["MyFriends"]);
    const addFriends = screen.getAllByText(langSet["AddFriends"]);
    // should be 2, one in navbar dropdown and one in sidemenu
    expect(myFriends.length).toBe(2);
    expect(addFriends.length).toBe(2);

    fireEvent.mouseLeave(button);
});

test("renders my schedule button", () => {
    render(<App />);
    const langSet = langs.en; // default
    const buttons = screen.getAllByText(langSet["MySchedule"]);
    // should be 2, one in navbar and one in sidemenu
    expect(buttons.length).toBe(2);
});

test("renders logo", () => {
    render(<App />);
    const logo = screen.getByAltText("Umeet Logo");
    expect(logo).toBeInTheDocument();
});

/* -------------------------- BEHAVIOUR -------------------------- */

test("goes to settings page", () => {
    render(<App testingPath="/settings"/>);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Settings"]);
    expect(button).toHaveAttribute("href", "/settings");
});

test("goes to profile page", () => {
    render(<App testingPath="/profile"/>);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Profile"]);
    expect(button).toHaveAttribute("href", "/"); // to be changed to /profile
});

test("changes language", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Language"]);
    expect(button).toHaveTextContent("EN");
    fireEvent.click(button);
    expect(button).toHaveTextContent("ES");
});

test("opens notifications dropdown", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByTitle(langSet["Notifications"]);
    fireEvent.click(button);
    const dropdown = screen.getByTestId("notifications-dropdown");
    expect(dropdown).toBeInTheDocument();
});

test("goes to groups page", () => {
    render(<App testingPath="/groups"/>);
    const langSet = langs.en; // default
    const buttons = screen.getAllByText(langSet["Groups"]);
    // should be 2, one in navbar and one in sidemenu
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveAttribute("href", "/groups");
    expect(buttons[1]).toHaveAttribute("href", "/groups");
});

test("goes to friends page", () => {
    render(<App testingPath="/friends"/>);
    const langSet = langs.en; // default
    const button = screen.getByText(langSet["Friends"]);

    // on hover, should show dropdown with 'myFriends' and 'AddFriends' buttons
    fireEvent.mouseEnter(button);

    const myFriends = screen.getAllByText(langSet["MyFriends"]);
    const addFriends = screen.getAllByText(langSet["AddFriends"]);
    // should be 2, one in navbar dropdown and one in sidemenu
    expect(myFriends.length).toBe(2);
    expect(addFriends.length).toBe(2);

    expect(myFriends[0]).toHaveAttribute("href", "/friends");
    expect(myFriends[1]).toHaveAttribute("href", "/friends");
    expect(addFriends[0]).toHaveAttribute("href", "/friends-add");
    expect(addFriends[1]).toHaveAttribute("href", "/friends-add");

    fireEvent.mouseLeave(button);
});

test("goes to my schedule page", () => {
    render(<App testingPath="/"/>);
    const langSet = langs.en; // default
    const buttons = screen.getAllByText(langSet["MySchedule"]);
    // should be 2, one in navbar and one in sidemenu
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveAttribute("href", "/");
    expect(buttons[1]).toHaveAttribute("href", "/");
});

/* -------------------------- INTERNATIONALIZATION -------------------------- */

test("renders navbar in spanish", () => {
    localStorage.setItem("lang", "es");
    render(<App />);
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
});

test("renders settings button in spanish", () => {
    render(<App />);
    const langSet = langs.es;
    const langButton = screen.getByTitle(langs.en["Language"]);
    expect(langButton).toBeInTheDocument();

    fireEvent.click(langButton);
    const button = screen.getByTitle(langSet["Settings"]);
    expect(button).toBeInTheDocument();
});

test("renders profile button in spanish", () => {
    render(<App />);
    const langSet = langs.es;
    const langButton = screen.getByTitle(langs.en["Language"]);
    expect(langButton).toBeInTheDocument();

    fireEvent.click(langButton);
    const button = screen.getByTitle(langSet["Profile"]);
    expect(button).toBeInTheDocument();
});

test("renders language button in spanish", () => {
    render(<App />);
    const langSet = langs.es;
    const langButton = screen.getByTitle(langs.en["Language"]);
    expect(langButton).toBeInTheDocument();

    fireEvent.click(langButton);
    const button = screen.getByTitle(langSet["Language"]);
    expect(button).toBeInTheDocument();
});

test("renders notifications button in spanish", () => {
    render(<App />);
    const langSet = langs.es;
    const langButton = screen.getByTitle(langs.en["Language"]);
    expect(langButton).toBeInTheDocument();

    fireEvent.click(langButton);
    const button = screen.getByTitle(langSet["Notifications"]);
    expect(button).toBeInTheDocument();
});

test("renders options in spanish", () => {
    render(<App />);
    const langSet = langs.es;
    const langButton = screen.getByTitle(langs.en["Language"]);
    expect(langButton).toBeInTheDocument();

    fireEvent.click(langButton);
    const buttonsGroups = screen.getAllByText(langSet["Groups"]);
    expect(buttonsGroups.length).toBe(2);

    const buttonFriends = screen.getByText(langSet["Friends"]);
    expect(buttonFriends).toBeInTheDocument();

    fireEvent.mouseEnter(buttonFriends);

    const buttonsMyFriends = screen.getAllByText(langSet["MyFriends"]);
    const buttonsAddFriends = screen.getAllByText(langSet["AddFriends"]);

    expect(buttonsMyFriends.length).toBe(2);
    expect(buttonsAddFriends.length).toBe(2);

    fireEvent.mouseLeave(buttonFriends);

    const buttonsMySchedule = screen.getAllByText(langSet["MySchedule"]);
    expect(buttonsMySchedule.length).toBe(2);
});
