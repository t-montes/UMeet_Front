import './App.css';
import React, { useState, useEffect } from 'react';
import AppContext from "./AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fab, Action } from 'react-tiny-fab';
import Modal from '@mui/material/Modal';

import Navbar from './Navbar/Navbar';
import FriendsPage from './FriendsPage/Friends/FriendsPage';
import AddFriendsPage from './FriendsPage/AddFriends/AddFriendsPage';
import GroupsPage from './GroupsPage/GroupsPage';
import GroupPage from './GroupPage/GroupPage';
import EventCreateMenu from './EventCreateMenu/EventCreateMenu';
import GroupCreateMenu from './GroupCreateMenu/GroupCreateMenu';
import BannerLinking from './BannerLinking/BannerLinking';
import Settings from './Settings/Settings';
import Home from './Home/Home';

import * as langs from './langs';

// mock default data
const defaultUser = {
  username: "t.tamaio",
  name: "Thais Tamaio",
  image: "assets/icon1.png",
  email: "t.tamaio@uniandes.edu.co"
}

const defaultGroups = [
  { colorFondo: "#4A6FA5", colorTexto: "white", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
  { colorFondo: "#C0D6DF", colorTexto: "black", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
  { colorFondo: "#C0D6DF", colorTexto: "black", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
  { colorFondo: "#4A6FA5", colorTexto: "white", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
  { colorFondo: "#4A6FA5", colorTexto: "white", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
  { colorFondo: "#C0D6DF", colorTexto: "black", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
  { colorFondo: "#C0D6DF", colorTexto: "black", textoCentral: "Programación con tecnologías web", imagenesPerfil: ["assets/icon1.png", "assets/icon2.png", "assets/icon3.png"] },
];

const defaultFriends = [
  { name: "Sofia Torres", image: 'assets/icon1.png' },
  { name: "Jesús Jiménez", image: 'assets/icon3.png' },
  { name: "Juan Ramírez", image: 'assets/icon2.png' },
  { name: "Mariana Gómez", image: 'assets/icon4.png' },
  { name: "Paula Daza", image: 'assets/icon5.png' },
  { name: "Carlos Falla", image: 'assets/icon6.png' },
  { name: "Diego López", image: 'assets/icon1.png' },
  { name: "Santiago Pérez", image: 'assets/icon2.png' },
];

const defaultNotifications = [
  {
    "id": "uuid-1",
    "text": "AAAAATienes una reunión para Desarrollo Web en 10 minutos.",
    "date": "2023-12-04T00:00:10.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-2",
    "text": "Se necesita confirmación para la nueva fecha de la reunión de Desarrollo Web.",
    "date": "2023-12-04T00:30:00.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-3",
    "text": "Thais Tamaio ha solicitado reagendar la reunión de Desarrollo Web.",
    "date": "2023-12-05T21:00:00.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-4",
    "text": "Se necesita confirmación para agendar la reunión de Desarrollo Web.",
    "date": "2023-12-06T00:00:00.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-5",
    "text": "Nueva reunión de Desarrollo Web programada por Thais Tamaio.",
    "date": "2023-12-04T00:00:10.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-6",
    "text": "Se necesita confirmación para ser agregado al grupo de Desarrollo Web.",
    "date": "2023-12-04T00:30:00.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-7",
    "text": "Has sido agregado al grupo de Desarrollo Web por Thais Tamaio.",
    "date": "2023-12-05T21:00:00.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  },
  {
    "id": "uuid-8",
    "text": "Thais Tamaio te ha mandado una solicitud de amistad.",
    "date": "2023-12-06T00:00:00.000Z",
    "redirection": null,
    "user": {
      "id": "381cc76d-0c7d-41be-b2d5-0be3995005fd",
      "name": "Harold Cruz",
      "login": "oscar33",
      "email": "oscar33@uniandes.edu.co"
    }
  }
];


const defaultCalendar = [
  // both, start and end must be multiple of 5 minutes
  // visualEnd is the minimum end to look good in the timetable (20 minutes minimum, from start)
  {
    title: "Desarrollo Web",
    startDate: "2023-10-24T08:00:00",
    endDate: "2023-10-24T09:20:00",
    visualendDate: "2023-10-24T09:20:00", // if event lasts at least 20 minutes, visualEnd == end
    location: "RGD 202",
  },
  {
    title: "Desarrollo de Tecnologías Web",
    startDate: "2023-10-27T08:00:00",
    endDate: "2023-10-27T09:20:00",
    visualendDate: "2023-10-27T09:20:00",
    location: "RGD 202",
  },
  {
    title: "Elementos",
    startDate: "2023-10-23T09:30:00",
    endDate: "2023-10-23T10:50:00",
    visualendDate: "2023-10-23T10:50:00",
    location: "O 105",
  },
  {
    title: "Elementos",
    startDate: "2023-10-25T09:30:00",
    endDate: "2023-10-25T10:50:00",
    visualendDate: "2023-10-25T10:50:00",
    location: "O 105",
  },
  {
    title: "Computación",
    startDate: "2023-10-24T09:30:00",
    endDate: "2023-10-24T10:50:00",
    visualendDate: "2023-10-24T10:50:00",
    location: "SD 806",
  },
  {
    title: "Computación Científica en Ingeniería Electrónica",
    startDate: "2023-10-26T09:30:00",
    endDate: "2023-10-26T10:50:00",
    visualendDate: "2023-10-26T10:50:00",
    location: "SD 806",
  },
  {
    title: "Ejercicioooo del día de hoy",
    startDate: "2023-10-28T07:30:00",
    endDate: "2023-10-28T07:35:00",
    visualendDate: "2023-10-28T07:50:00",
    location: "Gym",
  },
  {
    title: "Ejercicio Parte 2",
    startDate: "2023-10-28T08:00:00",
    endDate: "2023-10-28T08:30:00",
    visualendDate: "2023-10-28T08:30:00",
    location: "Gym",
  },
  {
    title: "Ejerciciooooo Parte 3",
    startDate: "2023-12-28T09:00:00",
    endDate: "2023-12-28T09:40:00",
    visualendDate: "2023-12-28T09:40:00",
    location: "Gym",
  },
  {
    title: "Móviles",
    startDate: "2023-10-25T11:00:00",
    endDate: "2023-10-25T12:20:00",
    visualendDate: "2023-10-25T12:20:00",
    location: "SD 401",
  },
  {
    title: "EJEMPLO",
    startDate: "2023-10-25T12:20:00",
    endDate: "2023-10-25T12:50:00",
    visualendDate: "2023-10-25T12:50:00",
    location: "SD 401",
  },
];

function App() {
  // this token was generated on purpose to test the app, it has no expiration date
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjowLCJwZXJtaXNzaW9ucyI6eyJncm91cHMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl0sInVzZXJzIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdLCJjYWxlbmRhcnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl0sImV2ZW50cyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXSwic2V0dGluZ3MiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl0sIm5vdGlmaWNhdGlvbiI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0sImlhdCI6MTcwMTc0MjQxM30.lfTuthX7uO_k43vv_AYuw6Tv86ss2ib1QtnZLLKrTCk';
  // this userId is part of the MOCK data after loading the sql/data.sql file in the back-end DB
  const userId = '381cc76d-0c7d-41be-b2d5-0be3995005fd';

  const tokenNotificaciones = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vdGlmaWNhdGlvblJlYWQiLCJzdWIiOjIyLCJwZXJtaXNzaW9ucyI6eyJub3RpZmljYXRpb24iOlsicmVhZCJdfSwiaWF0IjoxNzAxNzM4MzEwLCJleHAiOjE3MDE3NDU1MTB9.4Zo7UlR13tDIHH7dXX2TcOjwKoxSCXxlPocgMtdc8u0';
  const tokenSettings = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNldHRpbmdzUmVhZCIsInN1YiI6MTgsInBlcm1pc3Npb25zIjp7InNldHRpbmdzIjpbInJlYWQiXX0sImlhdCI6MTcwMTczODkwNSwiZXhwIjoxNzAxNzQ2MTA1fQ.v2-7-ZKTXQIhGz4cwxvNdI0UCZeJaA4ERRPnhT-_zRE'

  const defaultLang = localStorage.getItem('lang');
  if (defaultLang === null) {
    localStorage.setItem('lang', (navigator.language || navigator.userLanguage).split('-')[0]);
  }

  const [laborHours, setLaborHours] = useState([6, 20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(7); // Monday to Sunday
  const [enableGrid, setEnableGrid] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang'));
  const [langSet, setLangSet] = useState(langs[lang]);
  const [user, setUser] = useState(defaultUser);
  const [showEventCreateMenu, setShowEventCreateMenu] = useState(false); // Step 1: Add a new state variable
  const [showGroupCreateMenu, setShowGroupCreateMenu] = useState(false); // State to control the visibility of the GroupCreateMenu

  useEffect(() => {
    localStorage.setItem('lang', lang);
    setLangSet(langs[lang]);
  }, [lang]);

  useEffect(() => {
    if (navigator.onLine) {
      fetch(`http://localhost:3001/api/v1/users/${userId}`,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.ok)
            return response.json();
          else
            return defaultUser;
        })
        .then(response => {
          console.log("user", response);
          localStorage.setItem('user', JSON.stringify(response));
          setUser(response);
        });
    } else {
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser !== null) {
        setUser(localUser);
      } else {
        setUser(defaultUser);
      }
    }
  }, []);

  const loadGroups = (async () => {
    if (navigator.onLine) {
      return await fetch('https://my.api.mockaroo.com/groups.json?key=13d161b0')
        .then(response => {
          if (response.ok)
            return response.json();
          else
            return defaultGroups;
        })
        .then(response => {
          console.log("groups", response);
          localStorage.setItem('groups', JSON.stringify(response));
          return response;
        });
    } else {
      const localGroups = JSON.parse(localStorage.getItem('groups'));
      if (localGroups !== null) {
        return localGroups;
      } else {
        return defaultGroups;
      }
    }
  });

  const loadCalendar = (async () => {
    if (navigator.onLine) {
      return await fetch(`http://localhost:3001/api/v1/users/${userId}/calendar`,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.ok)
            return response.json();
          else
            return defaultCalendar;
        })
        .then(response => {
          response.events.forEach((e) => {
            e.startDate = new Date(e.startDate);
            e.endDate = new Date(e.endDate);
            e.visualEndDate = new Date(e.visualEndDate);
          });
          console.log("calendar", response);
          localStorage.setItem('calendar', JSON.stringify(response));
          return response;
        });
    } else {
      const localCalendar = JSON.parse(localStorage.getItem('calendar'));
      if (localCalendar !== null) {
        return localCalendar;
      } else {
        return defaultCalendar;
      }
    }
  });

  const loadFriends = (async () => {
    if (navigator.onLine) {
      return await fetch(`http://localhost:3001/api/v1/users/${userId}/friends`,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.ok)
            return response.json();
          else
            return defaultFriends;
        })
        .then(response => {
          console.log("friends", response);
          localStorage.setItem('friends', JSON.stringify(response));
          return response;
        });
    }
    else {
      const localFriends = JSON.parse(localStorage.getItem('friends'));
      if (localFriends !== null) {
        return localFriends;
      } else {
        return defaultFriends;
      }
    }
  });

  const loadNoFriends = (async () => {
    if (navigator.onLine) {
      return await fetch(`http://localhost:3001/api/v1/users/${userId}/non-friends`,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          if (response.ok)
            return response.json();
          else
            return defaultFriends;
        })
        .then(response => {
          console.log("friends", response);
          localStorage.setItem('friends', JSON.stringify(response));
          return response;
        });
    }
    else {
      const localFriends = JSON.parse(localStorage.getItem('friends'));
      if (localFriends !== null) {
        return localFriends;
      } else {
        return defaultFriends;
      }
    }
  });

  const loadNotifications = (async () => {
    if (navigator.onLine) {
      return await fetch(`http://localhost:3001/api/v1/notifications/user/${userId}`,
        { headers: { 'Authorization': `Bearer ${tokenNotificaciones}` } })
        .then(response => {
          if (response.ok)
            return response.json();
          else
            return defaultNotifications;
        })
        .then(response => {
          localStorage.setItem('notifications', JSON.stringify(response));
          return response;
        });
    }
    else {
      const localNotifications = JSON.parse(localStorage.getItem('notifications'));
      if (localNotifications !== null) {
        return localNotifications;
      } else {
        return defaultNotifications;
      }
    }
  });

  const loadSettings = (async () => {
    if (navigator.onLine) {
      return await fetch(`http://localhost:3001/api/v1/settings/user/${userId}`,
        { headers: { 'Authorization': `Bearer ${tokenSettings}` } })
        .then(response => {
          if (response.ok)
            return response.json();
        })
        .then(response => {
          localStorage.setItem('settings', JSON.stringify(response));
          return response;
        });
    }
  });

  const ctx = {
    token,
    laborHours, setLaborHours,
    lastLaborDay, setLastLaborDay,
    enableGrid, setEnableGrid,
    lang, setLang, langSet,
    user, setUser,
    loadGroups, loadFriends, loadNotifications, loadCalendar, loadNoFriends, loadSettings
  }

  return (
    <div className="App" data-testid="App">
      <AppContext.Provider value={ctx}>

        <Navbar />
        <div className="Content">
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/friends-add" element={<AddFriendsPage />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/banner-linking" element={<BannerLinking />} />
              <Route path="/group/:groupId" element={<GroupPage />} />
              <Route path="*" element={<h1>{langSet["404"]}</h1>} />
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
