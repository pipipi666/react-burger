import { WS_CONNECTION_START } from "services/actions/wsActions";
import type { Middleware } from "redux";
import {
  setOrders,
  wsClose,
  wsError,
  wsSuccess,
  setOrdersTotal,
  setOrdersTotalToday,
} from "./slices/ingredientsSlice";

export const socketMiddleware = (): Middleware => {
  let socket: WebSocket | null = null;
  return (store) => {
    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsSuccess());
        };
        socket.onerror = (event) => {
          dispatch(wsError());
        };
        socket.onmessage = (event) => {
          const { orders, total, totalToday } = JSON.parse(event.data);
          dispatch(setOrders(orders));
          dispatch(setOrdersTotal(total));
          dispatch(setOrdersTotalToday(totalToday));
        };
        socket.onclose = (event) => {
          socket?.close();
          dispatch(wsClose());
        };
      }
      next(action);
    };
  };
};
