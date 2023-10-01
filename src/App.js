import React, { useState, useEffect } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';
import Modal from '@mui/material/Modal';

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';
import FriendsPage from './FriendsPage/Friends/FriendsPage';
import AddFriendsPage from './FriendsPage/AddFriends/AddFriendsPage';
import GroupsPage from './GroupsPage/GroupsPage';
import EventCreateMenu from './EventCreateMenu/EventCreateMenu'; // Uncomment this import
import GroupCreateMenu from './GroupCreateMenu/GroupCreateMenu'; // Assuming you have it in the root, change the path accordingly
import BannerLinking from './BannerLinking/BannerLinking';
import Settings from './Settings/Settings';


import './App.css';

import es from './lang/es.json';
import en from './lang/en.json';

// mock default data
const defaultUser = {
  username: "t.tamaio",
  name: "Thais Tamaio",
  image: "assets/icon1.png",
  email: "t.tamaio@uniandes.edu.co"
}

const defaultGroups = [
  { colorFondo: "#4A6FA5" , colorTexto:"white", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , colorTexto:"white", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , colorTexto:"white", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#C0D6DF" , colorTexto:"black", textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
];

const defaultFriends = [
    { name: "Sofia Torres", image: 'assets/icon1.png'},
    { name: "Jesús Jiménez", image: 'assets/icon3.png'},
    { name: "Juan Ramírez", image: 'assets/icon2.png'},
    { name: "Mariana Gómez", image: 'assets/icon4.png'},
    { name: "Paula Daza", image: 'assets/icon5.png'},
    { name: "Carlos Falla", image: 'assets/icon6.png'},
    { name: "Diego López", image: 'assets/icon1.png'},
    { name: "Santiago Pérez", image: 'assets/icon2.png'},
];

function App() {

  const langs = { es, en };

  // get default lang from localStorage, if not, set it to 'es'
  const defaultLang = localStorage.getItem('lang');
  if (defaultLang === null) {
    localStorage.setItem('lang', (navigator.language || navigator.userLanguage).split('-')[0]);
  }
  
  const [laborHours, setLaborHours] = useState([6,20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(6); // Monday to Saturday
  const [enableGrid, setEnableGrid] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang'));
  const [langSet, setLangSet] = useState(langs[lang]);
  const [user, setUser] = useState(defaultUser);
  const [showEventCreateMenu, setShowEventCreateMenu] = useState(false); // Step 1: Add a new state variable
  const [showGroupCreateMenu, setShowGroupCreateMenu] = useState(false); // State to control the visibility of the GroupCreateMenu


  useEffect(() => {
    localStorage.setItem('lang', lang);
    setLangSet(langs[lang]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ lang ]);

  useEffect(() => {
    fetch('https://my.api.mockaroo.com/users.json?key=b07daaf0')
      .then( response => {
        if (response.ok) 
          return response.json();
        else
          return defaultUser;
      })
      .then( response => {
        setUser(response);
      });
  }, []);

    const loadGroups = (async () => {
      return await fetch('https://my.api.mockaroo.com/groups.json?key=13d161b0')
      .then( response => {
        if (response.ok) 
          return response.json();
        else
          return defaultGroups;
      });
  });

  const loadFriends = (async () => {
    return await fetch('https://my.api.mockaroo.com/friends.json?key=b07daaf0')
    .then( response => {
      if (response.ok) 
        return response.json();
      else
        return defaultFriends;
    });
  });

  const ctx = {
    laborHours, setLaborHours,
    lastLaborDay, setLastLaborDay,
    enableGrid, setEnableGrid,
    lang, setLang, langSet,
    user, setUser,
    loadGroups, loadFriends
  }

  return (
    <div className="App">
      <AppContext.Provider value={ctx}>
        
        <Navbar/>
        <div className="Content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Timetable/>}/>
              <Route path="/friends" element={<FriendsPage/>}/>
              <Route path="/friends-add" element={<AddFriendsPage/>}/>
              <Route path="/groups" element={<GroupsPage/>}/>
              <Route path="/settings" element={<Settings/>}/>
              <Route path="/banner-linking" element={<BannerLinking/>}/>
              {/*TODO: <Route path="/groups/:id" element={<GroupsPage/>}/>*/}
              {/*TODO: <Route path="/users/:id" element={<UserPage/>}/>*/}
              <Route path="*" element={<h1>{langSet["404"]}</h1>}/>
            </Routes>
          </BrowserRouter>
        </div>
        {!showGroupCreateMenu && !showEventCreateMenu && (
          <Fab
            alwaysShowTitle={true /* false, makes items only show title on hover */}
            icon={<i className="fa fa-plus"></i>}
            styles={{ backgroundColor: '#2c3e50' }}
          >
            <Action
              text={langSet["CreateEvent"]}
              onClick={() => setShowEventCreateMenu(true)}

            >
              <i className="fa fa-calendar"></i>
            </Action>
            <Action
                text={langSet["CreateGroup"]}
                onClick={() => setShowGroupCreateMenu(true)}
              >
                <i className="fa fa-group"></i>
            </Action>
            <Action
                text={langSet["AddFriend"]}
                onClick={() => window.location.href = "/friends-add"}
              >
                <i className="fa fa-user-plus"></i>
            </Action>
          </Fab>
        )}
        <Modal
          open={showEventCreateMenu}
          onClose={() => setShowEventCreateMenu(false)}
          aria-labelledby="event-create-modal"
          // fix: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
        >
          <EventCreateMenu onClose={() => setShowEventCreateMenu(false)} />
        </Modal>
        <Modal
          open={showGroupCreateMenu}
          onClose={() => setShowGroupCreateMenu(false)}
          aria-labelledby="group-create-modal"
        >
          <GroupCreateMenu onClose={() => setShowGroupCreateMenu(false)} />
      </Modal>
  </AppContext.Provider>
</div>
);
}

export default App;
