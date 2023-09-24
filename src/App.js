import React, { useState, useEffect } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';
import Modal from '@mui/material/Modal';

import Navbar from './Navbar/Navbar';
import Timetable from './Timetable/Timetable';
import FriendsPage from './FriendsPage/FriendsPage';
import Customization from './Customization/Customization';
import EventCreateMenu from './EventCreateMenu/EventCreateMenu'; // Uncomment this import


import './App.css';
import GroupsPage from './GroupsPage/GroupsPage';
//import GroupCreateMenu from './GroupCreateMenu/GroupCreateMenu';
//import EventCreateMenu from './EventCreateMenu/EventCreateMenu';
//import BannerLinking from './BannerLinking/BannerLinking';

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
  { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
  { colorFondo: "#4A6FA5" , textoCentral: "Programación con tecnologías web" , imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"]},
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
    localStorage.setItem('lang', 'es');
  }
  
  const [laborHours, setLaborHours] = useState([6,20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(6); // Monday to Saturday
  const [enableGrid, setEnableGrid] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang'));
  const [langSet, setLangSet] = useState(langs[lang]);
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState(defaultFriends);
  const [showEventCreateMenu, setShowEventCreateMenu] = useState(false); // Step 1: Add a new state variable

  useEffect(() => {
    localStorage.setItem('lang', lang);
    setLangSet(langs[lang]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ lang ]);

  useEffect(() => {
    // TODO: change this - get element from Mockup API
    fetch('https://my.api.mockaroo.com/users.json?key=b07daaf0')
      .then( response => {
        if (response.ok) {
          setUser(response.json());
        } else {
          setUser(defaultUser);
        }
      });
  }, []);

  useEffect(() => {
    // TODO: change this - get element from Mockup API
    fetch('https://my.api.mockaroo.com/groups.json?key=13d161b0')
      .then( response => {
        if (response.ok) {
          setGroups(response.json());
        } else {
          setGroups(defaultGroups);
        }
      });
  }, []);

  const ctx = {
    laborHours, setLaborHours,
    lastLaborDay, setLastLaborDay,
    enableGrid, setEnableGrid,
    lang, setLang, langSet,
    user, setUser,
    groups, setGroups,
    friends, setFriends,
  }

  return (
    <div className="App">
      <AppContext.Provider value={ctx}>
        
        <Navbar/>
        {showEventCreateMenu && <EventCreateMenu onClose={() => setShowEventCreateMenu(false)}/>}
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
        {!showEventCreateMenu && (

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
    >
      <i className="fa fa-group"></i>
  </Action>
  <Action
      text={langSet["AddFriend"]}
    >
      <i className="fa fa-user-plus"></i>
  </Action>
</Fab>
)};
{/* Modal to hold the EventCreateMenu */}
<Modal
open={showEventCreateMenu}
onClose={() => setShowEventCreateMenu(false)}
aria-labelledby="event-create-modal"
>
<EventCreateMenu onClose={() => setShowEventCreateMenu(false)} />
</Modal>
  </AppContext.Provider>
</div>
);
}

export default App;
