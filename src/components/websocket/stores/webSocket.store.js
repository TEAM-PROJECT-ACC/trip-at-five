import { createStore } from 'zustand';

const { CONNECTING, OPEN, CLOSED, CLOSING } = WebSocket;

const initialState = {
  webSocket: null,
  readyState: CLOSED,
  socketEvent: null,
};

export const createWebSocketStore = () =>
  createStore((set, get) => ({
    ...initialState,
    createWebSocket: ({ requestURL, certKey }) => {
      // TODO: certKey에 undefined/null 값도 대입 가능한 지 확인
      const webSocket = new WebSocket(requestURL, certKey);
      set({ webSocket });
    },
    onOpenWebSocket: () => {
      const { webSocket } = get();
      set({ readyState: CONNECTING });
      try {
        webSocket.onopen((event) => {
          // TODO: 연결이 완료되면 알림 또는 상태 전달
          console.log('WebSocket Connected');
          set({ readyState: OPEN, socketEvent: event });
        });
      } catch (error) {
        // TODO: 예외 발생 시 처리 필요
        // 에러 발생 시 소켓 연결 끊김 확인
        console.error('Failed to Connect WebSocket : ', error);
        webSocket.onerror((webSocketError) => {
          console.error('ERROR : ', webSocketError);
          // 연결이 끊기면 readyState 변경
          // set({ readyState: CLOSED });
          set({ socketEvent: webSocketError });
        });
      }
    },
    onCloseWebSocket: () => {
      const { webSocket } = get();
      set({ readyState: CLOSING });
      console.log(webSocket);
      try {
        webSocket.onclose((event) => {
          // TODO: 연결 종료 시 알림 또는 상태 전달
          console.log('WebSocket Disconnected');
          set({ readyState: CLOSED, socketEvent: event });
        });
      } catch (error) {
        // TODO: 예외 발생 시 처리 필요
        console.error('Failed to Disconnect WebSocket : ', error);
        webSocket.onerror((webSocketError) => {
          console.error('ERROR : ', webSocketError);
        });
      }
    },
    onMessageWebSocket: (callback) => {
      const { webSocket } = get();
      try {
        webSocket.onMessage((event) => {
          // TODO: Server에서 데이터 응답 시 처리 필요
          console.log('Get Message from Server');
          callback(event.data);
          set({ socketEvent: event });
        });
      } catch (error) {
        // TODO: 예외 발생 시 처리 필요
        console.error('WebSocket Occurred Exception', error);
        webSocket.onerror((webSocketError) => {
          console.error('ERROR : ', webSocketError);
        });
      }
    },
    sendMessageWebSocket: (data) => {
      const { webSocket } = get();
      try {
        // TODO: 요청 성공 후 처리 필요
        webSocket.send(data);
      } catch (error) {
        console.error('WebSocket Failed to Send Message', error);
        webSocket.onerror((webSocketError) => {
          // TODO: 예외 발생 시 처리 필요
          console.error('ERROR : ', webSocketError);
        });
      }
    },
  }));
