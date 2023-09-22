import React, { useState } from "react";
import "./Customization.css";
import ControlledSelect from './ControlledSelect/ControlledSelect';
import CheckBox from './Checkbox/Checkbox';
import Slider from './Slider/Slider';
import ColorPicker from "./ColorPicker/ColorPicker";

function Customization() {

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
                Personalizar
            </button>

            {customization && (
                <div className="customization">
                    <div
                        onClick={toggleCustom}
                        className="customization_overlay"></div>
                    <div className="customization_content">
                        <div className="customization_btn-container">
                            <h2>Personalización de Horario</h2>
                        </div>
                        <div className="customization_select-customization_container">
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    Primer día:
                                </div>
                                <ControlledSelect />
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    Último día:
                                </div>
                                <ControlledSelect />
                            </div>
                        </div>

                        <div className="customization_select-customization_container">
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    Hora inicio:
                                </div>
                                <CheckBox />
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    Hora fin:
                                </div>
                                <CheckBox />
                            </div>
                        </div>

                        <div className="customization_container">
                            <div className="customization_select-label">
                                Selecciona el tamaño del texto:
                            </div>
                            <Slider />
                        </div>

                        <div className="customization_container2">
                            <div className="customization_select-label2">
                                Selecciona el color del texto:
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