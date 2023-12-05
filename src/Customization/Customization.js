import React, { useState, useEffect, useContext } from "react";
import "./Customization.css";
import TextField from './TextField/TextField';
import AppContext from "../AppContext";

function Customization() {
    const { loadSettings, langSet } = useContext(AppContext);
    const [settings, setSettings] = useState({ startHour: '', endHour: '', lastLaborDay: '', enableGrid: false });
    const [customization, setCustomization] = useState(false);
    const [warnings, setWarnings] = useState({ startHour: '', endHour: '', lastLaborDay: '' });

    useEffect(() => {
        const fetchSettings = async () => {
            const settingsData = await loadSettings();
            if (settingsData && settingsData.length > 0) {
                setSettings({
                    startHour: settingsData[0].startHour,
                    endHour: settingsData[0].endHour,
                    lastLaborDay: settingsData[0].lastLaborDay,
                    enableGrid: settingsData[0].enableGrid
                });
            }
        };

        fetchSettings();
    }, [loadSettings]);

    const toggleCustom = () => {
        setCustomization(!customization);
        document.body.style.overflow = customization ? "auto" : "hidden";
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setSettings({...settings, [name]: value});
        setWarnings({...warnings, [name]: ''}); // Clear warning for the field
    }

    const validateSettings = () => {
        let isValid = true;
        let newWarnings = { ...warnings };

        // Validaciones para startHour y endHour
        if (settings.startHour !== '' && (parseInt(settings.startHour) < 1 || parseInt(settings.startHour) > 24)) {
            newWarnings.startHour = 'Hour must be between 1 and 24';
            isValid = false;
        }
        if (settings.endHour !== '' && (parseInt(settings.endHour) < 1 || parseInt(settings.endHour) > 24)) {
            newWarnings.endHour = 'Hour must be between 1 and 24';
            isValid = false;
        }
        // Validación para lastLaborDay
        if (settings.lastLaborDay !== '' && (parseInt(settings.lastLaborDay) < 1 || parseInt(settings.lastLaborDay) > 7)) {
            newWarnings.lastLaborDay = 'Day must be between 1 and 7';
            isValid = false;
        }

        // Validación adicional para endHour < startHour
        if (parseInt(settings.endHour) < parseInt(settings.startHour)) {
            newWarnings.endHour = 'End hour must be greater than start hour';
            isValid = false;
        }

        setWarnings(newWarnings);
        return isValid;
    }

    const handleSave = () => {
        if (validateSettings()) {
            // Proceso de guardado si la validación es exitosa
            // Por ejemplo, podrías llamar a una función para guardar los ajustes
            console.log('Settings saved:', settings);
            toggleCustom(); // Cierra el modal si todo está correcto
        }
    }

    return (
        <div className="customization_customization_container">
            <button onClick={toggleCustom} className="customization_btn">
                {langSet["Personalize"]}
            </button>

            {customization && (
                <div className="customization">
                    <div onClick={toggleCustom} className="customization_overlay"></div>
                    <div className="customization_content">
                        <div className="customization_btn-container">
                            <h2>{langSet["ScheduleCustomization"]}</h2>
                        </div>
                        <div className="customization_select-customization_container">
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["StartTime"]}:
                                </div>
                                <TextField
                                    name="startHour"
                                    value={settings.startHour}
                                    onChange={handleInputChange}
                                />
                                {warnings.startHour && <p className="warning">{warnings.startHour}</p>}
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["EndTime"]}:
                                </div>
                                <TextField
                                    name="endHour"
                                    value={settings.endHour}
                                    onChange={handleInputChange}
                                />
                                {warnings.endHour && <p className="warning">{warnings.endHour}</p>}
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["LastLaborDay"]}:
                                </div>
                                <TextField
                                    name="lastLaborDay"
                                    value={settings.lastLaborDay}
                                    onChange={handleInputChange}
                                />
                                {warnings.lastLaborDay && <p className="warning">{warnings.lastLaborDay}</p>}
                            </div>
                        </div>
                        <div className="customization_enableGrid_container">
                            <div className="customization_checkbox_label">
                                {langSet["EnableGrid"]}:
                            </div>
                            <input
                                name="enableGrid"
                                type="checkbox"
                                checked={settings.enableGrid}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="customization_btn-container">
                            <button className="customization_close" onClick={handleSave}>
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
