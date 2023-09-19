import "./BannerLinking.css";
import React, { useContext } from "react";
import Timetable from "../Timetable/Timetable";
import AppContext from "../AppContext";

function BannerLinking() {

    const ctx = useContext(AppContext);
    const { lang, langSet } = ctx;

    return (
        <div className="BannerLinking">
            <div className="BannerLinking-main">
                <div className="BannerLinking-welcome">
                    <h1>{lang === "es" && "¡"}{langSet["Welcome"]} Thais!</h1>
                </div>
                <button className="BannerLinking-linking">
                    <h2>{langSet["LinkWithBanner"]}</h2>
                </button>
            </div>
            <div className="BannerLinking-background">
                <Timetable/>
            </div>
        </div>
    );
}

export default BannerLinking;