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
    createWebSocket: async ({ requestURL, type, data }) => {
      try {
        // 중복 등록 방지
        // const prev = get().webSocket;
        // if (prev && prev.readyState !== CLOSED) {
        //   prev.close();
        // }

        const webSocket = new WebSocket(requestURL);
        set({ webSocket, readyState: CONNECTING });

        webSocket.onopen = (event) => {
          // TODO: 연결이 완료되면 알림 또는 상태 전달
          set({ readyState: OPEN, socketEvent: event });

          // WebSocket 정상 연결 후 loginInfo(로그인 회원 정보) 전달
          // 데이터 통신 구조 명시화 (프로토콜)
          const initData = JSON.stringify({
            type,
            data,
          });
          webSocket.send(initData);
        };

        webSocket.onclose = (event) => {
          // TODO: 연결 종료 시 알림 또는 상태 전달
          set({
            readyState: CLOSED,
            socketEvent: event,
            webSocket: initialState.webSocket,
          });
        };

        webSocket.onmessage = (event) => {
          // TODO: Server에서 데이터 응답 시 처리 필요
          console.log('on message : ', event.data);
          set({ socketEvent: event, data: JSON.parse(event.data) });
        };

        webSocket.onerror = (event) => {
          console.error('WebSocket ERROR : ', event);
          set({ readyState: CLOSED, socketEvent: event });
          webSocket.close();
        };
      } catch (error) {
        const { webSocket, readyState } = get();
        console.error('Failed to create WebSocket', error);
        set({ readyState: CLOSED, socketEvent: null, webSocket: null });
        // close 가드 처리
        if (webSocket && readyState !== CLOSED) {
          webSocket.close();
        }
      }
    },
    closeWebSocket: () => {
      const { webSocket } = get();
      if (webSocket) {
        webSocket.close();
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
