import { serverWebSocketURL } from '../serverBaseURL';

const mappingURL = '/chat';

export const CHAT_REQUEST = {
  initChatRoom: `${mappingURL}`,
};

const wsMappingURL = serverWebSocketURL;

export const CHAT_WS_REQUEST = {};
