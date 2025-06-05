import { useContext, useEffect } from 'react';
import { WebSocketContext } from '../contexts/webSocket.context';
import { useStore } from 'zustand';

const { VITE_ENV } = import.meta.env;

const useWebSocketStore = () => {
  const store = useContext(WebSocketContext);
  return useStore(store);
};

export const useWebSocket = ({ requestURL, certKey }) => {
  const {
    webSocket,
    readyState,
    socketEvent,
    createWebSocket,
    sendMessageWebSocket,
    closeWebSocket,
  } = useWebSocketStore();

  useEffect(() => {
    // TODO: 종료 시 다시 연결 다시 연결되는 현상 막아야 함
    if (!webSocket) {
      createWebSocket({ requestURL, certKey });
    }
    return () => {
      if (webSocket && VITE_ENV === 'PRODUCTION') {
        closeWebSocket();
      }
    };
  }, [certKey, requestURL, closeWebSocket, createWebSocket, webSocket]);

  return {
    webSocket,
    readyState,
    socketEvent,
    createWebSocket,
    sendMessageWebSocket,
    closeWebSocket,
  };
};
