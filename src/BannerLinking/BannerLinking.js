import "./BannerLinking.css";
import React from "react";
import Timetable from "../Timetable/Timetable";

function BannerLinking() {
    return (
        <div className="BannerLinking">
            <div className="BannerLinking-main">
                <div className="BannerLinking-welcome">
                    <h1>¡Bienvenida Thais!</h1>
                </div>
                <button className="BannerLinking-linking">
                    <h2>Vincular tu horario con Banner</h2>
                </button>
            </div>
            <div className="BannerLinking-background">
                <Timetable/>
            </div>
        </div>
    );
}

export default BannerLinking;