import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import { useContext } from 'react';
import { ScheduleContext } from './schedule-page-context';


export default function Calendar() {
  const { schedules } = useContext(ScheduleContext);
  console.log(schedules);

  const events = schedules.map((schedule) => ({
    id: schedule.id,
    resourceId: schedule.area.id,
    title: schedule.area.name,
    start: schedule.start_date,
    end: schedule.end_date,
    allDay: false,
  }));
    
    

  const resources = schedules.map((schedule) => ({
    id: schedule.area,
    title: schedule.area,
  }));

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

  const handleEventResize = (resizeInfo) => {
    // Update your backend with the new end date
    console.log('Event resized!', resizeInfo.event.end);
  };

  const headerToolbarOptions = {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  };

  return (
    <div className="shadow-lg rounded-2xl p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
        initialView="timeGridWeek"
        headerToolbar={headerToolbarOptions}
        // resources={resources}
        events={events}
        editable={true}
        eventResize={handleEventResize}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventClick={handleEventClick}
        select={handleDateSelect}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      />
    </div>
  );
}

// [{ title: 'All-day event', start: new Date() }]
