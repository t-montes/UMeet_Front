import React, { useContext } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';
import FriendsPage from './FriendsPage/FriendsPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <AppContext.Provider value={{}}>
        <Navbar/>
        {/* meter aca los componentes */}
        <FriendsPage/>
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
