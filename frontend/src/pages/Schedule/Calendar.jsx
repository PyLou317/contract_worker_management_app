import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

export default function Calendar() {
  const handleEventClick = (clickInfo) => {
    alert('Event clicked: ' + clickInfo.event.title);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const createEventId = () => {
    return String(new Date().getTime());
  };

  return (
    <div className="shadow-lg rounded-2xl p-6">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={[{ title: 'All-day event', start: new Date() }]}
        eventClick={handleEventClick}
        select={handleDateSelect}
      />
    </div>
  );
}
