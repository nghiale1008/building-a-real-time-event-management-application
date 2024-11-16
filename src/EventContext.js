import { createContext, useContext, useEffect, useReducer } from "react";
import { initializeWebSocket } from "./WebSocketConnection";

const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload ? action.payload : event
        ),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, {
    events: [],
    filter: null,
  });

  useEffect(() => {
    const socket = initializeWebSocket((message) => {
      const { type, data } = message;

      switch (type) {
        case "NEW_EVENT":
          dispatch({ type: "ADD_EVENT", payload: data });
          break;
        case "UPDATED_EVENT":
          dispatch({ type: "UPDATE_EVENT", payload: data });
          break;
        case "DELETED_EVENT":
          dispatch({ type: "DELETE_EVENT", payload: data });
          break;
        default:
          break;
      }
    });

    return () => socket.close();
  }, []);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
