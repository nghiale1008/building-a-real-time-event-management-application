import React, { useState } from "react";
import { sendToWebSocket } from "./WebSocketConnection";
const EventForm = ({ eventToEdit }) => {
  const [name, setName] = useState(eventToEdit ? eventToEdit.name : "");
  const [date, setDate] = useState(eventToEdit ? eventToEdit.date : "");
  const [description, setDescription] = useState(
    eventToEdit ? eventToEdit.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: eventToEdit ? eventToEdit.id : Date.now(),
      name,
      date,
      description,
    };

    if (eventToEdit) {
      sendToWebSocket({ type: "UPDATED_EVENT", data: eventData });
    } else {
      sendToWebSocket({ type: "NEW_EVENT", data: eventData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên sự kiện"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Mô tả"
      />
      <button type="submit">{eventToEdit ? "Cập nhật" : "Thêm mới"}</button>
    </form>
  );
};

export default EventForm;
