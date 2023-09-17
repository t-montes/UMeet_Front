import React, { useContext } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';

import './App.css';

function App() {
  return (
    <div className="App">
      <AppContext.Provider value={{}}>
        <Navbar/>
        {/* meter aca los componentes */}
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
