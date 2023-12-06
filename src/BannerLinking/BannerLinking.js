import "./BannerLinking.css";
import React, { useContext, useState, useEffect } from "react";
import Timetable from "../Timetable/Timetable";
import AppContext from "../AppContext";

function BannerLinking() {

    const ctx = useContext(AppContext);
    const { loadCalendar, lang, langSet, user } = ctx;

    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        loadCalendar().then((cal) => {
            console.log("retrieved!", cal);
          setCalendar(cal);
        });
    }, [loadCalendar]);
    

    return (
        <div className="BannerLinking">
            <div className="BannerLinking-main">
                <div className="BannerLinking-welcome">
                    <h1>{lang === "es" && "¡"}{langSet["Welcome"]} {user?.name}!</h1>
                </div>
                <button className="BannerLinking-linking" onClick={() => {window.location.href = "/"}}>
                    <h2>{langSet["LinkWithBanner"]}</h2>
                </button>
            </div>
            <div className="BannerLinking-background">
                <Timetable calendar={calendar}/>
            </div>
        </div>
    );
}

export default BannerLinking;