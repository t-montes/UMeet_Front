import React from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';
import FriendsPage from './FriendsPage/FriendsPage';

import './App.css';
import GroupsPage from './GroupsPage/GroupsPage';
import GroupCreateMenu from './GroupCreateMenu/GroupCreateMenu';
import EventCreateMenu from './EventCreateMenu/EventCreateMenu';

function App() {
  return (
    <div className="App">
      <AppContext.Provider value={{}}>
        <Navbar/>

        <FriendsPage/>
        <Timetable/>
        <GroupsPage/>
        <GroupCreateMenu/>
        <EventCreateMenu/>  

        <BrowserRouter>
          <Routes>
            {/*<Route path="/" element={<Timetable/>}/>*/}
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>

      <Fab
        alwaysShowTitle={true /* false, makes items only show title on hover */}
        icon={<i class="fa fa-plus"></i>}
        styles={{ backgroundColor: '#2c3e50' }}
      >
        <Action
          text="Agregar Evento"
        >
          <i class="fa fa-calendar"></i>
        </Action>
        <Action
            text="Crear Grupo"
          >
            <i class="fa fa-group"></i>
        </Action>
        <Action
            text="Agregar Amigo"
          >
            <i class="fa fa-user-plus"></i>
        </Action>
      </Fab>

    </div>
  );
}

export default App;
