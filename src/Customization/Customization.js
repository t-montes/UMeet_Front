import React, { useState, useContext } from "react";
import "./Customization.css";
import ControlledSelect from './ControlledSelect/ControlledSelect';
import CheckBox from './Checkbox/Checkbox';
import Slider from './Slider/Slider';
import ColorPicker from "./ColorPicker/ColorPicker";
import AppContext from "../AppContext";

function Customization() {

    const { langSet } = useContext(AppContext);

    const [customization, setCustomization] = useState(false);

    const toggleCustom = () => {
        setCustomization(!customization);
        document.body.style.overflow = customization ? "auto" : "hidden";
    }

    if (customization) {
        document.body.classList.add('active-customization');
    } else {
        document.body.classList.remove('active-customization');
    }

    return (
        <div className="customization_customization_container">
            <button
                onClick={toggleCustom}
                className="customization_btn">
                {langSet["Personalize"]}
            </button>

            {customization && (
                <div className="customization">
                    <div
                        onClick={toggleCustom}
                        className="customization_overlay"></div>
                    <div className="customization_content">
                        <div className="customization_btn-container">
                            <h2>{langSet["ScheduleCustomization"]}</h2>
                        </div>
                        <div className="customization_select-customization_container">
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["FirstDay"]}:
                                </div>
                                <ControlledSelect />
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["LastDay"]}:
                                </div>
                                <ControlledSelect />
                            </div>
                        </div>

                        <div className="customization_select-customization_container">
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["StartTime"]}:
                                </div>
                                <CheckBox />
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["EndTime"]}:
                                </div>
                                <CheckBox />
                            </div>
                        </div>

                        <div className="customization_container">
                            <div className="customization_select-label">
                                {langSet["TextSize"]}:
                            </div>
                            <Slider />
                        </div>

                        <div className="customization_container2">
                            <div className="customization_select-label2">
                                {langSet["TextColor"]}:
                            </div>
                            <ColorPicker />
                        </div>
                        <div className="customization_btn-container">
                            <button className="customization_close" onClick={toggleCustom}>
                            Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customization;