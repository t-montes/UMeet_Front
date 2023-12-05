import './Home.css'
import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../AppContext';
 import Timetable from '../Timetable/Timetable';

function Home() {
    const ctx = useContext(AppContext);
    const { loadCalendar } = ctx;

    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        loadCalendar().then((cal) => {
            console.log("retrieved!", cal);
          setCalendar(cal);
        });
    }, [loadCalendar]);
    
    return (
        <div className="home">
        <div className="home-timetable">
            <Timetable calendar={calendar}/>
        </div>
        </div>
    );
}

export default Home;
