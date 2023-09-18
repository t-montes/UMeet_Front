import React, { useContext } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';
import FriendsPage from './FriendsPage/FriendsPage';
import SearchBar from './SearchBar/SearchBar';

import './App.css';
import GroupsPage from './GroupsPage/GroupsPage';
import GroupCreateMenu from './GroupCreateMenu/GroupCreateMenu';
import EventCreateMenu from './EventCreateMenu/EventCreateMenu';

function App() {
  return (
    <div className="App">
      <AppContext.Provider value={{}}>
        <Navbar/>
        {/* meter aca los componentes */}
        <SearchBar/>
        <FriendsPage/>
        <GroupsPage/>
        <GroupCreateMenu/>
        <EventCreateMenu/>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Timetable/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
