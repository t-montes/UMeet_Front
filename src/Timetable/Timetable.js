import './Timetable.css'
import React, { useState, useEffect, useContext } from 'react';
import AppContext from "../AppContext";

const days = ['D','L','M','I','J','V','S'];
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const hourDivisions = 12; // 5 minutes intervals

const addDays = (from, days=1) => new Date(from.getTime() + (days*1000*60*60*24));
const range = (start, end) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

/**
 * @param {Event[]} calendar: array of events to render in the timetable
 * @param {Calendar[]} restrictions: array of calendars to check for available spaces between calendar and the rest
 */
function Timetable({ calendar, restrictions }) {
  const ctx = useContext(AppContext);
  const { laborHours, lastLaborDay, enableGrid } = ctx;
  /* -------------------------- VARIABLES -------------------------- */
  
  // TODO: Fix error: Sunday is always the first day, should be at the end
  const [currentWeek, setCurrentWeek] = useState([]);
  let currentDate = new Date();
  currentDate.setHours(0,0,0,0);

  /* -------------------------- FUNCTIONS -------------------------- */

  const inCurrent = (d) => {
    d.setHours(0,0,0,0);
    return (d >= addDays(currentDate,0)) && (d < addDays(currentDate,1))
  }

  const classOfTh = (d) => {
    let cls = 'timetable-header';//'lrbordercell';
    cls += inCurrent(d) ? ' timetable-todaycol' : '';
    return cls;
  }

  const classOfCell = (m) => {
    let cls = (m === 0 && enableGrid) ? 'timetable-grid' : '';
    return cls;
  }

  const backToToday = () => {
    let theWeek = [];
    while (theWeek.length < lastLaborDay) {
      theWeek.push(addDays(currentDate,theWeek.length-currentDate.getDay()));
    }
    setCurrentWeek(theWeek);
  }

  const backWeek = () => {
    let theWeek = [];
    while (theWeek.length < lastLaborDay) {
      theWeek.push(addDays(currentWeek[0],-7+theWeek.length));
    }
    setCurrentWeek(theWeek);
  }

  const nextWeek = () => {
    let theWeek = [];
    while (theWeek.length < lastLaborDay) {
      theWeek.push(addDays(currentWeek[0],theWeek.length+7));
    }
    setCurrentWeek(theWeek);
  }

  const renderEvents = () => {
    /* TODO: render all the calendar events, based on the current week */
    /* TODO: render all the AVAILABLE spaces between calendar an the rest of calendars in restrictions */
  }

  // Execute on load; [] means execute only at reaload
  useEffect(() => {
    backToToday();
    renderEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]); // Note: backToToday dependency is not needed, but it's here to avoid warnings

  /* -------------------------- COMPONENT -------------------------- */
  return (
    <div className="timetable-main">
      <div className="timetable-month">
        {currentWeek.length > 0 ? 
          (currentWeek[0].getMonth() === currentWeek[lastLaborDay-1].getMonth() ? 
            months[currentWeek[0].getMonth()] 
            : months[currentWeek[0].getMonth()]+" - "+months[currentWeek[lastLaborDay-1].getMonth()]) +
              " "+currentWeek[lastLaborDay-1].getFullYear()
          : ""
        }
      </div>
      <table className="timetable-calendar">
        <thead>
          <tr>
            <th>
              <div className="timetable-navbar">
                <button onClick={backToToday}>Hoy</button>
              </div>
              <div className="timetable-navbar">
                <button onClick={backWeek}>&lt;</button>
                <button onClick={nextWeek}>&gt;</button>
              </div> 
            </th>
            {currentWeek.map((d) => (
              <th key={d} className={classOfTh(d)}>
                {days[d.getDay()]} 
                <br/>
                <div>
                  {d.getDate()/*+"-"+months[d.getMonth()].toLowerCase().substring(0, 3)*/}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            range(laborHours[0],laborHours[1]).map((h) => (
              range(0,hourDivisions-1).map((m) => (
                <React.Fragment key={`${h},${m}`}>
                  <tr>
                    {m === 0 ? <td className="bordercell timetable-firstcol" rowSpan={hourDivisions}>{h%12 ? h%12 : 12}<br/>{h >= 12 ? "pm" : "am"}</td> : null}
                    {
                      currentWeek.map((d) => {
                        const time = d;
                        time.setHours(h,m*60/hourDivisions,0,0);
                        return (
                          <td key={time} className={classOfCell(m)}>
                            
                          </td>
                      )})
                    }
                  </tr>
                  {/*<div height="0.1px"></div>*/}
                </React.Fragment>
              ))
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;