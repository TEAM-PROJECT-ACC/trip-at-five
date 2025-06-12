import { useContext } from 'react';
import { WebSocketContext } from '../contexts/webSocket.context';
import { useStore } from 'zustand';

const useWebSocketStore = () => {
  const store = useContext(WebSocketContext);
  return useStore(store);
};

export const useWebSocket = () => {
  const {
    webSocket,
    data,
    readyState,
    socketEvent,
    createWebSocket,
    sendMessageWebSocket,
    closeWebSocket,
  } = useWebSocketStore();

  // 연결 상태가 open이 아니고, 현재 소켓이 없고, 종료된 상태일 때만 새 연결 시도
  // const initConnect = useCallback(() => {
  //   if (!webSocket && readyState === CLOSED) {
  //     createWebSocket({ requestURL, loginInfo });
  //   }
  // }, [webSocket, readyState, createWebSocket, loginInfo, requestURL]);

  // useEffect(() => {
  //   initConnect();

  //   return () => {
  //     if (webSocket && readyState === OPEN && isProd) {
  //       closeWebSocket();
  //     }
  //   };
  // }, [initConnect, closeWebSocket, readyState, webSocket]);

  return {
    webSocket,
    data,
    readyState,
    socketEvent,
    createWebSocket,
    sendMessageWebSocket,
    closeWebSocket,
  };
};
