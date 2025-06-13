import { useState } from 'react';
import { createWebSocketStore } from '../stores/webSocket.store';
import { WebSocketContext } from './webSocket.context';

export const WebSocketProvider = ({ children }) => {
  const [store] = useState(() => createWebSocketStore());

  return (
    <WebSocketContext.Provider value={store}>
      {children}
    </WebSocketContext.Provider>
  );
};
