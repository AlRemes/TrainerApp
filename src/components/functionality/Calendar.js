import React, { useState, useEffect } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'


import moment from "moment";

function Calendar() {

    const [trainings, setTrainings] = useState([]);

    const urlEnd = "/trainings";

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + urlEnd)
          .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
          })
          .then((data) => setTrainings(data.content))
          .then(console.log(trainings))
          .catch((err) => console.log(err));
      }, []);

      function events() {
        let filterEvent = [];
        let filteredEvents = [];
        trainings.map((item) => {
            let start = new Date(item.date)
            let end = new Date(item.date)
            end = moment(end).add(item.duration, 'minutes').toDate()
          filterEvent = {
            title: item.activity,
            start: start,
            end: end,
          };
          filteredEvents.push(filterEvent);
        });
        return filteredEvents;
      }

    return (
    <div className="App" style={{flex:1}}>
      <FullCalendar
      eventDisplay='block'
      displayEventTime='true'
      displayEventEnd='true'
      height={500}
      contentHeight={500}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{center: 'dayGridMonth,dayGridWeek,dayGridDay',}}
        events={events()}
      />
    </div>
    )
}

export default Calendar;