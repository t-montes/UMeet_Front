import './Timetable.css'
import React, { useState, useEffect } from 'react';

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
  /* -------------------------- VARIABLES -------------------------- */

  const [laborHours, setLaborHours] = useState([6,20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(7); // Monday to Saturday
  const [enableGrid, setEnableGrid] = useState(true);
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
  }, []);

  /* -------------------------- COMPONENT -------------------------- */
  return (
    <div className="timetable-main">
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
          {/*<tr *ngFor="let h of range(6,20)">
              <td class="bordercell">{{h%12 ? h%12 : 12}} {{h >= 12 ? "p.m." : "a.m."}}</td>
              <td *ngFor="let d of weekNotInBetween(h)" [ngClass]="classOfCell(d,h)"
              [attr.rowspan]="citaInTime(d,h) ? numHours(citaInTime(d,h)) : 1">
                  <a (click)="onSelected(citaInTime(d,h))">
                    {textOfCell(d,h)}
                  </a>
              </td>
            </tr>*/}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;