import "./Settings.css"
import React, { useContext } from "react";
import AppContext from "../AppContext";
import Customization from "../Customization/Customization";
import { Link } from "react-router-dom";

function Settings() {
    const { langSet } = useContext(AppContext);
    return (
        <div className="Settings" data-testid="settings">
            <Customization />
            <Link to="/banner-linking"><button className="Settings-button">{langSet["LinkWithBanner"]}</button></Link>
        </div>
    )
}

export default Settings;