import React, { useState, useEffect } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';
import FriendsPage from './FriendsPage/FriendsPage';

import './App.css';
import GroupsPage from './GroupsPage/GroupsPage';
//import GroupCreateMenu from './GroupCreateMenu/GroupCreateMenu';
//import EventCreateMenu from './EventCreateMenu/EventCreateMenu';
//import BannerLinking from './BannerLinking/BannerLinking';

const recoverFromLocalStorage = (key, state, setState) => {
  if (localStorage.getItem(key) !== null) {
    setState(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, state);
  }
}

function App() {
  
  const [laborHours, setLaborHours] = useState([6,20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(6); // Monday to Saturday
  const [enableGrid, setEnableGrid] = useState(true);
  const [lang, setLang] = useState('es'); // ['es', 'en']

  useEffect(() => {
    recoverFromLocalStorage('lang', lang, setLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ctx = {
    laborHours, setLaborHours,
    lastLaborDay, setLastLaborDay,
    enableGrid, setEnableGrid,
  }

  return (
    <div className="App">
      <AppContext.Provider value={ctx}>
        <Navbar/>

        {/*<GroupCreateMenu/>
        <EventCreateMenu/>  
        <BannerLinking/>*/}

        <div className="Content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Timetable/>}/>
              <Route path="/friends" element={<FriendsPage/>}/>
              <Route path="/groups" element={<GroupsPage/>}/>
              {/*TODO: <Route path="/groups/:id" element={<GroupsPage/>}/>*/}
              {/*TODO: <Route path="/users/:id" element={<UserPage/>}/>*/}
            </Routes>
          </BrowserRouter>
        </div>

      </AppContext.Provider>

      <Fab
        alwaysShowTitle={true /* false, makes items only show title on hover */}
        icon={<i className="fa fa-plus"></i>}
        styles={{ backgroundColor: '#2c3e50' }}
      >
        <Action
          text="Agregar Evento"
        >
          <i className="fa fa-calendar"></i>
        </Action>
        <Action
            text="Crear Grupo"
          >
            <i className="fa fa-group"></i>
        </Action>
        <Action
            text="Agregar Amigo"
          >
            <i className="fa fa-user-plus"></i>
        </Action>
      </Fab>
    </div>
  );
}

export default App;
