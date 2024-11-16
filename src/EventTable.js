import React, { useMemo } from "react";
import { useEventContext } from "./EventContext";

const EventTable = () => {
  const { state } = useEventContext();
  const { events, filter } = state;

  // Lọc và sắp xếp các sự kiện
  const filteredEvents = useMemo(() => {
    let filtered = events;
    if (filter) {
      filtered = filtered.filter(
        (event) => new Date(event.date).toDateString() === filter.toDateString()
      );
    }
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, filter]);

  return (
    <table>
      <thead>
        <tr>
          <th>Tên sự kiện</th>
          <th>Ngày</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        {filteredEvents.map((event) => (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>{new Date(event.date).toLocaleString()}</td>
            <td>{event.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
