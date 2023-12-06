import React, { useState, useContext, useEffect } from "react";
import "./Customization.css";
import ControlledSelect from './ControlledSelect/ControlledSelect';
import CheckBox from './Checkbox/Checkbox';
import AppContext from "../AppContext";

function Customization() {
    const { token, loadSettings, langSet } = useContext(AppContext);

    const [customization, setCustomization] = useState(false);
    const [startTime, setStartTime] = useState(6);
    const [endTime, setEndTime] = useState(20);
    const [lastLaborDay, setLastLaborDay] = useState(1); // Asumiendo que Lunes es 1
    const [enableGrid, setEnableGrid] = useState(false); // Estado inicial establecido por loadSettings
    const [warning, setWarning] = useState('');
    const [settingsId, setSettingsId] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        loadSettings().then(data => {
            if (data && data.length > 0) {
                const settings = data[0];
                setStartTime(settings.startHour);
                setEndTime(settings.endHour);
                setLastLaborDay(settings.lastLaborDay);
                setEnableGrid(settings.enableGrid); // Establece el estado inicial de enableGrid
                setSettingsId(settings.id);
                setUserId(settings.user.id);
            }
        });
    }, [loadSettings]);

    const handleSave = () => {
        if (parseInt(startTime) >= parseInt(endTime)) {
            setWarning(langSet["StartTimeGreaterThanEndTime"]);
        } else {
            const url = `http://localhost:3001/api/v1/settings/${settingsId}/user/${userId}`;
            const data = {
                startHour: startTime,
                endHour: endTime,
                lastLaborDay: lastLaborDay,
                enableGrid: enableGrid // Usa el estado actual de enableGrid
            };

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setCustomization(false);
                document.body.style.overflow = "auto";
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            setWarning('');
        }
    };

    const toggleCustom = () => {
        setCustomization(!customization);
        document.body.style.overflow = customization ? "auto" : "hidden";
        setWarning('');
    };

    if (customization) {
        document.body.classList.add('active-customization');
    } else {
        document.body.classList.remove('active-customization');
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
                                    {langSet["LastDay"]}:
                                </div>
                                <ControlledSelect 
                                    value={lastLaborDay}
                                    onChange={(value) => setLastLaborDay(value)}
                                />
                            </div>
                        </div>

                        <div className="customization_select-customization_container">
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["StartTime"]}:
                                </div>
                                <input
                                    type="number"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    min="1"
                                    max="24"
                                />
                            </div>
                            <div className="customization_container">
                                <div className="customization_select-label">
                                    {langSet["EndTime"]}:
                                </div>
                                <input
                                    type="number"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    min="1"
                                    max="24"
                                />
                            </div>
                        </div>

                        <div className="customization_container">
                            <div className="customization_select-label">
                                {langSet["EnableGrid"]}:
                            </div>
                            <CheckBox
                                checked={enableGrid}
                                onChange={(e) => setEnableGrid(e.target.checked)}
                            />
                        </div>

                        {warning && <div className="customization_warning">{warning}</div>}

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
