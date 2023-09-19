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

import es from './lang/es.json';
import en from './lang/en.json';

function App() {

  const langs = { es, en };

  // get default lang from localStorage, if not, set it to 'es'
  const defaultLang = localStorage.getItem('lang');
  if (defaultLang === null) {
    localStorage.setItem('lang', 'es');
  }
  
  const [laborHours, setLaborHours] = useState([6,20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(6); // Monday to Saturday
  const [enableGrid, setEnableGrid] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang'));
  const [langSet, setLangSet] = useState(langs[lang]);
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    setLangSet(langs[lang]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ lang ]);

  useEffect(() => {
    // TODO: delete this - get element from Mockup API
    fetch('https://my.api.mockaroo.com/users.json?key=b07daaf0')
      .then(response => response.json())
      .then(data => {
        setUser(data[0]);
      });
  }, []);

  useEffect(() => {
    // TODO: delete this - get element from Mockup API
    fetch('https://my.api.mockaroo.com/groups.json?key=13d161b0')
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        console.log(data[0].imagenesPerfil);
      });
  }, []);

  const ctx = {
    laborHours, setLaborHours,
    lastLaborDay, setLastLaborDay,
    enableGrid, setEnableGrid,
    lang, setLang, langSet,
    user, setUser,
    groups, setGroups,
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
              {/*TODO: <Route path="/settings" element={<Settings/>}/>*/}
              <Route path="*" element={<h1>{langSet["404"]}</h1>}/>
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
          text={langSet["CreateEvent"]}
        >
          <i className="fa fa-calendar"></i>
        </Action>
        <Action
            text={langSet["CreateGroup"]}
          >
            <i className="fa fa-group"></i>
        </Action>
        <Action
            text={langSet["AddFriend"]}
          >
            <i className="fa fa-user-plus"></i>
        </Action>
      </Fab>
    </div>
  );
}

export default App;
