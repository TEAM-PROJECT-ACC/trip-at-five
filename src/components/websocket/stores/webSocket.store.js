import { createStore } from 'zustand';

export const { CONNECTING, OPEN, CLOSED, CLOSING } = WebSocket;

const initialState = {
  readyState: CLOSED,
  socketEvent: null,
  webSocket: null,
  data: null,
};

export const createWebSocketStore = () =>
  createStore((set, get) => ({
    ...initialState,
    createWebSocket: async ({ requestURL, certKey }) => {
      try {
        const webSocket = new WebSocket(requestURL);
        set({ webSocket, readyState: CONNECTING });

        if (!(webSocket instanceof WebSocket)) {
          throw new Error('Invalid WebSocket instance');
        }

        webSocket.onopen = (event) => {
          // TODO: 연결이 완료되면 알림 또는 상태 전달
          set({ readyState: OPEN, socketEvent: event });

          // NOTI: WebSocket 인증이 필요한 경우 인증 키를 websocket으로 보냄
          webSocket.send(JSON.stringify({ type: 'AUTH', token: certKey }));

          // 인증 정보를 전달 구현이 필요하지 않으면 회원 정보를 보냄
        };

        webSocket.onclose = (event) => {
          // TODO: 연결 종료 시 알림 또는 상태 전달
          set({ readyState: CLOSED, socketEvent: event, webSocket: null });
        };

        webSocket.onmessage = (event) => {
          // TODO: Server에서 데이터 응답 시 처리 필요
          set({ socketEvent: event, data: event.data });
        };

        webSocket.onerror = (event) => {
          console.error('WebSocket ERROR : ', event);
          set({ readyState: CLOSED, socketEvent: event });
        };
      } catch (error) {
        console.error('Failed to create WebSocket', error);
        set({ readyState: CLOSED, socketEvent: null, webSocket: null });
      }
    },
    closeWebSocket: () => {
      const { webSocket } = get();
      if (webSocket) {
        webSocket.close();
        set({ webSocket: null, readyState: CLOSING });
      }
    },

    sendMessageWebSocket: (data) => {
      const { webSocket, readyState } = get();
      if (webSocket && readyState === OPEN) {
        webSocket.send(JSON.stringify(data));
      } else {
        console.log('Failed to send message');
      }
    },
  }));
