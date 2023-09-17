import './Timetable.css'
import React, { useState, useEffect } from 'react';

const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const hourDivisions = 12; // 5 minutes intervals

const addDays = (from, days=1) => new Date(from.getTime() + (days*1000*60*60*24));
const range = (start, end) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

function Timetable() {
  /* -------------------------- VARIABLES -------------------------- */

  const [laborHours, setLaborHours] = useState([6,20]); // 6 a.m. to 8 p.m.
  const [lastLaborDay, setLastLaborDay] = useState(7); // Monday to Saturday
  const [currentWeek, setCurrentWeek] = useState([]);
  let currentDate = new Date();
  currentDate.setHours(0,0,0,0);

  /* -------------------------- FUNCTIONS -------------------------- */

  const inCurrent = (d) => {
    d.setHours(0,0,0,0);
    return (d >= addDays(currentDate,0)) && (d < addDays(currentDate,1))
  }

  const classOfCell = (time) => {
    let cls = 'lrbordercell';
    cls += inCurrent(time) ? ' timetable-todaycol' : '';
    return cls;
  }

  const backToToday = () => {
    let theWeek = [];
    while (theWeek.length < lastLaborDay) {
      theWeek.push(addDays(currentDate,theWeek.length+1-currentDate.getDay()));
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

  // Execute on load; [] means execute only at reaload
  useEffect(() => {
    backToToday();
  }, []);

  /* -------------------------- COMPONENT -------------------------- */
  return (
    <div className="App">
      <table className="timetable-calendar">
        <thead>
          <tr>
            <th></th>
            {currentWeek.map((d) => (
              <th key={d} className="bordercell">
                {days[d.getDay()]} 
                <br />
                {`${d.getDate()}-${months[d.getMonth()].toLowerCase().substring(0, 3)}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            range(laborHours[0],laborHours[1]).map((h) => (
              range(0,hourDivisions-1).map((m) => (
                <tr key={`${h},${m}`}>
                  {m === 0 ? <td className="bordercell" rowSpan={hourDivisions}>{h%12 ? h%12 : 12}<br/>{h >= 12 ? "p.m." : "a.m."}</td> : null}
                  {
                    currentWeek.map((d) => {
                      const time = d;
                      time.setHours(h,m*60/hourDivisions,0,0);
                      return (
                        <td key={time} className={classOfCell(time)}>
                          
                        </td>
                    )})
                  }
                </tr>
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
      <button onClick={backToToday}>Hoy</button>
      <button onClick={backWeek}>Anterior</button>
      <button onClick={nextWeek}>Siguiente</button>
    </div>
  );
}

export default Timetable;