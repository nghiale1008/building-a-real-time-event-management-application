let socket;

export const initializeWebSocket = (onmessage) => {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    onmessage(message);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return socket;
};

export const sendToWebSocket = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn("WebSocket is not open. message not send");
  }
};
