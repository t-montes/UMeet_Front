import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import * as langs from '../langs';

/* -------------------------- SETUP -------------------------- */

beforeEach(() => {
    localStorage.setItem("lang", "en");
    // set date to 2023 October 10th
    jest.useFakeTimers().setSystemTime(new Date(2023, 9, 10));
});

/* -------------------------- RENDERING -------------------------- */
test("renders timetable", () => {
    render(<App />);
    const timetable = screen.getByTestId("timetable");
    expect(timetable).toBeInTheDocument();
});

test("renders button to go back to today", () => {
    render(<App />);
    const langSet = langs.en; // default
    const button = screen.getByText(langSet["Today"]);
    expect(button).toBeInTheDocument();
});

test("renders button to go back a week", () => {
    render(<App />);
    const button = screen.getByText("<");
    expect(button).toBeInTheDocument();
});

test("renders button to go forward a week", () => {
    render(<App />);
    const button = screen.getByText(">");
    expect(button).toBeInTheDocument();
});

test("renders current week", () => {
    render(<App />);
    const langSet = langs.en; // default
    const today = new Date();
    const day = screen.getByText(langSet.days[today.getDay()]);
    const dayNumber = screen.getByText(today.getDate());

    expect(day).toBeInTheDocument();
    expect(day).toHaveClass("timetable-todaycol");

    expect(dayNumber).toBeInTheDocument();
});

test("renders current month and year", () => {
    render(<App />);
    const langSet = langs.en; // default
    const today = new Date();
    const title = screen.getByTestId("timetable-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(langSet.months[today.getMonth()]);
    expect(title).toHaveTextContent(today.getFullYear());
});

/* -------------------------- BEHAVIOUR -------------------------- */
test("goes to next week", () => {
    render(<App />);
    const langSet = langs.en; // default
    const today = new Date();
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);
    today.setDate(today.getDate()+7);
    const title = screen.getByTestId("timetable-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(langSet.months[today.getMonth()]);
    expect(title).toHaveTextContent(today.getFullYear());

    const day = screen.getByText(langSet.days[today.getDay()]);
    const dayNumber = screen.getByText(today.getDate());

    expect(day).toBeInTheDocument();
    expect(dayNumber).toBeInTheDocument();
});

test("goes to previous week", () => {
    render(<App />);
    const langSet = langs.en; // default
    const today = new Date();
    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);
    today.setDate(today.getDate()-7);
    const title = screen.getByTestId("timetable-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(langSet.months[today.getMonth()]);
    expect(title).toHaveTextContent(today.getFullYear());

    const day = screen.getByText(langSet.days[today.getDay()]);
    const dayNumber = screen.getByText(today.getDate());

    expect(day).toBeInTheDocument();
    expect(dayNumber).toBeInTheDocument();
});

test("goes back to today after moving to next week", () => {
    render(<App />);
    const langSet = langs.en; // default
    const today = new Date();
    const nextButton = screen.getByText(">");
    const todayButton = screen.getByText(langSet["Today"]);

    // move a random number of weeks, behavior should be the same
    const anyNumber = Math.floor(Math.random() * 10); 
    for (let i=0; i < anyNumber; i++) {
        fireEvent.click(nextButton);
    }
    fireEvent.click(todayButton);

    const todayDay = screen.getByText(langSet.days[today.getDay()]);
    const todayDayNumber = screen.getByText(today.getDate());

    expect(todayDay).toBeInTheDocument();
    expect(todayDay).toHaveClass("timetable-todaycol");
    expect(todayDayNumber).toBeInTheDocument();
});

test("goes back to today after moving to previous week", () => {
    render(<App />);
    const langSet = langs.en; // default
    const today = new Date();
    const prevButton = screen.getByText("<");
    const todayButton = screen.getByText(langSet["Today"]);

    // move a random number of weeks, behavior should be the same
    const anyNumber = Math.floor(Math.random() * 10); 
    for (let i=0; i < anyNumber; i++) {
        fireEvent.click(prevButton);
    }
    fireEvent.click(todayButton);

    const todayDay = screen.getByText(langSet.days[today.getDay()]);
    const todayDayNumber = screen.getByText(today.getDate());

    expect(todayDay).toBeInTheDocument();
    expect(todayDay).toHaveClass("timetable-todaycol");
    expect(todayDayNumber).toBeInTheDocument();
});

/* -------------------------- INTERNATIONALIZATION -------------------------- */

test("renders month in spanish", () => {
    render(<App />);
    const langSet = langs.es;

    // change language to spanish
    const langButton = screen.getByText("EN");
    fireEvent.click(langButton);

    const today = new Date();
    const title = screen.getByTestId("timetable-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(langSet.months[today.getMonth()]);
    expect(title).toHaveTextContent(today.getFullYear());
});

test("renders day in spanish", () => {
    render(<App />);
    const langSet = langs.es;

    // change language to spanish
    const langButton = screen.getByText("EN");
    fireEvent.click(langButton);

    const today = new Date();
    const day = screen.getByText(langSet.days[today.getDay()]);
    const dayNumber = screen.getByText(today.getDate());

    expect(day).toBeInTheDocument();
    expect(dayNumber).toBeInTheDocument();
});
