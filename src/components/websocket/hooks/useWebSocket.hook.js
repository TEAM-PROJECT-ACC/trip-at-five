import { useContext, useEffect } from 'react';
import { WebSocketContext } from '../contexts/webSocket.context';
import { useStore } from 'zustand';

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
    onOpenWebSocket,
    onCloseWebSocket,
    onMessageWebSocket,
    sendMessageWebSocket,
  } = useWebSocketStore();

  // WebSocket event
  // - `open` : 커넥션이 정상적으로 생성되었을 때
  const openWebSocket = (callback) => {
    onOpenWebSocket();

    if (callback) {
      callback();
    }
  };

  // - `close` : 커넥션이 종료되었을 때
  const closeWebSocket = (callback) => {
    onCloseWebSocket();

    if (callback) {
      callback();
    }
  };

  // - `message` : 데이터를 수신했을 때

  const receivedMessage = (callback) => {
    onMessageWebSocket(callback);
  };

  const sendMessage = (data) => {
    sendMessageWebSocket(data);
  };
  // - `error` : 오류가 발생했을 때

  useEffect(() => {
    if (!webSocket) {
      createWebSocket({ requestURL, certKey });
    }

    return () => {
      if (webSocket) {
        onCloseWebSocket();
      }
    };
  }, [requestURL, certKey, createWebSocket, onCloseWebSocket, webSocket]);

  return {
    webSocket,
    readyState,
    socketEvent,
    openWebSocket,
    closeWebSocket,
    receivedMessage,
    sendMessage,
  };
};
