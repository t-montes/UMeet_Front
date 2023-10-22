import React from "react";
import { render } from "@testing-library/react";
import SearchBar from "./SearchBar";
import AppContext from "../AppContext";

test("renders 'Search' as a placeholder when the language is English", () => {
  const contextValue = {
    langSet: {
      Search: "Search",
    },
  };

  const { getByPlaceholderText } = render(
    <AppContext.Provider value={contextValue}>
      <SearchBar />
    </AppContext.Provider>
  );

  const inputElement = getByPlaceholderText("Search");

  expect(inputElement).toBeInTheDocument();
});