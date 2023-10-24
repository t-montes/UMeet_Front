import './Timetable.css'
import React, { useState, useEffect, useContext } from 'react';
import AppContext from "../AppContext";

const hourDivisions = 12; // 5 minutes intervals

const addDays = (from, days=1) => new Date(from.getTime() + (days*1000*60*60*24));
const range = (start, end) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

/**
 * @param {Event[]} calendar: array of events to render in the timetable
 * @param {Calendar[]} restrictions: array of calendars to check for available spaces between calendar and the rest
 */
function Timetable({ calendar, restrictions }) {

  if (!calendar) calendar = [];
  if (!restrictions) restrictions = [];

  const ctx = useContext(AppContext);
  const { laborHours, lastLaborDay, enableGrid, langSet } = ctx;

  const days = langSet.days;
  const months = langSet.months;

  /* -------------------------- VARIABLES -------------------------- */

  const [currentWeek, setCurrentWeek] = useState([]);
  let currentDate = new Date();
  currentDate.setHours(0,0,0,0);

  /* -------------------------- FUNCTIONS -------------------------- */

  const inCurrent = (d) => {
    d.setHours(0,0,0,0);
    return (d >= addDays(currentDate,0)) && (d < addDays(currentDate,1))
  }

  const classOfTh = (d) => {
    let cls = 'timetable-header';
    cls += inCurrent(d) ? ' timetable-todaycol' : '';
    return cls;
  }

  const classOfCell = (m) => {
    let cls = ((m === 0 && enableGrid) ? 'timetable-grid' : '');
    return cls;
  }

  const backToToday = () => {
    let theWeek = [];
    while (theWeek.length < 7) {
      theWeek.push(addDays(currentDate,theWeek.length-currentDate.getDay()));
    }

    theWeek = theWeek.slice(1).concat(theWeek.slice(0,1));
    theWeek = theWeek.slice(0,lastLaborDay);
    
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

  const eventOnTime = (time, m) => {
    /* Function that receives time and returns <td> element.
        If an event STARTS in this time, return a <td> with the event, and all the rowspans needed.
        If an event CROSSES this time, return null, because it was rendered at the start and spans all the time it needs.
        If NONE of those, return a <td> with a blank space. (<td key={time} className={classOfCell(m)} rowSpan={1}>&nbsp;</td>) */

    // TODO: 1. handle multiple events at the same time
    // TODO: 2. handle click
    // TODO: 3. handle hover
    // TODO: 4. handle drag!! (maybe not)
    // TODO: 5. handle resize!! (maybe not)
    if (calendar.some((e) => (e.start.getTime() === time.getTime()))) {
      // case STARTS
      const event = calendar.find((e) => (e.start.getTime() === time.getTime()));
      const rowspan = Math.ceil((event.visualEnd - time)/(1000*60*60/hourDivisions));
      const maxRowsText = Math.floor(rowspan/3.3); // found experimentally

      return (
      <td className="timetable-event" key={time} rowSpan={rowspan} data-testid="timetable-event">
        <div onClick={() => console.log("clicked", event.title)} className="timetable-event-card">
          <span className="timetable-event-title" 
            style={{maxHeight: "calc(var(--lheight) * "+maxRowsText+")"}}
          >{event.title}<br/><span>{event.location}</span></span>
        </div>
      </td>);

} else if (calendar.some((e) => (e.start < time && e.visualEnd > time))) {
      // case CROSSES
      return null;
    } else {
      // case NONE
      return <td key={time} className={classOfCell(m)} rowSpan={1}>
        &nbsp;
        </td>;
    }
  }

  // Execute on load; [] means execute only at reaload
  useEffect(() => {
    backToToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* -------------------------- COMPONENT -------------------------- */
  return (
    <div className="timetable-main" data-testid="timetable" >
      <div className="timetable-month" data-testid="timetable-title">
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
          <tr data-testid="timetable-header">
            <th>
              <div className="timetable-navbar">
                <button onClick={backToToday}>{langSet["Today"]}</button>
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
                  {d.getDate()}
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
                  <tr style={{lineHeight: "2.8px"}}>
                    {m === 0 ? <td className="bordercell timetable-firstcol" rowSpan={hourDivisions}>{h%12 ? h%12 : 12}
                    <br/><br/><br/><br/><br/><br/> {/* TODO: fix: maybe this should be just one <br/> */}
                    {h >= 12 ? "pm" : "am"}</td> : null}
                    {
                      currentWeek.map((d) => {
                        const time = d;
                        time.setHours(h,m*60/hourDivisions,0,0);
                        return eventOnTime(time, m);
                      })
                    }
                  </tr>
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