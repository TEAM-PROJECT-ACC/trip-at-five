import {VITE_WEB_SOCKET_URL} from '../../../env.config'

const mappingURL = '/chat';

export const CHAT_REQUEST = {
  initChatRoom: `${mappingURL}`,
};

const wsMappingURL = VITE_WEB_SOCKET_URL;

export const CHAT_WS_REQUEST = {};
