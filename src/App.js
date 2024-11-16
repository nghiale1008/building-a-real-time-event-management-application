import React, { useState } from "react";
import { EventProvider } from "./EventContext";
import EventTable from "./EventTable";
import EventForm from "./EventForm";

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <EventProvider>
      <h1>Quản lý sự kiện</h1>
      <EventForm eventToEdit={selectedEvent} />
      <EventTable onSelectEvent={setSelectedEvent} />
    </EventProvider>
  );
};

export default App;
